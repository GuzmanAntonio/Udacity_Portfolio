// MAP MARKER
var map;
// Creates a Global variable for all of the locations
var Location;

// Declaring Global clientID & secret for Foursquare API
var clientID;
var clientSecret;

// Default Locations that are displayed on the map
var defaultLocations = [
    {
        name: 'Pentagon',
        lat: 38.8719, long:-77.0563
    },
    {
        name: 'White House',
        lat: 38.8977, long: -77.0365
    },
    {
        name: 'Washington Monument',
        lat: 38.8895, long: -77.0353
    },
    {
        name: 'Arlington National Cemetary',
        lat: 38.8783, long:-77.0687
    },
    {
        name: 'Reagan National Airport',
        lat: 38.8512, long: 77.0402
    }
];

/// FOURSQUARE API
Location = function(data) {
    var self = this;
    this.name = data.name;
    this.lat = data.lat;
    this.long = data.long;
    this.URL = '';
    this.street = '';
    this.city = '';
    this.phone = '';

    // VISIBLE MARKERS
    this.visible = ko.observable(true);

    // CREDENTIALS FOR FOURSQUARE
    clientID = 'N5VW4EHZUKABA3C0OEBC4UKWSW3YAF2MNFJBEVE2DLS2U2OT';
    clientSecret = 'R3IXPSXY2NN4FC0I1ZU2RUWWW3YIIJZLRWBIYW3FGYTZGD30';

    // LINK TO CALL
    var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' + this.lat + ',' + this.long + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20170413' + '&query=' + this.name;

    // JSON GET FUNCTION 
    $.getJSON(foursquareURL).done(function (data) {
        var results = data.response.venues[0];
        self.URL = results.url;
        if (typeof self.URL === 'undefined') {
            self.URL = "";
        }
        self.street = results.location.formattedAddress[0] || 'No Address Provided';
        self.city = results.location.formattedAddress[1] || 'No Address Provided';
        self.phone = results.contact.phone || 'No Phone Provided';
    }).fail(function () {
        $('.list').html('API ERROR Please refresh and try again.');
    });

    // INFO WINDOW
    this.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
        '<div class="content"><a href="' + self.URL + '">' + self.URL + "</a></div>" +
        '<div class="content">' + self.street + "</div>" +
        '<div class="content">' + self.city + "</div>" +
        '<div class="content">' + self.phone + "</div></div>";

    // INFO WINDOW STRING
    this.infoWindow = new google.maps.InfoWindow({content: self.contentString});

    // MARKER PLACING
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.long),
        map: map,
        title: data.name
    });

    // SELECTS MARKER
    this.showMarker = ko.computed(function() {
        if(this.visible() === true) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);

    // ONCLICK MARKERS
    this.marker.addListener('click', function(){
        self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
            '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +
            '<div class="content">' + self.street + "</div>" +
            '<div class="content">' + self.city + "</div>" +
            '<div class="content"><a href="tel:' + self.phone +'">' + self.phone +"</a></div></div>";

        self.infoWindow.setContent(self.contentString);

        self.infoWindow.open(map, this);

        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 2100);
    });

    // ANIMATION
    this.bounce = function(place) {
        google.maps.event.trigger(self.marker, 'click');
    };
};

// GOOGLE API
function ViewModel(){

    var self = this;

    // VALUE TOGGLE
    this.toggleSymbol = ko.observable('hide');

    // SEARCH TERM
    this.searchTerm = ko.observable('');

    // BLANK ARRAY
    this.locationList = ko.observableArray([]);

    // STYLES.
    var styles = [{
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [{"color": "#f7f1df"}]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{"color": "#d0e3b4"}]
    }, {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [{"color": "#fbd3da"}]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"color": "#bde6ab"}]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{"visibility": "on"}]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#ffe15f"}]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#efd151"}]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#ffffff"}]
    }, {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [{"color": "black"}]
    }, {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#cfb2db"}]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#a2daf2"}]
    }];

    // CENTER MAP.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.8554, lng: -77.0521},
        zoom: 13,
        styles: styles,
        mapTypeControl: false
    });

    // CENTERS THE MAP WHEN THE COMPASS IS CLICKED
    this.centerMap = function(){
        map.setCenter({lat: 38.8554, lng: -77.0521});
    };

    //LIST TOGGLE
    this.listToggle = function() {
        if(self.toggleSymbol() === 'hide') {
            self.toggleSymbol('show');
        } else {
            self.toggleSymbol('hide');
        }
    };

    // DEFAULT LOCATION
    defaultLocations.forEach(function(locationItem){
        self.locationList.push( new Location(locationItem));
    });

    // INPUT SEARCH
    // DISPLAYS THE EXACT ITEM
    this.filteredList = ko.computed( function() {
        var filter = self.searchTerm().toLowerCase();
        if (!filter) {
            self.locationList().forEach(function(locationItem){
                locationItem.visible(true);
            });
            return self.locationList();
        } else {
            return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
                var string = locationItem.name.toLowerCase();
                var result = (string.search(filter) >= 0);
                locationItem.visible(result);
                return result;
            });
        }
    }, self);
}

// ERROR HANDLING
function errorHandlingMap() {
    $('#map').html('ERROR LOADING. Refresh and try again.');
}

function startApp() {
    ko.applyBindings(new ViewModel());
}