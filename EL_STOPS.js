//Begin class

function EL_STOPS(){ 

	var thisClass = this;

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

