//This is the model.
var locations;
$.getJSON("locations.json", function(json) {
  console.log(json);
  locations = json;
});





//Here's the view.
var ViewModel = function() {
  var self = this;
  var locList = ko.observableArray(locations);
};

ko.applyBindings(new ViewModel());
