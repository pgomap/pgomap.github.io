var currUrl = window.location.href;
var pos = currUrl.indexOf('#');

if(pos > 0) {
    var params = currUrl.substring(pos+1).trim();
    params = params.split('/');
    if(params[0].lastIndexOf('_ok') == params[0].length-3) 
        document.getElementById('theVideo').src = 'https://ok.ru/videoembed/'+ params[0].substring(0,params[0].length-3);
    else 
        document.getElementById('theVideo').src = 'https://player.twitch.tv/?channel='+ params[0] +'&muted=true&parent=pgomap.github.io';
    var td = document.getElementById('theTd');
    
    if(params.length == 2) {
        var url1 = 'https://player.twitch.tv/?channel='+ params[0] +'&muted=true&parent=pgomap.github.io';
        var url2 = 'https://player.twitch.tv/?channel='+ params[1] +'&muted=true&parent=pgomap.github.io';
        if(params[0].lastIndexOf('_ok') == params[0].length-3) 
            url1 = 'https://ok.ru/videoembed/'+ params[0].substring(0,params[0].length-3);
        if(params[1].lastIndexOf('_ok') == params[1].length-3) 
            url2 = 'https://ok.ru/videoembed/'+ params[1].substring(0,params[1].length-3);
        td.innerHTML = "<iframe width='100%' height='50%' id='theVideo1' frameborder=0 scrolling=0 src='"+ url1 +"'></iframe>"
                     + "<iframe width='100%' height='50%' id='theVideo2' frameborder=0 scrolling=0 src='"+ url2 +"'></iframe>";
    } 
    if(params.length == 3) {
        var url = ' , , '.split(',');   
        for(var i=0; i < 3; i++) {
            url[i] = 'https://player.twitch.tv/?channel='+ params[i] +'&muted=true&parent=pgomap.github.io'
            if(params[i].lastIndexOf('_ok') == params[i].length-3) 
                url[i] = 'https://ok.ru/videoembed/'+ params[i].substring(0,params[i].length-3);
	}
        td.innerHTML = "<iframe width='100%' height='65%' id='theVideo1' frameborder=0 scrolling=0 src='"+ url[0] +"'></iframe>"
                     + "<iframe width='50%' height='35%' id='theVideo2' frameborder=0 scrolling=0 src='"+ url[1] +"'></iframe>"
                     + "<iframe width='50%' height='35%' id='theVideo3' frameborder=0 scrolling=0 src='"+ url[2] +"'></iframe>";
    }
    if(params.length == 4) {
        td.innerHTML = "";
        for(var i=0; i < 4; i++) {
            var url = 'https://player.twitch.tv/?channel='+ params[i] +'&muted=true&parent=pgomap.github.io';
            if(params[i].lastIndexOf('_ok') == params[i].length-3) 
                url = 'https://ok.ru/videoembed/'+ params[i].substring(0,params[i].length-3);
            td.innerHTML += "<iframe width='50%' height='50%' id='theVideo1' frameborder=0 scrolling=0 src='"+ url +"'></iframe>";
        }
    }
    if(params.length >= 5 && params.length <= 6) {
        td.innerHTML = "";
        for(var i=0; i < 6; i++) {
			var url = 'https://helixmedia360.com/11-17/Settlers.Gate.html';
			if(i < params.length) {
			    url = 'https://player.twitch.tv/?channel='+ params[i] +'&muted=true&parent=pgomap.github.io';
			    if(params[i].lastIndexOf('_ok') == params[i].length-3) 
				url = 'https://ok.ru/videoembed/'+ params[i].substring(0,params[i].length-3);
			}
            td.innerHTML += "<iframe width='50%' height='33%' id='theVideo1' frameborder=0 scrolling=0 src='"+ url +"'></iframe>";
        }
    }
    if(params.length >= 7 && params.length <= 9) {
        td.innerHTML = "";
        for(var i=0; i < 9; i++) {
			var url = 'https://helixmedia360.com/11-17/Settlers.Gate.html';
			if(i < params.length) {
			    url = 'https://player.twitch.tv/?channel='+ params[i] +'&muted=true&parent=pgomap.github.io';
			    if(params[i].lastIndexOf('_ok') == params[i].length-3) 
				url = 'https://ok.ru/videoembed/'+ params[i].substring(0,params[i].length-3);
			}
            td.innerHTML += "<iframe width='33%' height='33%' id='theVideo1' frameborder=0 scrolling=0 src='"+ url +"'></iframe>";
        }
    }
    if(params.length >= 10 && params.length <= 12) {
        td.innerHTML = "";
        for(var i=0; i < 12; i++) {
			var url = 'https://helixmedia360.com/11-17/Settlers.Gate.html';
			if(i < params.length) {
			    url = 'https://player.twitch.tv/?channel='+ params[i] +'&muted=true&parent=pgomap.github.io';
			    if(params[i].lastIndexOf('_ok') == params[i].length-3) 
				url = 'https://ok.ru/videoembed/'+ params[i].substring(0,params[i].length-3);
			}
            td.innerHTML += "<iframe width='25%' height='33%' id='theVideo1' frameborder=0 scrolling=0 src='"+ url +"'></iframe>";
        }
    }
    if(params.length >= 13 && params.length <= 16) {
        td.innerHTML = "";
        for(var i=0; i < 16; i++) {
			var url = 'https://helixmedia360.com/11-17/Settlers.Gate.html';
			if(i < params.length) {
			    url = 'https://player.twitch.tv/?channel='+ params[i] +'&muted=true&parent=pgomap.github.io';
			    if(params[i].lastIndexOf('_ok') == params[i].length-3) 
				url = 'https://ok.ru/videoembed/'+ params[i].substring(0,params[i].length-3);
			}
            td.innerHTML += "<iframe width='25%' height='25%' id='theVideo1' frameborder=0 scrolling=0 src='"+ url +"'></iframe>";
        }
    }
    if(params.length >= 17) {
        td.innerHTML = "";
        for(var i=0; i < 25; i++) {
			var url = 'https://helixmedia360.com/11-17/Settlers.Gate.html';
			if(i < params.length) {
			    url = 'https://player.twitch.tv/?channel='+ params[i] +'&muted=true&parent=pgomap.github.io';
			    if(params[i].lastIndexOf('_ok') == params[i].length-3) 
				url = 'https://ok.ru/videoembed/'+ params[i].substring(0,params[i].length-3);
			}
            td.innerHTML += "<iframe width='20%' height='20%' id='theVideo1' frameborder=0 scrolling=0 src='"+ url +"'></iframe>";
        }
    }
}
