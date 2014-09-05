
var regexDays = function(string)
{
	var days = new RegExp("(Mo)|(Tu)|(We)|(Th)|(Fr)|(Sa)|(Su)", "g");
	daysarr = string.match(days);
	return daysarr;

}


var regexHours = function(string)
{
	var hours = new RegExp("([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](AM|PM)","g");
	hoursarr = string.match(hours);
	return hoursarr;

}

var getStartDate = function(string)
{ 
	var sub = string.substr(0,10)
	var startdate = new Date(sub);
	return startdate;

}

var getEndDate = function(string)
{
	var sub = string.substr(13,22);
	var enddate = new Date(sub);
	return enddate;

}


//Edge Cases
// If a class is dropped it sometimes shows up with the status of dropped
// do not add to calendar

t = document.getElementById('ptifrmtgtframe');
//The schedule is in an iframe so we need to use the document from that iframe instead
newdocument = t.contentWindow.document;
newdocument.getElementsByClassName('PSGROUPBOXWBO');
classrows = newdocument.getElementsByClassName('PSGROUPBOXWBO');
//start at 1 because 1st row is the controls
classes = []
for (var i = 1; i < classrows.length; i++) {
	var workingrow = classrows[i];
	var classnametr = workingrow.getElementsByClassName('PAGROUPDIVIDER')[0]
	var classname = classnametr.innerText;
	realindex = (i - 1).toString();
	var status = newdocument.getElementById("STATUS$" + realindex).innerText;
	var units = newdocument.getElementById("win0divDERIVED_REGFRM1_UNT_TAKEN$" + realindex).innerText;
	var grading = newdocument.getElementById("win0divGB_DESCR$" + realindex).innerText;

	var innerinfo = newdocument.getElementById('CLASS_MTG_VW$scroll$' + realindex);
	var innerinfoarr = innerinfo.children[0].children;
	//start at 1 because first row is garbage
	for (var j = 1; j < innerinfoarr.length; j++) {
		var newclass = {};
		var innerchildren = innerinfoarr[j].children;
			newclass.classnumber = innerchildren[0].innerText;
			newclass.section =  innerchildren[1].innerText;
			newclass.component =  innerchildren[2].innerText;
			var datetime =  innerchildren[3].innerText;
			newclass.room =  innerchildren[4].innerText;
			newclass.instructor =  innerchildren[5].innerText;
			var endstartdate =  innerchildren[6].innerText;

			newclass.classname = classname;
			newclass.status = status;
			newclass.units = units;
			newclass.grading = grading;

			newclass.occurences = regexDays(datetime);

			var hours = regexHours(datetime);
			newclass.starttime = hours[0];
			newclass.endtime = hours[1];


			newclass.startdate = getStartDate(endstartdate);
			newclass.enddate = getEndDate(endstartdate);

			console.log(newclass);

		classes.push(newclass);

	}

	console.log(classname);
	console.log(status);
	console.log(units);
	console.log(grading);

};

