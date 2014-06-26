// Chicago data processing aids

// Begin Class
function CHICAGO_DATA(publicData) {

	var theData = publicData;
	//console.log("Data handler created!");

	//Create the master data object to return
	var publicObj = new Object();

	//New public data category object function
	var newCat = function (publicDataCat){
		publicObj[publicDataCat] = new Object();
	}

	var months = ["jan","feb","mar","apr","may","jun","july","aug","sep","oct","nov","dec"];

	//month creator function
	var monthCreator = function (publicDataObject){

		//console.log("month creator");

		this.publicDataObj = publicDataObject;
		for (var iM=0; iM < months.length; iM++){
			//publicDataObj[months[iM]] = new Object();
			//Creates the month number receptacles and starts them at zero
			Object.defineProperty(publicDataObj, months[iM], 
				{value : 0,
                writable : true,
                enumerable : true,
                configurable : true});
		}
		return publicDataObj;
	}

	//Monthly totals method for data, specify a field label that you want to get totals for, all possible categories covered under the label
	CHICAGO_DATA.prototype.monthlyTotal = function(fieldLabel) {

		this[fieldLabel] = fieldLabel;

		//console.log("Finding monthly totals");

		var creationCount = 0;

		//get list of keys in theData

		var theDataKeys = new Array();
		for (var key in theData){
			theDataKeys.push(key);
		}

		for (var i=0; i < Object.keys(theData).length; i++){

			var publicDataCat = theData[theDataKeys[i]][fieldLabel];

			if (publicObj[publicDataCat]) {
				//console.log("property exists in database");
			} else {
				//console.log("property does not exist in database yet");
				newCat(publicDataCat);
				monthCreator(publicObj[publicDataCat]);
				creationCount++;
			}

			var publicDataDate = new Date(theData[theDataKeys[i]].date);
			var monthName = months[publicDataDate.getMonth()];
			
			publicObj[publicDataCat][monthName]++;


		}

		return publicObj;

	}//end of monthlyTotal

	CHICAGO_DATA.prototype.stationCrime = function(stationsListing) {
		console.log("at stationCrime");
		this.stationsListing = stationsListing;
		console.log(stationsListing);
		console.log(theData);
	};

}