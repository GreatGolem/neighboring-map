//This is the model.
var locations;
var glob = this;
$.getJSON("locations.json", function(json) {
  console.log(json);
  this.locations = json;
});

console.log(locations);
//Here's the view.
var ViewModel = function() {
  this.locList = ko.observableArray(locations);
};

ko.applyBindings(new ViewModel());
