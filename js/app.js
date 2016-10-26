//This is the model.
var model = function() {
  var loc = this;
  $.getJSON("locations.json", function(json) {
    console.log(json);
    loc.locations = ko.observable(json);
  });

}




//Here's the view.
var sidebarView = function() {

};

ko.applyBindings();
