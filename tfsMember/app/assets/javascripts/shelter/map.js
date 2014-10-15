document.write("<script  language='javascript' src='https://apis.skplanetx.com/tmap/js?version=1&format=javascript&appKey=ed27c36c-56a6-3678-ab90-1a4f7ea6eead'></script>");  
/*function initialize() {
var map = new Tmap.Map({div:"map_div"});
}
window.onload = function() {
    initialize();
}
*/
var map;
var zoom, mapW, mapH, mapDiv;
var lonlat, pr_3857, pr_4326;
var markers;



function setVariables(){    
	
	pr_3857 = new Tmap.Projection("EPSG:3857");
	pr_4326 = new Tmap.Projection("EPSG:4326");
	//lonlat = new Tmap.LonLat(14135893.887852,4518348.1852606);
	//zoom = 16;
	//mapW = '900px';    
	//mapH = '500px';    
	mapDiv = 'map_div';

}

function setLayers(){
	if(!map){
		var msg ="T.T"
		alert(msg);
		return;                                  
	}

	
	if(markers!=null){
		markers.clearMarkers();
	}

	markers = new Tmap.Layer.Markers("MarkerLayer");
	map.addLayer(markers);
}

function locEvents(){
	map.events.register("click", map, onClickMap);
	
}

function onClickMap(e){ 
	markers.clearMarkers();
	
	lonlat = map.getLonLatFromViewPortPx(e.xy);
	//lonlat.transform(pr_3857, pr_4326);//좌표변환하면 마커가 생성이 안된다.
	alert(lonlat); 


	/*$("#lon").val(lonlat.)
	$("#lat").val(lonlat.)*/
	$("#lonlat").val(lonlat);
	/*addMarker(lonlat);*/



	/*marker*/
	var size = new Tmap.Size(21,25);
	var offset = new Tmap.Pixel(-(size.w/2), -size.h);
	var icon = new Tmap.Icon('<img src="rails.png" style="z-index:9999px"/>',size,offset);
	/*var icon = new Tmap.IconHtml('<div class="shelter" style="border:10px solid black;"><div onClick="test1()" style="text-decoration: none;	color: RED;	font-size: 9pt;">AAAAAAAAA</div><div onClick="test2()"><img src="img/d.png" /></div><div onClick="test3()" style="text-decoration: none;	color: BLUE;	font-size: 9pt;">QQQQQQQQQQQQQQQQQQQqQ</div></div>',size,offset);*/
	var marker = new Tmap.Marker(lonlat,icon);
	markers.addMarker(marker);
}



var initialize = function(){
	setVariables();
	map = new Tmap.Map({div:mapDiv});

	setLayers();
	
	locEvents();

	shelterLoader();
};

$(initialize);
$(document).on('page:load',initialize);



//*아래부터는 쉘터호출메서드*/

function onMarkerOver(e){//쉘터마커오버이벤트

}
function onMarkerOut(e){//쉘터마커아웃이벤트

}

function tMapPoi(){//Poi매서드, 쉘터를 Poi를 이용해 띄워주자
	tData = new Tmap.TData();//response parameter를 받아주는 클래스
	tData.events.register("onComplete", tData, onCompleteLoadGetPOIDataFromSearch);
	tData.events.register("onProgress", tData, onProgressLoadPoiData);
	tData.events.register("onError", tData, onErrorLoadPoiData);

	var lonlat = $('#lonlat').val();
	var encodingSearchText = encodeURIComponent(lonlat);

	if (lonlat != '') {//검색값이 공백이 아닐 때
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

					if(markers!=null){
						markers.clearMarkers();
					}

					markers.addMarker(marker);

					marker.events.register('mouseover', marker,
						onMarkerOver);

					marker.events.register('mouseout', marker,
						onMarkerOut);

					main_search.submit;/*결과제출*/

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

	map.setCenter(new Tmap.LonLat(14134074.680985, 4517814.0870894), 15);

	markers.clearMarkers();

}

}



/*좌표값말고 다른것도 받아도된다*/
function shelterLoader(){

	var size = new Tmap.Size(22, 30);
	var offset = new Tmap.Pixel(-(size.w / 2), -size.h);


	var other_shelter;
	/*다른사용자들쉘터좌표값받아오기*/
	var shelter_cool_length = $(".shelter_lonlat").length;
	$(".shelter_lonlat").addClass(function(index) {
		return "shelter_lonlat" + index;
	});
	for (var i = 0; i < shelter_cool_length; i++) {
		$(".shelter_lonlat"+i).each(function(){
			other_shelter = $(".shelter_lonlat"+i).text();
			/*alert(other_shelter);*/

			var other_shelter_split = other_shelter.replace(/lon=/gi,'');
			other_shelter_split = other_shelter_split.replace(/lat=/gi,'');
			other_shelter_split = other_shelter_split.replace(/\n/gi,'');
			other_shelter_split = other_shelter_split.replace(/^\s+|\s+$/gi,'');
			other_shelter_split_arr = other_shelter_split.split(',');
			/*alert(other_shelter_split_arr[0]);*/
			var lon = other_shelter_split_arr[0];
			var lat = other_shelter_split_arr[1];

				/*좌표변환해서 넣어야한다*/
	/*var trLonLat = get3857LonLat(coordX, coordY);*/

	var icon = new Tmap.IconHtml("<img src='img/sampleIcon.png'/>", size, offset);//marker

	var marker = new Tmap.Markers(new Tmap.LonLat(lon, lat), icon)

	/*if(markers!=null){
		markers.clearMarkers();
	}*/
	markers.addMarker(marker);

	marker.events.register('mouseover', marker, onMarkerOver);

	marker.events.register('mouseout', marker, onMarkerOut);

		});
	};
}
