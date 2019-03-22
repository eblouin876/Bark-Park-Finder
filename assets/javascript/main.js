// Not yet working because of script type call

class MapApi {
    constructor() {
        this.currentLocation;
        this.map;
        this.marker;
        this.markersArr = [];
        this.service;
        this.parkMarkArray = [];
        this.parks = {};
        this.queryCount = 0;
        this.useLocationServices();
        // this.initMap()
    }

    loadScript() {
        let myKey = "AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM";
        let script = $('<script>')
            .attr('type', 'text/javascript')
            .attr('src', `https://maps.googleapis.com/maps/api/js?&key=${myKey}&libraries=places&callback=initMap`);
        $('body').append(script)
    }

    initMap() {
        this.buildMap()
        this.placeLocationMarker()
        this.queryDogParks()
        this.setListeners()
        this.map.setCenter(this.currentLocation);
    }

    useLocationServices() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        })
        if (!this.currentLocation) {
            this.currentLocation = {
                lat: 47.6062,
                lng: -122.3321
            }
        };
    }

    buildMap() {
        this.map = new google.maps.Map($('#map'), {
            zoom: 12,
            center: this.currentLocation
        });
    }

    placeLocationMarker() {
        this.marker = new google.maps.Marker({
            position: this.currentLocation,
            draggable: true,
            map: this.map,
        })
    }

    queryDogParks() {
        let request = {
            location: this.currentLocation,
            radius: $('#dist').val(),
            keyword: 'off leash area',
            fields: ['name', 'geometry']
        };
        this.service = new google.maps.places.PlacesService(this.map);
        this.service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    this.parkMarkArray.push(results[i]);
                    this.markersArr.push(this.addPlaceMarker(results[i]));
                }
            }
            this.placeDetailsFrormSearch(this.parkMarkArray);
        })
    }

    placeDetailsFrormSearch(arr) {
        let placeIdArr = [];
        for (let i = 0; i < arr.length; i++) {
            placeIdArr.push(arr[i].place_id)
        }
        this.queryPlaceDetail(placeIdArr);
    }

    queryPlaceDetail(idArr) {
        let proxyurl = "https://cors-anywhere.herokuapp.com/";
        let queryURL = proxyurl + "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + idArr[this.queryCount] + "&rankedby=distance&key=AIzaSyC7vLUfavKg4fYmtRJOKm_QfbyQxD-8jJM"
        fetch(queryURL).then((resp) => {
            resp.json().then((response) => {
                let result = response.result;
                let reviews = [];
                for (var i = 0; i < result.reviews.length; i++) {
                    let val = result.reviews[i]
                    let review = new Review(val.profile_photo_url, val.author_name, val.rating, val.text)
                    reviews.push(review);
                }
                // Still need to get the images pulling in
                let park = new ParkCard("https://cdn.pixabay.com/photo/2018/05/07/10/48/husky-3380548__340.jpg", result.name, result.formatted_address, result.place_id, result.rating, reviews);
                this.parks[result.place_id] = park;
            });

            this.queryCount++;
            if (this.queryCount < idArr.length) {
                this.queryPlaceDetail(idArr);
            }

            if ((Object.keys(this.parks).length + 1) === idArr.length) {
                this.queryCount = 0;
                setTimeout(function () {
                    this.findClosestPark();
                }, 2000);
            }
        });
    }

    addPlaceMarker(place) {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            icon: 'https://img.icons8.com/ultraviolet/40/000000/corgi.png',
            draggable: false,
            animation: google.maps.Animation.DROP,
        });
        marker.addListener('click', this.toggleBounce);
        return marker;
    }

    toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    findClosestPark() {
        let distances = [];
        for (var i = 0; i < this.parkMarkArray.length; i++) {
            distances.push(this.distance(this.currentLocation.lat, this.currentLocation.lng, this.parkMarkArray[i].geometry.location.lat(), this.parkMarkArray[i].geometry.location.lng(), "K"))
            parkMarkArrary[i].distance = this.distance(this.currentLocation.lat, this.currentLocation.lng, this.parkMarkArray[i].geometry.location.lat(), this.parkMarkArray[i].geometry.location.lng(), "K")
        }
        distances.sort()
        this.parkMarkArray.sort(function (a, b) {
            return a.distance - b.distance;
        })

        this.parks[this.parkMarkArray[0].place_id].buildCard();
        this.updateCurrentPark()
    }

    distance(lat1, lon1, lat2, lon2, unit) {
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

    setListeners() {
        $(document).on('change', $('#dist'), this.queryDogParks)

        google.maps.event.addListener(this.marker, 'mouseup', () => {
            this.currentLocation = {
                lat: this.marker.getPosition().lat(),
                lng: this.marker.getPosition().lng()
            }
            this.map.setCenter(this.currentLocation);
            for (var i = 0; i < this.markersArr.length; i++) {
                this.markersArr[i].setMap(null);
            }
            this.markersArr = [];
            this.parkMarkArray = [];
            this.parks = {};

            this.queryDogParks();
        })
    }
}

let gmap = new MapApi()

function initMap() {
    gmap.buildMap()
    gmap.placeLocationMarker()
    gmap.queryDogParks()
    gmap.setListeners()
    gmap.map.setCenter(this.currentLocation)
}