$( document ).ready(function() {
	console.log("ready");
	apiChicago('location_description');
});

var receptacle = new Object();

var offset = 0;
var endPoint = "http://data.cityofchicago.org/resource/a95h-gwzm.json?$q=CTA&$offset=" + offset + "&$select=location,primary_type,block,date,description,location_description&$where=primary_type = 'ASSAULT' OR primary_type = 'BATTERY' OR primary_type = 'ROBBERY' OR primary_type = 'THEFT'";

function apiChicago(filter){

		this.filter = filter;

		var getData = $.ajax({
						url: endPoint,
						type: "GET",
						dataType: "json"
		});

		getData.done( function(response){

			var responseLen = response.length;

			var resCount = 0;
			for (var i = offset; i < responseLen + offset; i++){

				if (filter == 'location_description'){

					var specDesc = response[resCount][filter];

					if (specDesc == 'CTA PLATFORM' || specDesc == 'CTA TRAIN'){
						receptacle[i] = response[resCount];
					}
					resCount++;

				} else {
					receptacle[i] = response[resCount];
					resCount++;
				}

			}
			prepNext(responseLen);

		});//end of response

}

function prepNext(responseLen){

	//console.log("at prepNext");

	this.responseLen = responseLen;

	//console.log(responseLen);

	if (responseLen == 1000){
		//console.log(receptacle);
		offset += 1000;
		endPoint = "http://data.cityofchicago.org/resource/a95h-gwzm.json?$q=CTA&$offset=" + offset + "&$select=location,primary_type,block,date,description,location_description&$where=primary_type = 'ASSAULT' OR primary_type = 'BATTERY' OR primary_type = 'ROBBERY' OR primary_type = 'THEFT'";
		//console.log(endPoint);
		apiChicago('location_description');

	} else {
		processData();
	}

}

function processData() {
	//console.log("at processData");

	console.log("Entry count: " + Object.keys(receptacle).length);

	var dataProcess = new CHICAGO_DATA(receptacle);
	var majorCrimeCTA_EL_monthly = dataProcess.monthlyTotal("primary_type");
	displayData(majorCrimeCTA_EL_monthly);
}

function displayData(chartData){
	this.chartData = chartData;
	console.log(chartData);

	var colorsLine = ["rgba(220,0,0,1)","rgba(0,0,0,1)","rgba(128,0,128,1)","rgba(128,128,128,1)"];
	var colorsFill = ["rgba(220,0,0,0.5)","rgba(0,0,0,0.5)","rgba(128,0,128,0.5)","rgba(128,128,128,0.5)"];

	var colorCounter = 0;

	for (var key in chartData){

		var chartName = '#' + key.toLowerCase();
		var ctx = $(chartName).get(0).getContext("2d");
		var category = chartData[key];

		console.log(category);

		var tempArray = new Array();
		for (var key in category){
			tempArray.push(category[key]);
		}

		var data = {
						labels : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Nov","Dec"],
						datasets : [
							{
								fillColor : colorsFill[colorCounter],
								strokeColor : colorsLine[colorCounter],
								pointColor : colorsLine[colorCounter],
								pointStrokeColor : colorsLine[colorCounter],
								data : tempArray
							},
						]
					}

		var myNewChart = new Chart(ctx).Line(data,{bezierCurve : false, scaleGridLineColor : "rgba(0,0,0,.2)", pointDotRadius : 2});

		colorCounter++;
	}


}