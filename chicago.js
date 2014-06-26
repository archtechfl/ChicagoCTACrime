$( document ).ready(function() {
	console.log("ready");
	apiChicago('location_description');
});

var receptacle = new Object();
var dataProcess = new Object();
var majorCrimeCTA_EL_monthly = new Object();

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

	dataProcess = new CHICAGO_DATA(receptacle);
	majorCrimeCTA_EL_monthly = dataProcess.monthlyTotal("primary_type");
	var displayMonthly = new CHART_DISPLAY(majorCrimeCTA_EL_monthly).monthly({robbery : "rgba(220,0,0,1)", assault : "rgba(0,0,0,1)", battery : "rgba(128,0,128,1)", theft : "rgba(128,128,128,1)"});
	EL_STOPS();

}

function EL_STOPS(){ 

	var endPoint = "http://data.cityofchicago.org/resource/8pix-ypme.json";

	function results(response){

		var response = response;

		var filtered = new Object();
		var blacklist = [];
		var errorList = ["95th/Ran Ryan (Red Line)","California  (Blue Line)"];
		var corrections = ["95th/Dan Ryan (Red Line)","California (Blue Line)"];
		for (var key in response){

			var sDN = response[key]["station_descriptive_name"];
			var corrIndex = errorList.indexOf(sDN);
			if (corrIndex > -1){
				sDN = corrections[corrIndex];
			};

			if (blacklist.indexOf(sDN) == -1){
				blacklist.push(sDN);
				filtered[sDN] = response[key]["location"];
			} ;

		};

		console.log(filtered);
		crimeLocations(filtered);

	};

	function listing() {
		console.log("listing");
		var getData = $.ajax({
						url: endPoint,
						context: this,
						type: "GET",
						dataType: "json"
		});

		getData.done( function(response){

			results(response);

		});//end of response

	};

	listing();

};

function crimeLocations(filtered){
	this.filtered = filtered;
	var stationsCrime = dataProcess.stationCrime(filtered);
}