//Class starts here

// Begin Class
function CHART_DISPLAY(chartData) {

	var chartData = chartData;

	CHART_DISPLAY.prototype.monthly = function() {

		console.log("at monthly");

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

	}//end chart display monthly

}