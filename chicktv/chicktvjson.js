var gssKey = "1yEw-LdD2ICz7SeEOgP8KwrBaN5lpNq3ZHy0BKuPur9Y";
var url = "https://spreadsheets.google.com/feeds/cells/"+ gssKey +"/3/public/values?alt=json-in-script&callback=jsonp";

function jsonp(data) {
  data = data.feed.entry[0].gs$cell.$t;
  var json =eval(data);
  //var json = JSON.parse(data);  
	
  var html = "";
  var allLinks = '';
  
  for(var i=0; i < json.length; i++) {
	var name = json[i].n;
        var site = json[i].h;
        var dtls = json[i].d;

	if(site=='tw') {
		allLinks += ('/'+ dtls);
	}

	if(location.href.indexOf('#')<0 && site=='tw') { //load default channel
		location.href = 'https://pgomap.github.io/chicktv/?#'+ dtls;
		location.href.reload();
	}
	  
	var url = dtls;
	if(site == "tw")        url = 'https://www.twitch.tv/'+ dtls;
	else if(site == "yt")   url = 'https://www.youtube.com/watch?v='+ dtls;
	else if(site == "fb")   url = 'https://www.facebook.com/'+ dtls;
	else if(site == "okru") url = 'https://ok.ru/live/'+ dtls;
	else if(site == "vk") url = 'https://vk.com/video_ext.php?'+ dtls;
	else if(site == "fc2") url = 'https://live.fc2.com/'+ dtls;
	  
	var img = "";
	if(site == "tw")        img = twitchLogo;
	else if(site == "yt")   img = youtubeLogo;
	else if(site == "fb")   img = facebookLogo;
	else if(site == "okru") img = okruLogo;
	else if(site == "m3u8") img = vidLogo;
	else if(site == "vk")   img = vkLogo;
	else if(site == "fc2")  img = fc2Logo;
	
	if(img == "") {
		html += '<a title="'+ name +'" href="'+ url +'" target="_new"><font face="Ariel" size="2" color="white"><b>'
		      + site.charAt(0).toUpperCase() 
		      + '</b></font></a><br>';  
	}
	else {
		html += '<a title="'+ name +'" href="'+ url +'" target="_blank">'
		      + '<img border=0 width=16 src="'+ img +'">' 
		      + '</a><br>';  
	}
  }
  
  document.getElementById('allLinks').href = '/chicktv/?#' + allLinks.substring(1);
  
  var navTd = document.getElementById('navTd');
  navTd.innerHTML += ''+ html +'';	
}

var js = document.createElement('script');
var timestamp = Math.floor(Date.now() / 1000);
js.src = url + "&ts=" + timestamp;
document.getElementsByTagName('body')[0].appendChild(js);

