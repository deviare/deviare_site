const T = document.querySelectorAll('.T');
var intervalParticel = 0
var intervalEp = 0
var intervalDrops = 0

window.addEventListener('scroll', () => {
	for(var i=0; i<T.length ;i++){
		T[i].style.transform=`skew(${window.scrollY/15-70}deg,${window.scrollY/15-50}deg)`;
	}

	if ( window.scrollY > sec_height *2 +3 ){
		if (intervalParticel == 0){
			intervalParticel = setInterval( () => show(), 100 )
		}
	}
	else{
		if( intervalParticel != 0 ){
			clearInterval(intervalParticel)
			intervalParticel = 0
		}
	}

	if ( window.scrollY > sec_height +2 && window.scrollY < sec_height *3 ){
		if (intervalEp == 0){
			intervalEp = setInterval( () => epiletic(), 100 )
		}
	}
	else{
		if( intervalEp != 0 ){
			clearInterval(intervalEp)
			intervalEp = 0
		}
	}
	if ( window.scrollY < sec_height ){
		if (intervalDrops == 0){
			intervalDrops = setInterval( () => fall(), 100 )
		}
	}
	else{
		if ( intervalDrops != 0 ){
			clearInterval(intervalDrops)
			intervalDrops = 0
		}
	}
})

if ( window.scrollY < sec_height ){
	if (intervalDrops == 0){
		intervalDrops = setInterval( () => fall(), 100 )
	}
}

if ( window.scrollY > sec_height *2 +3 ){
	if (intervalParticel == 0){
		intervalParticel = setInterval( () => show(), 100 )
	}
}
if ( window.scrollY > sec_height +2 && window.scrollY < sec_height *3 ){
	if (intervalEp == 0){
		intervalEp = setInterval( () => epiletic(), 100 )
	}
}
