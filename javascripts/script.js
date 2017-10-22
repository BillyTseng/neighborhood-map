var map;
var markers = [];
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.2217429, lng: -110.926479},
    zoom: 13,
    mapTypeControl: false
  });

  var locations = [
    {title: 'Fiamme Pizza', location: {lat: 32.3066498, lng: -110.8919207}},
    {title: 'Broadway Pizza Cafe', location: {lat: 32.2212125, lng: -110.8954217}},
    {title: 'Grimaldi’s Pizzeria', location: {lat: 32.2271788, lng: -110.9431862}},
    {title: 'Scordato’s Pizzeria', location: {lat: 32.2958994, lng: -110.9715268}},
    {title: 'Serial Grillers', location: {lat: 32.236482, lng: -110.870034}},
    {title: 'Rocco’s Little Chicago', location: {lat: 32.2218517, lng: -110.9320512}}
  ];

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  var defaultIcon = makeMarkerIcon('FE7569');
  var clickedIcon = makeMarkerIcon('06E86C');

  // Initialize markers.
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    // Push the marker to array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      // Turn all markers color to default color, and change the current marker
      for (var j = 0; j < locations.length; j++) {
        markers[j].setIcon(defaultIcon);
      }
      this.setIcon(clickedIcon);

      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(markers[i].position);
  }
  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);
}
// This function populates the infowindow when the marker is clicked.
function populateInfoWindow(marker, infowindow) {
  infowindow.marker = marker;
  infowindow.setContent('<div>' + marker.title + '</div>');
  infowindow.open(map, marker);
  // Make sure the marker property is cleared if the infowindow is closed.
  infowindow.addListener('closeclick',function(){
    infowindow.close();
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
