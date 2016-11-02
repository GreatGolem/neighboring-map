//Here's the model.
var data = {
  selected: 'NA',
  locations: [
    {
        name : 'Beau Jardin',
        latlng : {lat: 40.454828, lng: -86.920855},
        description : 'Home. Sweet home.'
    }, {
        name : 'Wetherill Lab of Chemistry',
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
        description : 'Filled with restaurants and other random facilities.'
    }, {
        name : 'Yichiban',
        latlng : {lat: 40.417147, lng: -86.893190},
        description : 'Best Chinese restaurant in town.',
    }, {
        name : 'C&T Market',
        latlng : {lat: 40.423287, lng: -86.899522},
        description : 'A small Chinese supermarket with nice meat and snack supply.'
    }
  ]
};

//Here's the viewmodel.
var ViewModel = function() {
  var self = this;
  this.locList = ko.observableArray(data.locations);
  this.sideBarExpand = ko.observable(true);
  this.toggleSideBar = function() {
    self.sideBarExpand(!self.sideBarExpand());
  };
  this.select = function(locItem) {
    data.selected = locItem.name;
    if(map !== undefined) {map.update();}
  };
  this.keyword = ko.observable('');

  for(i=0;i<data.locations.length;i++) {
    (function(j) {
      self.locList()[j].visible = ko.computed( function() {
        var filterResult = compareStr(self.locList()[j].name.toLowerCase(), self.keyword().toLowerCase());
        if(filterResult && map !== undefined) {
          map.markerList[j].setOpacity(1);
        } else if(map !== undefined) {
          map.markerList[j].setOpacity(0.3);
        }
        return filterResult;
      });
    })(i);
  }
};

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
    var index = map.infowindowList.length;
    var marker = new google.maps.Marker({
      position: item.latlng,
      map: map,
      title: item.name
    });
    map.markerList.push(marker);
    var contentStr =
      '<h5 class="info-title">' + item.name + '</h5>' +
      '<p class="info-description">' + item.description + '</p>';
    var infowindow = new google.maps.InfoWindow({
      content: contentStr
    });
    map.infowindowList.push(infowindow);

    //a helper function for yelp api request
    map.yelpAjax = function(item,index) {
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
      };
      var YELP_KEY_SECRET = 'Kc4ekvU3XtfSLHj44Q3QO7VbYzE';
      var YELP_TOKEN_SECRET = 'lXPciYrzGzE5033h_acN0aazL7s';
      var encodedSignature = oauthSignature.generate('GET',yelpTokenURL, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
      parameters.oauth_signature = encodedSignature;

      $.ajax({
        url: yelpTokenURL,
        data: parameters,
        cache: true,
        success: function(response) {
          if(response.businesses.length == 0) {
            yelpPhoto = '';
            yelpStr = '<p>No business information available</p>';
          } else if(typeof response.businesses[0].image_url == 'undefined') {
            yelpPhoto = '<img class="noh-image info-img-' + index.toString() + '" src="img/noh-image.jpg" alt="image"></img>';
            yelpStr = '<p class="info-tel-address-' + index.toString() + '">' + response.businesses[0].display_phone + '<br>' +
              response.businesses[0].location.address[0] + '</p>';
          } else {
            yelpPhoto = '<img class="info-img-' + index.toString() + '" src="'+ response.businesses[0].image_url +'" alt="image"></img>';
            yelpStr = '<p class="info-tel-address-' + index.toString() + '">' + response.businesses[0].display_phone + '<br>' +
              response.businesses[0].location.address[0] + '</p>';
          }
          contentStr = contentStr + yelpPhoto + yelpStr;
          infowindow.setContent(contentStr);
        },
        dataType: 'jsonp'
      }).fail( function() {
        yelpStr = '<p>Fail to get yelp resources.</p>';
        contentStr = contentStr + yelpStr;
        infowindow.setContent(contentStr);
      });
    };

    //Add yelp information to infowindow.
    map.yelpAjax(item,index);

    //When a marker is clicked map is refreshed first
    //then the infowindow is opened for that marker.
    marker.addListener('click', function(){
      data.selected = item.name;
      map.update();
    });

    //Stop marker animation when infowindow closed.
    google.maps.event.addListener(infowindow, 'closeclick', function() {
      marker.setAnimation();
    });
  });

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
  };

  //a tool function to close all infowindows and cancel all animations
  map.clear = function() {
    for(i=0;i<data.locations.length;i++) {
      map.infowindowList[i].close();
      map.markerList[i].setAnimation();
    }
  };
  ko.applyBindings(VW = new ViewModel());
};

//A helper function to check whether a string contains another string.
var compareStr = function(message, keyword) {
  var l = keyword.length;
  if(l > message.length) {
    return false;
  }
  for(k=0;k+l<=message.length;k++) {
    if(message.substring(k,k+l) == keyword) {
      return true;
    }
  }
  return false;
};

//Error handler for google map api
var googleError = function() {
  alert('Google map currently not available!');
};
