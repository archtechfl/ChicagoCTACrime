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

	var dataProcess = new CHICAGO_DATA(receptacle);
	var majorCrimeCTA_EL_monthly = dataProcess.monthlyTotal("primary_type");
	var displayMonthly = new CHART_DISPLAY(majorCrimeCTA_EL_monthly).monthly();

}