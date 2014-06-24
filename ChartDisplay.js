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

			var chartBounds = minMax(tempArray);
			var chartMax = Math.ceil(chartBounds.max / 10) * 10,
				startVal = Math.floor(chartBounds.min / 10) * 10;

			var stepWidth = 10;
			var numSteps = 0;
			if ((chartMax - startVal) < 50){
				stepWidth = stepWidth / 2;
				numSteps = (chartMax - startVal) / stepWidth;
			} else {
				numSteps = (chartMax - startVal) / stepWidth;
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

			var myNewChart = new Chart(ctx).Line(data,{bezierCurve : false, scaleGridLineColor : "rgba(0,0,0,.2)", pointDotRadius : 2, 
				scaleOverride : true,
				scaleSteps : numSteps,
				scaleStepWidth : stepWidth,
				scaleStartValue : startVal});

			colorCounter++;
		}

	}//end chart display monthly

	function minMax(array){
		this.array = array;

		var max = Math.max.apply(Math, array);
		var min = Math.min.apply(Math, array);

		var minMaxReturn = new Object();
		minMaxReturn.min = min;
		minMaxReturn.max = max;

		return minMaxReturn;

	}

}