//This is the model.
var locations = [];
var glob = this;
$.getJSON("locations.json", function(json) {
  console.log(json);
  json.forEach(function(locItem){
    glob.locations.push(locItem);
  });
});

console.log(glob.locations);
//Here's the view.
var ViewModel = function() {
  this.locList = ko.observableArray(glob.locations);
};

ko.applyBindings(new ViewModel());
