let map = "";
let service = "";
let currentLocation = "";
let infowindow = "";
let parkMarkArrary = [];
let parks = {};
let seattle = {
    lat: 47.6062,
    lng: -122.3321
};


function initMap() {
    navigator.geolocation.getCurrentPosition((position) => {
        let MarkersArr = [];
        let queryCount = 0;

        currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: currentLocation
        });

        let marker = new google.maps.Marker({
            position: currentLocation,
            draggable: true,
            map: map,
        })

        map.setCenter(currentLocation);

        queryDogParks();

        $(document).on('change', $('#dist'), queryDogParks)

        google.maps.event.addListener(marker, 'mouseup', () => {
            currentLocation = {
                lat: marker.getPosition().lat(),
                lng: marker.getPosition().lng()
            }
            map.setCenter(currentLocation);
            for (let i = 0; i < MarkersArr.length; i++) {
                MarkersArr[i].setMap(null);

            }
            MarkersArr = [];
            parkMarkArrary = [];
            parks = {};
            queryDogParks();

        })

        function queryDogParks() {
            let request = {
                location: currentLocation,
                radius: document.getElementById('dist').value,
                keyword: 'off leash area',
                fields: ['name', 'geometry']
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        parkMarkArrary.push(results[i]);
                        MarkersArr.push(addPlaceMarker(results[i]));
                    }
                }

                placeDetailsFromSearch(parkMarkArrary);
            })

        }

        function placeDetailsFromSearch(arr) {
            let placeIDarray = []

            for (let i = 0; i < arr.length; i++) {
                placeIDarray.push(arr[i].place_id)

            }
            queryPlaceDetail(placeIDarray);
        }

        function queryPlaceDetail(idarry) {

            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            let queryURL = proxyurl + "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + idarry[queryCount] + "&rankedby=distance&key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM"
            fetch(queryURL).then((resp) => {
                resp.json().then((response) => {
                    // console.log(response.result)

                    let result = response.result;
                    let photos = result.photos
                    // console.log(photos[0].getUrl({
                    //     'maxWidth': 35,
                    //     'maxHeight': 35
                    // }))
                    let reviews = [];
                    for (let i = 0; i < result.reviews.length; i++) {
                        let val = result.reviews[i]
                        let review = new Review(val.profile_photo_url, val.author_name, val.rating, val.text)
                        reviews.push(review);
                    }

                    let park = new ParkCard("https://cdn.pixabay.com/photo/2018/05/07/10/48/husky-3380548__340.jpg", result.name, result.formatted_address, result.place_id, result.rating, reviews);
                    parks[result.place_id] = park;
                });

                queryCount++;
                if (queryCount < idarry.length) {
                    queryPlaceDetail(idarry);
                }

                if ((Object.keys(parks).length + 1) === idarry.length) {

                    queryCount = 0;
                    setTimeout(() => {
                        findClosestPark();
                    }, 2000);
                }

            });


        }
    })
}

function addMarker(coords) {
    let marker = new google.maps.Marker({
        position: coords,
        draggable: true,
        map: map,
    })
}

function addPlaceMarker(place) {
    let marker = new google.maps.Marker({
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
    let distances = []
    for (let i = 0; i < parkMarkArrary.length; i++) {
        distances.push(distance(currentLocation.lat, currentLocation.lng, parkMarkArrary[i].geometry.location.lat(), parkMarkArrary[i].geometry.location.lng(), "K"))
        parkMarkArrary[i].distance = distance(currentLocation.lat, currentLocation.lng, parkMarkArrary[i].geometry.location.lat(), parkMarkArrary[i].geometry.location.lng(), "K")
    }

    distances.sort()
    parkMarkArrary.sort((a, b) => {
        return a.distance - b.distance;
    })

    parks[parkMarkArrary[0].place_id].buildCard();
    updateCurrentPark()

}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
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