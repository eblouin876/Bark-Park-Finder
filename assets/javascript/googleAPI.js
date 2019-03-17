// api key AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM
// api key AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM
// <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM&callback=initMap"></script>
var map;
var currentLocation;
var seattle = {lat: 47.6062 , lng:-122.3321 };
currentLocation = seattle;
function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: seattle});
    var marker = new google.maps.Marker({position: seattle, map: map});
}
function addMarker(coords){
    var marker = new google.maps.Marker({
        position: coords,
        map:map,
        icon: "" //add marker img link
    })

    var request = {
        location: pyrmont,
        radius: '500',
        query: 'off leash dog park'
      };
}