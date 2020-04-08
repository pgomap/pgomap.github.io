var gssKey = "1yEw-LdD2ICz7SeEOgP8KwrBaN5lpNq3ZHy0BKuPur9Y";
var url = "https://spreadsheets.google.com/feeds/cells/"+ gssKey +"/3/public/values?alt=json-in-script&callback=jsonp";

function jsonp(data) {
  data = data.feed.entry[0].gs$cell.$t;
  var json =eval(data);
  //var json = JSON.parse(data);  
	
  var html = "";
  for(var i=0; i < json.length; i++) {
	var name = json[i].n;
        var site = json[i].h;
        var dtls = json[i].d;
	  
	var url = "";
	if(site == "tw")      url = 'https://www.twitch.tv/'+ dtls;
	else if(site == "yt") url = 'https://www.youtube.com/watch?v='+ dtls;
	else if(site == "fb") url = 'https://www.facebook.com/'+ dtls;
	
	html += ('<a title="'+ name +'" href="'+ url +'">'+ site.charAt(0).toUpperCase() + '</a><br>');  
  }
  var navTd = document.getElementById('navTd');
  navTd.innerHTML += '<font face="Ariel" size="2" color="white"><b>'+ html +'</b></font>';	
}

var js = document.createElement('script');
var timestamp = Math.floor(Date.now() / 1000);
js.src = url + "&ts=" + timestamp;
document.getElementsByTagName('body')[0].appendChild(js);
