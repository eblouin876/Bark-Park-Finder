// api key AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM
// api key AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM
// <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM&callback=initMap"></script>
var map;
var service;
var currentLocation;
var infowindow;
parkMarkArrary = [];
var parks = {};
var seattle = {
    lat: 47.6062,
    lng: -122.3321
};
//
navigator.geolocation.getCurrentPosition(function (position) {
    currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
})

var changedDist = document.getElementById('dist');


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: currentLocation
    });
    // var marker = new google.maps.Marker({position: currentLocation, map: map});
    //addMarker(currentLocation);
    var marker = new google.maps.Marker({
        position: currentLocation,
        draggable: true,
        map: map,
    })


    queryDogParks();
    changedDist.onchange = queryDogParks;


    map.setCenter(currentLocation);
    var MarkersArr = []
    //showMarkers(parkMarkArrary);

    function queryDogParks() {
        var request = {
            location: currentLocation,
            radius: document.getElementById('dist').value,
            keyword: 'off leash area',
            fields: ['name', 'geometry']
        };
        console.log(request)
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function (results, status) {
            console.log(results);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    parkMarkArrary.push(results[i]);
                    MarkersArr.push(addPlaceMarker(results[i]));
                    console.log(results[i]);
                }
            }
            console.log(parkMarkArrary)
            //findClosestPark();
            //debugger
            placeDetailsFromSearch(parkMarkArrary);
        })

    }

    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
    }

    google.maps.event.addListener(marker, 'mouseup', function () {
        currentLocation = {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng()
        }
        map.setCenter(currentLocation);
        for (var i = 0; i < MarkersArr.length; i++) {
            MarkersArr[i].setMap(null);

            //console.log("LOOKIE"+ MarkersArr);
        }
        MarkersArr = [];
        parkMarkArrary = [];
        parks = {};
        console.log("LOOKIE" + MarkersArr);
        queryDogParks();
        // placeDetailsFromSearch(parkMarkArrary)
        //findClosestPark();
        console.log(parkMarkArrary);
        console.log(currentLocation);
    })
    console.log($(marker))

    function placeDetailsFromSearch(arr) {
        var placeIDarray = []

        for (var i = 0; i < arr.length; i++) {
            placeIDarray.push(arr[i].place_id)
            console.log(arr[i].place_id)
        }
        queryPlaceDetail(placeIDarray);
    }
    var IdArray = [];
    // setTimeout(function () {
    //     placeDetailsFromSearch(parkMarkArrary);
    // }, 2000)


    var queryCount = 0;

    function queryPlaceDetail(idarry) {
        // console.log(idarry);
        // console.log(queryCount)
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var queryURL = proxyurl + "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + idarry[queryCount] + "&rankedby=distance&key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM"
        fetch(queryURL).then(function (resp) {
            resp.json().then(function (response) {
                console.log(response.result)
                let result = response.result;
                let reviews = [];
                for (var i = 0; i < result.reviews.length; i++) {
                    let val = result.reviews[i]
                    let review = new Review(val.profile_photo_url, val.author_name, val.rating, val.text)
                    reviews.push(review);
                }
                let photoReference
                if (result.photos) {
                    photoReference = result.photos[0].photo_reference
                }
                let park = new ParkCard("https://cdn.pixabay.com/photo/2018/05/07/10/48/husky-3380548__340.jpg", result.name, result.formatted_address, result.place_id, result.rating, photoReference, reviews);
                parks[result.place_id] = park;
            });

            queryCount++;
            if (queryCount < idarry.length) {
                queryPlaceDetail(idarry);
            }

            if ((Object.keys(parks).length + 1) === idarry.length) {
                console.log("!!!" + parks)
                queryCount = 0;
                setTimeout(function () {
                    findClosestPark();
                }, 2000);
            }
            //jsonObj[IdArray[i]] = response;
        });

        //console.log(jsonObj);
    }
}
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJDdEp4kUUkFQRYgiQJxQ7Akc&key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM





function addMarker(coords) {
    var marker = new google.maps.Marker({
        position: coords,
        draggable: true,
        map: map,
    })
}

function addPlaceMarker(place) {
    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: 'https://img.icons8.com/ultraviolet/40/000000/corgi.png',
        draggable: false,
        animation: google.maps.Animation.DROP,
    });
    marker.addListener('click', toggleBounce);
    return marker;
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function findClosestPark() {
    var distances = []
    for (var i = 0; i < parkMarkArrary.length; i++) {
        console.log(distance(currentLocation.lat, currentLocation.lng, parkMarkArrary[i].geometry.location.lat(), parkMarkArrary[i].geometry.location.lng(), "K"))
        distances.push(distance(currentLocation.lat, currentLocation.lng, parkMarkArrary[i].geometry.location.lat(), parkMarkArrary[i].geometry.location.lng(), "K"))
        parkMarkArrary[i].distance = distance(currentLocation.lat, currentLocation.lng, parkMarkArrary[i].geometry.location.lat(), parkMarkArrary[i].geometry.location.lng(), "K")
    }
    distances.sort()
    parkMarkArrary.sort(function (a, b) {
        return a.distance - b.distance;
    })
    console.log(parkMarkArrary);

    var closestDistance = distances[0];

    if (parks[parkMarkArrary[0].place_id].photoReference) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let queryUrl = `${proxyurl}https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${parks[parkMarkArrary[0].place_id].photoReference}&key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM`
        fetch(queryUrl)
            .then((response) => {
                response.json().then((myJson) => {
                    console.log(myJson);
                });
            });
    }
    parks[parkMarkArrary[0].place_id].buildCard();
    updateCurrentPark()

}
// setTimeout(() => {
//     findClosestPark();
// }, 4000);
// findClosestPark();

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        if (unit == "N") {
            dist = dist * 0.8684
        }
        return dist;
    }
}