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


    map.setCenter(currentLocation);
    var MarkersArr = []
    //showMarkers(parkMarkArrary);
    function queryDogParks() {
        var request = {
            location: currentLocation,
            radius: '7000',
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
                //showMarkers(MarkersArr);
            }
        })

    }

    // function deleteMarkers() {
    //     clearMarkers();
    //     parkMarkArrary = [];
    //   }

    // function showMarkers(arr) {
    //     for (var i = 0; i < arr.length; i++) {
    //         addPlaceMarker(arr[i]);

    //     }
    // }

    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        // google.maps.event.addListener(marker, 'click', function () {
        //     infowindow.setContent(place.name);
        //     infowindow.open(map, this);
        // });
    }

    google.maps.event.addListener(marker, 'mouseup', function () {
        currentLocation = {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng()
        }
        map.setCenter(currentLocation);
        for(var i = 0; i < MarkersArr.length; i++){
       MarkersArr[i].setMap(null);
        //console.log("LOOKIE"+ MarkersArr);
        }
        MarkersArr = [];
        console.log("LOOKIE"+ MarkersArr);
        queryDogParks();
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
    
    
    setTimeout(function () {
        placeDetailsFromSearch(parkMarkArrary);
    }, 2000)


var queryCount = 0;
    function queryPlaceDetail(idarry){
        // console.log(idarry);
        // console.log(queryCount)
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
            var queryURL = proxyurl + "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + idarry[queryCount] + "&key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM"
            fetch(queryURL).then(function (response) {
                response.json().then( function(response){
                    console.log(response.result)
                    let result = response.result;
                    let reviews = [];
                    for(var i = 0; i < result.reviews.length; i++){                     
                        let val = result.reviews[i]
                        let review = new Review(val.profile_photo_url,val.author_name, val.rating, val.text)
                        reviews.push(review);
                    }
                    let park = new ParkCard("https://cdn.pixabay.com/photo/2018/05/07/10/48/husky-3380548__340.jpg", result.name, result.formatted_address, result.geometry.location, result.rating, reviews);
                    parks[result.place_id] = park;
                });
                queryCount++;
                if(queryCount < idarry.length){
                    queryPlaceDetail(idarry);
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


