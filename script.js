var home = [22.33319, 114.160886]; //SSP

//query string
if(location.href.indexOf("#")>0) {
  var qstr = location.href.split("#")[1].trim();
  var loc = qstr.split("l=")[1];
  home =[loc.split(",")[0], loc.split(",")[1]];
}

var map = L.map('map').setView(home, 15);
L.tileLayer(
  'https://{s}.tile.osm.org/{z}/{x}/{y}.png', 
  //'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
  {maxZoom:18}).addTo(map);

var theIcon = L.icon({
    iconUrl: 'https://img.icons8.com/color/50/000000/pokestop-blue.png',
    iconSize: [40,40], 
    iconAnchor: [20,45], 
    popupAnchor: [0,-30] 
});

var x=home[0]; var y=home[1]; //SSP
//var x=22.341358; var y=114.136661; //LCK
var r=0.01;

var query = "select A,B,C where ((A-"+x+")*(A-"+x+")+(B-"+y+")*(B-"+y+"))<"+(r*r)+" limit 100";
query = encodeURIComponent(query);

var base = "https://docs.google.com/spreadsheets/d/";
var sheetId = "15mDubG0SAB89kYZ_S9vqYUhFOUeHwTkLZ7MS9Y6zjOU";
var gridId = "1042843836";
var url = base + sheetId + "/gviz/tq?gid=" + gridId + "&tq=" + query + "&tqx=responseHandler:_";

$.get(url, function(jsonp) {
  var start = jsonp.indexOf("_(")+2;
  var end = jsonp.lastIndexOf(")");
  var json = jsonp.substring(start, end);
  json = JSON.parse(json);

  $.each(json.table.rows, function(idx, cells) {

    var lat = cells.c[0].v;
    var lng = cells.c[1].v;
    var gnm = cells.c[2].v;
    
    //L.marker([lat, lng]).addTo(map);

L.marker([lat, lng], {icon: theIcon}).addTo(map).bindPopup("( "+idx+" )<hr><b>"+gnm+"</b>"); //.openPopup();

  });
});


