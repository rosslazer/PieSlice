// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)



    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})


angular.module('PieSlice', ['ionic'])

.controller('main', function($scope, $ionicPopup) {
  $scope.loggedin = false;
  $scope.classes = [];
    $scope.login =  function() {
    // Wait for Cordova to load

//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//

// TODO - account for status==dropped edge case
// TODO - decide if we want to have events repeat for a few years so we don't need to lookup academic calendar


var classes = [];

var iabRef = null;


function onDeviceReady() {
    var iabRef = window.open('https://myslice.syr.edu', '_blank', 'location=no', 'toolbar=no');
    iabRef.addEventListener('exit', iabClose);
    function iabClose(event) {
    iabRef.removeEventListener('exit', iabClose);




}

    iabRef.addEventListener('loadstop', function(event) {

        if (event.url == "https://myslice.syr.edu/psp/PTL9PROD/EMPLOYEE/EMPL/h/?tab=DEFAULT") {
            iabRef.executeScript({
                code: "localStorage.setItem( 'classes', '' );"
            });
            // Start an interval



            console.log(event);



            iabRef.executeScript({
                file: "https://gist.githubusercontent.com/rosslazer/144954e00137738adc6c/raw/02b7c02c404f47a447f7abaea8debb0117adc820/gistfile1.js"
            });

            //alert("POST LOAD SCRIPT");


        }



        if (event.url == "https://myslice.syr.edu/psp/PTL9PROD/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_LIST.GBL?PORTALPARAM_PTCNAV=SYR_VW_CLASS_SCHEDULE_CREF&EOPP.SCNode=EMPL&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=ADMN_STUDENT_SERVICES&EOPP.SCLabel=&EOPP.SCPTcname=PT_PTPP_SCFNAV_BASEPAGE_SCR&FolderPath=PORTAL_ROOT_OBJECT.SYR_CREF_ROOT_FOLDER.SYR_STUDENT_SRVCS_FOLDER.SYR_ENROLLMENT_FOLDER.SYR_VW_CLASS_SCHEDULE_CREF&IsFolder=false")

        {
            //alert("SDFDSFDSFSD");

            iabRef.executeScript({
                file: "https://gist.githubusercontent.com/rosslazer/e523982c2bcf039016e6/raw/54dabe41a68a4038778601bd84c858f0947abf1a/gistfile1.js"
            });



            var loop = setInterval(function() {

                // Execute JavaScript to check for the existence of a name in the
                // child browser's localStorage.
                iabRef.executeScript({
                        code: "localStorage.getItem( 'classes' )"
                    },
                    function(values) {
                        var name = values[0];

                        // If a name was set, clear the interval and close the InAppBrowser.
                        if (name) {
                            //alert("2");

                            classes = JSON.parse(values);
                            $scope.classes = classes;
                            $scope.loggedin = true;
                            $scope.$apply();

                            window.foo = $scope.loggedin;
                            clearInterval(loop);
                            iabRef.close();
      



                        }
                    }
                );


            });


        }
    });





}

};


 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Classes Already Added To Calendar',
     template: 'Are you sure you want to add your classes again?'
   });
   confirmPopup.then(function(res) {
     if(res) {
      $scope.addToNativeCal();
     } 
   });
 };


$scope.addtoCal = function() {

  if(Boolean(window.localStorage['addedCal'])){
    $scope.showConfirm();
  }
  else {
    $scope.addToNativeCal();
  }

};


$scope.addToNativeCal = function() {

    var classes = $scope.classes;
    window.basedate = basedate;
    var indexmonth = new Date(classes[0].startdate);
    var basedate = indexmonth.getDate();
    var basemonth = indexmonth.getMonth();
    window.basemonth = basedate;
    window.indexmonth = indexmonth;


      for (var i = 0; i < classes.length; i++) {

        sdate = (new Date(classes[i].startdate)).getDate()
        if(sdate < basedate  )
        {
          basedate = sdate;
        }



      }


    console.log("starting");
    for (var i = 0; i < classes.length; i++) {
        for (var j = 0; j < classes[i].occurences.length; j++) {
            var currentevent = classes[i];
            // beware: month 0 = january, 11 = december
            var title = currentevent.classnumber + " - " + currentevent.classname + " - " + currentevent.component;
            var location = currentevent.room;
            var notes = "";
            var success = function(message) {
                console.log("Success: " + JSON.stringify(message));
            };
            var error = function(message) {
                console.log("Error: " + message);
            };

            //could add reminders if the user chooses?
            var calOptions = window.plugins.calendar.getCalendarOptions();
            calOptions.firstReminderMinutes = null;
            calOptions.recurrence = "weekly";


            //This is broken for some reason?
            calOptions.recurrenceEndDate = new Date(currentevent.enddate);
            var day = basedate;
            switch (currentevent.occurences[j]) {
                case "Mo":
                    day = day + 0;
                    break;
                case "Tu":
                    day = day + 1;
                    break;
                case "We":
                    day = day + 2;
                    break;
                case "Th":
                    day = day + 3;
                    break;
                case "Fr":
                    day = day + 4;
                    break;
                case "Sa":
                    day = day + 5;
                    break;
                case "Su":
                    day = day + 6;
                }
                  


                  

            var rex = RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])(AM|PM)','g');

            var startmatches = rex.exec(currentevent.starttime);
            rex.exec("")
            var endmatches = rex.exec(currentevent.endtime);
            var startDate;
            var endDate;



            var starthours = parseInt(startmatches[1]);
            var startminutes = parseInt(startmatches[2]);
            if(startmatches[3] =="PM" && starthours >= 1 && starthours <=11)
            {
              starthours = starthours +12; 
            }
            else if(startmatches[3] =="AM" && starthours == 12) 
            {
              starthours = starthours - 12; 

            }
            


            startDate = new Date(2014, basemonth, day, starthours, startminutes, 0, 0);


            var endhours = parseInt(endmatches[1]);
            var endminutes = parseInt(endmatches[2]);
            if(endmatches[3] =="PM" && endhours >= 1 && endhours <=11)
            {
              endhours = endhours +12; 
            }
            else if(endmatches[3] =="AM" && endhours == 12) 
            {
              endhours = endhours - 12; 

            }
            
            
  
            
            endDate = new Date(2014, basemonth, day, endhours, endminutes, 0, 0);

            //alert(startDate + " " + endDate)


            //new Date(2014, 7, day, 0, 0, 0, 0, 0);
            window.plugins.calendar.createEventWithOptions(title, location, notes, startDate, endDate, calOptions, success, error);


        }

    }
    console.log("Finished");
    window.localStorage['addedCal'] = true;

};




//End of addTo Cal
});