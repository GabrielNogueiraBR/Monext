var bgImageArray = [
                     "germany.jpeg", 
                     "brazil.jpg", 
                  ];
                  
base = "../assets/images/bg-images/";
secs = 5;

function backgroundSequence() {
	window.clearTimeout();
   var pos = 0;
	
	for (i = 0; i < bgImageArray.length; i++) {
		setTimeout(() => { 
			document.getElementById('container').style.backgroundImage = "url("+ base + bgImageArray[pos] +")";
		   
         if ((pos + 1) === bgImageArray.length) 
            setTimeout(() =>{ backgroundSequence() }, (secs * 1000))
         else 
            pos++; 			

		}, (secs * 1000) * i)	
	}
}
backgroundSequence();