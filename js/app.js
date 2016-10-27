//An ajax call to update list of location with the json data file.
//It's written at the beginning but actually executed after knockout binding.
$.getJSON("locations.json", function(json) {
  console.log(json);
  //Add locations to the list and add marker to the map.
  json.forEach(function(locItem){
    VW.locList.push(locItem);
    var marker = new google.map.Marker({
      position: latlng,
      map: initMap()
    });
  });
});

//Here's the viewmodel.
var ViewModel = function() {
  this.locList = ko.observableArray([]);
};
ko.applyBindings(VW = new ViewModel());

//Initialize google map.
function initMap() {
  var initial = {lat: 40.433153, lng: -86.908716};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: initial
  });
  return map;
}
