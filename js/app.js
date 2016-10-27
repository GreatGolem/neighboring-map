//This is the model.
var locations = [];
$.getJSON("locations.json", function(json) {
  console.log(json);
  json.forEach(function(locItem){
    locations.push(locItem);
  });
  ko.applyBindings(ViewModel());
});

console.log(locations);
//Here's the view.
var ViewModel = {
  locList: ko.observableArray(locations)
};


