var ref = window.open('http://myslice.syr.edu', '_blank', 'location=yes');

ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
