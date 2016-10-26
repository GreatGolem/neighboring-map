//This is the model.
var locations = [];
$.getJSON("locations.json", function(json) {
  console.log(json);
  json.forEach(function(locItem){
    window.locations.push(locItem);
  });
});

console.log(locations);
//Here's the view.
var ViewModel = function() {
  this.locList = ko.observableArray(window.locations);
};

ko.applyBindings(new ViewModel());
