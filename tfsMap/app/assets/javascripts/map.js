document.write("<script  language='javascript' src='https://apis.skplanetx.com/tmap/js?version=1&format=javascript&appKey=ed27c36c-56a6-3678-ab90-1a4f7ea6eead'></script>");  

var map;
var zoom, mapW, mapH, mapDiv; //맵 초기화시 사용상수
var lonlat, pr_3857, pr_4326; //좌표변환 관련 상수
var markers; //레이어 관련 변수


function setVariables(){    
	pr_3857 = new Tmap.Projection("EPSG:3857");
	pr_4326 = new Tmap.Projection("EPSG:4326");
	lonlat = new Tmap.LonLat(14135893.887852,4518348.1852606);
	zoom = 16;
	/*mapW = '900px';    
	mapH = '500px';*/    
	mapDiv = 'map_div';
}

function setLayers(){
	if(!map){
		varmsg ="map객체가 초기화되기 전에 레이어가 등록되었습니다."
		alert(msg);
		return;                                  
	}

	if(markers!=null){
		markers.clearMarkers();


		markers = new Tmap.Layer.Markers("MarkerLayer");
		map.addLayer(markers);
	}
}


function initialize() {
	/*var map = new Tmap.Map({div:"map_div"});*/

	setVariables(); //상수값 설정 기능 실행
	map = new Tmap.Map({div : mapDiv}); //map 객체 생성
	map.setCenter(lonlat,zoom);//중심 좌표 설정
	setLayers(); //레이어 생성
}

window.onload = function() {
	initialize();
}

function get3857LonLat(coordX, coordY){//좌표변환메서드
	lonlat = map.getLonLatFromViewPortPx(coordX, coordY);
	lonlat.transform(pr_3857, pr_4326);
}

function onMarkerOver(e){//쉘터마커오버이벤트

}
function onMarkerOut(e){//쉘터마커아웃이벤트

}

function tMapPoi(){//Poi매서드, 쉘터를 Poi를 이용해 띄워주자
	tData = new Tmap.TData();//response parameter를 받아주는 클래스
	tData.events.register("onComplete", tData, onCompleteLoadGetPOIDataFromSearch);
	tData.events.register("onProgress", tData, onProgressLoadPoiData);
	tData.events.register("onError", tData, onErrorLoadPoiData);

	var searchText = $('#search').val();
	var encodingSearchText = encodeURIComponent(searchText);

	if (searchText != '') {//검색값이 공백이 아닐 때
		var options = {version : 1}
		tData.getPOIDataFromSearch(encodingSearchText, options);
		$('#searchResult').css("display", "block");
	} else {
		alert('search POI Input.');
	}
}


function onProgressLoadPoiData() {

}

function onErrorLoadPoiData() {

}


function onCompleteLoadGetPOIDataFromSearch() {
	$("#searchResult").html("");//수정 : 이부분 커머스 검색라인으로 옴기자
	var size = new Tmap.Size(22, 30);
	var offset = new Tmap.Pixel(-(size.w / 2), -size.h);

	if ($(this.responseXML).find("searchPoiInfo pois poi").text() != '') {

		$(this.responseXML).find("searchPoiInfo pois poi").each(
			
			function() {

				var name = $(this).find("name").text();

				var upperAddrName = $(this).find(
					"upperAddrName").text();

				var middleAddrName = $(this).find(
					"middleAddrName").text();

				var lowerAddrName = $(this).find(
					"lowerAddrName").text();

				var upperBizName = $(this).find(
					"upperBizName").text();

				var middleBizName = $(this).find(
					"middleBizName").text();

				var lowerBizName = $(this).find(
					"lowerBizName").text();

				var detailBizName = $(this).find(
					"detailBizName").text();

				var coordX = $(this).find("frontLon")
				.text();

				var coordY = $(this).find("frontLat")
				.text();

				var trLonLat = get3857LonLat(coordX, coordY);//위도,경도좌표변환

				var nameArray = [];

				nameArray = name.split("(");

					if (name.length > 20) {
						name = nameArray[0] + '<br/>(' + nameArray[1];
					}

					if ($(this).index() >= 10) {//인덱스값 초과

						$("#searchResult").append(
							'<div><span class="num">'
							+ ($(this).index() + 1)
							+ '</span>&nbsp;<span class="imgSpan"><img src="img/sampleIcon.png"></span><span class="poiResultList"><a href="javascript:selectPoi('
							+ coordX + ',' + coordY
							+ ')"style="text-decoration:none; *margin-top:-10px;">'
							+ name
							+ '</a></span></div><br/><br/>');

						var icon = new Tmap.IconHtml("<img src='img/sampleIcon.png'/>", size, offset);//marker

					} else {

						$("#searchResult").append(
							'<div><span class="num">'
							+ ($(this).index() + 1)
							+ '</span>&nbsp;<span class="imgSpan"><img src="img/sampleIcon'
							+ ($(this).index() + 1)
							+ '.png"></span><span class="poiResultList"><a href="javascript:selectPoi('
							+ coordX + ',' + coordY
							+ ')"style="text-decoration:none;*margin-top:-10px;">'
							+ name
							+ '</a></span></div><br/><br/>');

						var icon = new Tmap.IconHtml(//marker
							"<img src='img/sampleIcon"
							+ ($(this).index() + 1)
							+ ".png'/>", size, offset);

					}

					var label = new Tmap.Label(
						"&nbsp;상호명 : " 
						+ name
						+ "<br/><br/>&nbsp;주소 : " 
						+ upperAddrName + " " 
						+ middleAddrName + "" 
						+ lowerAddrName
						+ "<br/><br/>&nbsp;구분 : " 
						+ upperBizName + "&nbsp;&gt;&nbsp;" 
						+ middleBizName + "&nbsp;&gt;&nbsp;" 
						+ lowerBizName + "&nbsp;&gt;&nbsp;" 
						+ detailBizName);

					var marker = new Tmap.Markers(new Tmap.LonLat(coordX, coordY), icon, label)

					markers.addMarker(marker);

					marker.events.register('mouseover', marker,
						onMarkerOver);

					marker.events.register('mouseout', marker,
						onMarkerOut);

				});

} else if ($(this.responseXML).find("error").text() != '') {

	var errorMessage = $(this.responseXML).find("error message").text();

	alert(errorMessage);

} else {

	alert('search Poi none');

}

if ($(this.responseXML).find("searchPoiInfo pois poi").text() != '') {

	map.zoomToExtent(markers.getDataExtent());

} else {

	map.setCenter(newTmap.LonLat(14134074.680985, 4517814.0870894), 15);

	markers.clearMarkers();

}

}

/*$( document ).ready(function(){
	var map = new Tmap.Map({div:"map_div"});
});

 $('a').bind("click", function(){ var map = new Tmap.Map({div:"map_div"}); });
 $('a').trigger("click");*/
/*$( window ).load(function() {
  var map = new Tmap.Map({div:"map_div"});

});*/

/*$(document).bind( "ready", function(){
	var map = new Tmap.Map({div:"map_div"});
});

$(document).trigger("ready");*/