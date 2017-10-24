var map;
var markers = [];
var defaultIcon;
var clickedIcon;
function initMap() {
  var centerOfMap = {lat: 32.2217429, lng: -110.926479}
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: centerOfMap,
    zoom: 13,
    mapTypeControl: false,
    clickableIcons: false   // make original map icons are not clickable.
  });

  defaultIcon = makeMarkerIcon('FE7569');
  clickedIcon = makeMarkerIcon('06E86C');

  foursquareRequest(centerOfMap);
}

// This function populates the infowindow when the marker is clicked.
function populateInfoWindow(marker, infowindow) {
  var htmlStr = "";
  if (marker.phone)
    htmlStr = '<div>' + marker.title + '</div>' + '<div>Phone:&nbsp' + marker.phone + '</div>';
  else
    htmlStr = '<div>' + marker.title + '</div>' + '<div>Phone:&nbspN/A</div>';

  infowindow.marker = marker;
  infowindow.setContent(htmlStr);
  infowindow.open(map, marker);
  // Make sure the marker property is cleared if the infowindow is closed.
  infowindow.addListener('closeclick',function(){
    infowindow.close();
    infowindow.marker.setIcon(defaultIcon);
  });
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

// This function send a foursquare request and draw makers on the map.
function foursquareRequest(centerOfMap) {
  var yourClientId = 'XXX';
  var yourClientSecret = 'XXX';
  var largeInfowindow = new google.maps.InfoWindow();
  var url = 'https://api.foursquare.com/v2/venues/search?' +
            'query=pizza&' +
            'll=' + centerOfMap.lat + ',' + centerOfMap.lng +
            '&limit=6&radius=100000' +
            '&client_id=' + yourClientId +
            '&client_secret=' + yourClientSecret +
            '&v=20170101';

  $.getJSON(url,
    function(result) {
      $.each(result.response.venues, function(i, venues){
        var marker = new google.maps.Marker({
          map: map,
          position: {lat: venues.location.lat, lng: venues.location.lng},
          title: venues.name,
          animation: google.maps.Animation.DROP,
          icon: defaultIcon,
          id: i,
          phone: venues.contact.formattedPhone
        });
        // Push the marker to array of markers.
        markers.push(marker);
        marker.addListener('click', function() {
          // Turn all markers color to default color, and change the current marker
          for (var j = 0; j < 6; j++) {
            markers[j].setIcon(defaultIcon);
          }
          this.setIcon(clickedIcon);

          populateInfoWindow(this, largeInfowindow);
        });
      });
    });
}
