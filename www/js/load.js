var ref = window.open('http://myslice.syr.edu', '_blank', 'location=yes');

ref.addEventListener('loadstop', function() { 

	alert("sdfdsfsd");

    ref.executeSript({file: "/js/thegoods.js"});

});
