// api key AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM
// api key AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM
// <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM&callback=initMap"></script>
var map;
var service;
var currentLocation;
var infowindow
var seattle = {
    lat: 47.6062,
    lng: -122.3321
};
navigator.geolocation.getCurrentPosition(function (position) {
    currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
})
parkMarkArrary = [];

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
    
    //showMarkers(parkMarkArrary);
    function queryDogParks() {
        var request = {
            location: currentLocation,
            radius: '7000',
            keyword: 'off dog leash area',
            fields: ['name', 'geometry']
        };
        console.log(request)
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function (results, status) {
            console.log(results);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    parkMarkArrary.push(results[i]);
                    // console.log(results[i]);
                }
                showMarkers(parkMarkArrary);
            }
        })
        
    }
    

    function showMarkers(arr){
        for(var i = 0; i < arr.length; i++){
            addPlaceMarker(arr[i]);
        }
    }

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
        parkMarkArrary.length = 0;
        queryDogParks();
        console.log(currentLocation);
    })
    console.log($(marker))
    
    

}


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
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

// function geoFindMarker(pos){
//     geocoder = new google.maps.Geocoder();
//     geocoder.geocoder({latLng: pos},
//                     function(results, status){
//                         if(status === google.maps.GeocoderStatus.OK)
//                         {
//                             //do something
//                         }
//                         else{
//                             //do something
//                         }
//                     }
//     )

// }


// service = new google.maps.places.PlacesService(map);



//   service.nearbySearch(request, function() {

//   }

//   })
//   service = new google.maps.places.PlacesService(map);
//   service.findPlaceFromQuery(request, function(results, satatus){
//       if(status === status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//           createMarker(results[i]);
//         }

//         map.setCenter(results[0].geometry.location);
//       }
//   })


// function findMe(){

// }
//   function geoFindMe(){
//     function success(position) {
//         const latitude  = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         console.log(currentLocation);
//         currentLocation = {lat: latitude, lng: longitude};
//         // status.textContent = '';
//         // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//         // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
//       }
//       function error() {
//         status.textContent = 'Unable to retrieve your location';

//         // if (!navigator.geolocation) {
//         //     status.textContent = 'Geolocation is not supported by your browser';
//         //   } else {
//         //     status.textContent = 'Locating…';
//         //     navigator.geolocation.getCurrentPosition(success, error);
//         //   }

//       }
//   }