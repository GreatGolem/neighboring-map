//An ajax call to update list of location with the json data file.
//It failed badly so I give it up and just put data in js file directly.

// $.getJSON("locations.json", function(json) {
//   console.log(json);
//   //Add locations to the list and add marker to the map.
//   json.forEach(function(locItem){
//     VW.locList.push(locItem);
//     var marker = new google.maps.Marker({
//       position: locItem.latlng,
//       map: initMap()
//     });
//   });
// });


//Here's the model.
var data = [
    {
        name : 'Home',
        latlng : {lat: 40.454828, lng: -86.920855},
        description : 'Home. Sweet home.'
    }, {
        name : 'Lab',
        latlng : {lat: 40.426642, lng: -86.913394},
        description : 'The place I work.'
    }, {
        name : 'Payless',
        latlng : {lat: 40.455023, lng: -86.917591},
        description : 'The closest supermarket to my home.'
    }, {
        name : 'Walmart',
        latlng : {lat: 40.457091, lng: -86.933015},
        description : 'A larger supermarket close to my home.'
    }, {
        name : 'Purdue Memorial Union',
        latlng : {lat: 40.424700, lng: -86.911325},
        description : 'Fulled with restaurants and other random facilities.'
    }, {
        name : 'Yichiban',
        latlng : {lat: 40.417147, lng: -86.893190},
        description : 'Best Chinese restaurant in town.'
    }, {
        name : 'C&T Market',
        latlng : {lat: 40.423287, lng: -86.899522},
        description : 'A small Chinese supermarket with nice meat and snack supply.'
    }
]

//Here's the viewmodel.
var ViewModel = function() {
  this.locList = ko.observableArray(data);
};
ko.applyBindings(VW = new ViewModel());

//Initialize google map.
function initMap() {
  var initial = {lat: 40.433153, lng: -86.908716};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: initial
  });
  data.forEach(function(item) {
    var marker = new google.maps.Marker({
      position: item.latlng,
      map: map
    });
  })
}
