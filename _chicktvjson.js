var gssKey = "1yEw-LdD2ICz7SeEOgP8KwrBaN5lpNq3ZHy0BKuPur9Y";
var url = "https://spreadsheets.google.com/feeds/cells/"+ gssKey +"/3/public/values?alt=json-in-script&callback=jsonp";

function jsonp(data) {
  data = data.feed.entry[0].gs$cell.$t;
	var json =eval(data);
	//var json = JSON.parse(data);
  
  var html = "<table border=1>";
  for(var i=0; i < json.length; i++) {
  	html += "<tr><td>"+ json[i].n 
          +"</td><td>"+ json[i].h 
          +"</td><td>"+ json[i].d +"</td></tr>";
  }
  html += "</table>";

  var div = document.createElement('div');
	div.innerHTML = html;
	//document.getElementsByTagName('body')[0].appendChild(div);

}

var js = document.createElement('script');
var timestamp = Math.floor(Date.now() / 1000);
js.src = url + "&ts=" + timestamp;
document.getElementsByTagName('body')[0].appendChild(js);
