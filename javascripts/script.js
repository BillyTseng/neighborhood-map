var map;
var markers = [];
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.2217429, lng: -110.926479},
    zoom: 13
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
      id: i
    });
    // Push the marker to array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(markers[i].position);
  }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}
// This function populates the infowindow when the marker is clicked.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  }
}
