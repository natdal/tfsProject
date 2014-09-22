document.write("<script  language='javascript' src='https://apis.skplanetx.com/tmap/js?version=1&format=javascript&appKey=ed27c36c-56a6-3678-ab90-1a4f7ea6eead'></script>");  
/*function initialize() {
var map = new Tmap.Map({div:"map_div"});
}
window.onload = function() {
    initialize();
}*/

$( document ).ready(function(){
	var map = new Tmap.Map({div:"map_div"});
});

 $('a').bind("click", function(){ var map = new Tmap.Map({div:"map_div"}); });
 $('a').trigger("click");
/*$( window ).load(function() {
  var map = new Tmap.Map({div:"map_div"});

});*/

/*$(document).bind( "ready", function(){
	var map = new Tmap.Map({div:"map_div"});
});

$(document).trigger("ready");*/