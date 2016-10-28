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
var data = {
  selected: 'NA',
  locations: [
    {
        name : 'Home',
        latlng : {lat: 40.454828, lng: -86.920855},
        description : 'Home. Sweet home.',
        visible : true
    }, {
        name : 'Lab',
        latlng : {lat: 40.426642, lng: -86.913394},
        description : 'The place I work.',
        visible : true
    }, {
        name : 'Payless',
        latlng : {lat: 40.455023, lng: -86.917591},
        description : 'The closest supermarket to my home.',
        visible : true
    }, {
        name : 'Walmart',
        latlng : {lat: 40.457091, lng: -86.933015},
        description : 'A larger supermarket close to my home.',
        visible : true
    }, {
        name : 'Purdue Memorial Union',
        latlng : {lat: 40.424700, lng: -86.911325},
        description : 'Fulled with restaurants and other random facilities.',
        visible : true
    }, {
        name : 'Yichiban',
        latlng : {lat: 40.417147, lng: -86.893190},
        description : 'Best Chinese restaurant in town.',
        visible : true
    }, {
        name : 'C&T Market',
        latlng : {lat: 40.423287, lng: -86.899522},
        description : 'A small Chinese supermarket with nice meat and snack supply.',
        visible : true
    }
  ]
}

//Here's the viewmodel.
var ViewModel = function() {
  var self = this;
  this.locList = ko.observableArray(data.locations);
  this.expand = function() {
    $('#sidebar').toggleClass('expand');
  };
  this.select = function(locItem) {
    data.selected = locItem.name;
    map.update();
  };
  this.keyword = ko.observable('');
  //a function trigger everytime something entered in filter box
  //and hide all non-matching list items
  this.filter = function() {
    $('li').show();
    map.markerList.forEach(function(marker){
      marker.setOpacity(1);
    });
    for(i=0;i<data.locations.length;i++) {
      if(!data.locations[i].name.toLowerCase().includes(self.keyword().toLowerCase())) {
        $('li:nth-child(' + parseInt(i+1) + ')').hide();
        map.markerList[i].setOpacity(0.3);
      }
    }
  }
};
ko.applyBindings(VW = new ViewModel());

//Initialize google map.
function initMap() {
  var initial = {lat: 40.433153, lng: -86.908716};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: initial
  });
  map.markerList = [];
  map.infowindowList = [];
  //add marker for each location and add infowindow to them.
  data.locations.forEach(function(item) {
    var marker = new google.maps.Marker({
      position: item.latlng,
      map: map,
      title: item.name
    });
    map.markerList.push(marker);
    var infowindow = new google.maps.InfoWindow({
      content: item.description
    });
    marker.addListener('click', function(){
      map.clearInfoWindow();
      infowindow.open(map, marker);
    });
    map.infowindowList.push(infowindow);
  })
  //an update function to show/hide markers
  //and center the map to selected location
  map.update = function() {
    this.clearInfoWindow();
    for(i=0;i<data.locations.length;i++) {
      this.markerList[i].setVisible(data.locations[i].visible);
      if(data.selected == data.locations[i].name) {
        this.panTo(data.locations[i].latlng);
        this.infowindowList[i].open(map, map.markerList[i]);
      }
    }
  }

  //a tool function to close all infowindows
  map.clearInfoWindow = function() {
    for(i=0;i<map.infowindowList.length;i++) {
      map.infowindowList[i].close();
    }
  }
}
