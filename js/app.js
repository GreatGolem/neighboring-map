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
        name : 'Beau Jardin',
        latlng : {lat: 40.454828, lng: -86.920855},
        description : 'Home. Sweet home.',
        visible : true
    }, {
        name : 'Wetherill Lab of Chemistry',
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
        description : 'Filled with restaurants and other random facilities.',
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

  //oauth signature preparation.
  var oauth_timestamp = Math.round((new Date()).getTime() / 1000.0);
  var yelpTokenURL = "https://api.yelp.com/v2/search";
  var parameters = {
    location: 'Lafayette Indiana',
    oauth_consumer_key: 'cwAkA1CeBkJRJSLXkOSACA',
    oauth_token: 'kTvQQiFDp-nmuSo-9knHy8AJRYcSGHiO',
    oauth_nonce: oauth_timestamp.toString(),
    oauth_timestamp: oauth_timestamp,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
    callback: 'cb'
  }
  var YELP_KEY_SECRET = 'Kc4ekvU3XtfSLHj44Q3QO7VbYzE';
  var YELP_TOKEN_SECRET = 'lXPciYrzGzE5033h_acN0aazL7s';
  var encodedSignature = oauthSignature.generate('GET',yelpTokenURL, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
  parameters.oauth_signature = encodedSignature;

  //Loop through locations.
  data.locations.forEach(function(item) {

    //Add marker to each location.
    var marker = new google.maps.Marker({
      position: item.latlng,
      map: map,
      title: item.name
    });
    map.markerList.push(marker);

    //Add infowindow to each marker.
    var index = map.infowindowList.length;
    var contentStr = '<div class=info>' +
      '<h5 class="info-title">' + item.name + '</h5>' +
      '<div class="info-description">' + item.description + '</div>' +
      '<img class="info-img-' + index.toString() + '" src="" alt="image"></img>' +
      '<p class="info-tel-address' + index.toString() + '"></p>' +
      '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentStr
    });
<<<<<<< HEAD

    //Add yelp information to each infowindow.
    parameters.term = item.name;
    parameters.cll = item.latlng.lat.toString() + "," + item.latlng.lng.toString();
    (function(para) {
=======
    //When a marker is clicked map is refreshed first
    //then the infowindow is opened for that marker.
    marker.addListener('click', function(){
      map.clear();
      infowindow.open(map, marker);
      console.log(infowindow.getContent());
      var oauth_timestamp = Math.round((new Date()).getTime() / 1000.0);
      var yelpTokenURL = "https://api.yelp.com/v2/search";
      var parameters = {
        location: 'Lafayette Indiana',
        term: item.name,
        cll: item.latlng.lat.toString() + "," + item.latlng.lng.toString(),
        oauth_consumer_key: 'cwAkA1CeBkJRJSLXkOSACA',
        oauth_token: 'kTvQQiFDp-nmuSo-9knHy8AJRYcSGHiO',
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: oauth_timestamp,
        oauth_nonce: oauth_timestamp.toString(),
        oauth_version: '1.0',
        callback: 'cb'
      }
      var YELP_KEY_SECRET = 'Kc4ekvU3XtfSLHj44Q3QO7VbYzE';
      var YELP_TOKEN_SECRET = 'lXPciYrzGzE5033h_acN0aazL7s';
      var encodedSignature = oauthSignature.generate('GET',yelpTokenURL, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
      parameters.oauth_signature = encodedSignature;
>>>>>>> parent of a7edc4c... note
      $.ajax({
        url: yelpTokenURL,
        data: para,
        cache: true,
        dataType: 'jsonp',
        success: function(response) {
          console.log(response);
          if(response.businesses.length == 0) {
            $('.info-img-'+ index.toString()).remove();
            $('.info-tel-address'+ index.toString()).html('*No business information available.');
            return;
          };
          if(!response.businesses[0].hasOwnProperty('image_url')) {
            $('.info-img-'+ index.toString()).attr('src', 'img/noh-image.jpg');
          } else {
            $('.info-img-'+ index.toString()).attr('src', response.businesses[0].image_url);
          };
          $('.info-tel-address'+ index.toString()).html(
            response.businesses[0].display_phone + '<br>' +
            response.businesses[0].location.address[0]
          );
        },
        error: function() {
          console.log('error');
        }
      });
    })(parameters);

    //When a marker is clicked map is refreshed first
    //then the infowindow is opened for that marker.
    marker.addListener('click', function(){
      map.clear();
      infowindow.open(map, marker);
      console.log(infowindow.getContent());

    });
    map.infowindowList.push(infowindow);
  })

  //an update function to show/hide markers
  //and center the map to selected location
  map.update = function() {
    this.clear();
    for(i=0;i<data.locations.length;i++) {
      if(data.selected == data.locations[i].name) {
        this.panTo(data.locations[i].latlng);
        this.infowindowList[i].open(map, map.markerList[i]);
        this.markerList[i].setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }

  //a tool function to close all infowindows and cancel all animations
  map.clear = function() {
    for(i=0;i<data.locations.length;i++) {
      map.infowindowList[i].close();
      map.markerList[i].setAnimation();
    }
  }
}
