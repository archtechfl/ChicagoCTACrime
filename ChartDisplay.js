//Class starts here

// Begin Class
function CHART_DISPLAY(chartData) {

	var chartData = chartData;

	CHART_DISPLAY.prototype.monthly = function(colors) {

		this.colors = colors;

		console.log(colors);

		console.log("at monthly");

		var colorsFill = new Object();

		for (var key in colors){
			var fullValue = colors[key];
			fillValue = fullValue.replace(/(,1\))/g,',0.5)');
			colorsFill[key] = fillValue;
		}

		var colorCounter = 0;

		for (var key in chartData){

			var chartName = key.toLowerCase();

			var chartIDdoc = '#' + chartName;
			var ctx = $(chartIDdoc).get(0).getContext("2d");
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
									fillColor : colorsFill[chartName],
									strokeColor : colors.chartName,
									pointColor : colors.chartName,
									pointStrokeColor : colors.chartName,
									data : tempArray
								},
							]
						}

			var myNewChart = new Chart(ctx).Line(data,{bezierCurve : false, scaleGridLineColor : "rgba(0,0,0,.2)", pointDotRadius : 2});

			colorCounter++;
		}

	}//end chart display monthly

}