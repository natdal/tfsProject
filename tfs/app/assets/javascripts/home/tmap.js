 document.write("<script  language='javascript' src='https://apis.skplanetx.com/tmap/js?version=1&format=javascript&appKey=ed27c36c-56a6-3678-ab90-1a4f7ea6eead'></script>");  
var map;//홈쪽 맵 
//var map_shelter_create;//쉘터생성쪽 맵
var zoom, mapW, mapH, mapDiv; //맵 초기화시 사용상수
//var mapDiv_shelter_create;
var lonlat, pr_3857, pr_4326; //좌표변환 관련 상수
var markers; //레이어 관련 변수


/*function initialize() {
	setVariables(); //상수값 설정 기능 실행
	map = new Tmap.Map({div : mapDiv}); //map 객체 생성
	map.setCenter(lonlat,zoom);//중심 좌표 설정
	setLayers(); //레이어 생성
}*/

/*$( document ).ready(function(){
	initialize();
});*/

var initialize = function(){
	setVariables();
	map = new Tmap.Map({div:mapDiv});
	//map_shelter_create = new Tmap.Map({div:mapDiv_shelter_create});
	setLayers();

	shelterLoader();
};

$(initialize);
$(document).on('page:load',initialize);



function setVariables(){    
	pr_3857 = new Tmap.Projection("EPSG:3857");
	pr_4326 = new Tmap.Projection("EPSG:4326");
	lonlat = new Tmap.LonLat(14135893.887852,4518348.1852606);
	zoom = 16;
	/*mapW = '900px';    
	mapH = '500px';*/    
	mapDiv = 'map_div';
	//mapDiv_shelter_create = 'map_div_shelter_create';
}

function setLayers(){
	if(!map){
		varmsg ="map객체가 초기화되기 전에 레이어가 등록되었습니다."
		alert(msg);
		return;                                  
	}

	markers = new Tmap.Layer.Markers("MarkerLayer");
	map.addLayer(markers);
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

	var searchText = $('#searchText').val();
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
			/*통합검색이랑 지역검색만 넣어놨는데 필요한데로 추가 및 제거해야함*/
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

	var shelterIcon = new Tmap.IconHtml("<img src='assets/images/shelter/123.jpg'/>", size, offset);//marker

	var shelterMarker = new Tmap.Markers(new Tmap.LonLat(lon, lat), shelterIcon);

	/*if(markers!=null){
		markers.clearMarkers();
	}*/
	markers.addMarker(shelterMarker);

	shelterMarker.events.register('mouseover', shelterMarker, onShelterOver);

	shelterMarker.events.register('mouseout', shelterMarker, onShelterOut);

	shelterMarker.events.register('click', shelterMarker, onShelterClick);

	});
};
}


function onShelterOver(e){

}

function onShelterOut(e){

}

function onShelterClick(e){
	/*여기에 쉘터마커 클릭했을 때 쉘터로 이동하는거 만들기*/
}