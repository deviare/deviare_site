var secP = document.querySelector('.particel');
var cvP = document.createElement('canvas');

cvP.height = sec_height;
cvP.width = sec_width;
cvP.style.position='absolute';

var ctxP = cvP.getContext('2d'); 
var particels = [];
var min_distance = 150;
var n_dots=100;

secP.appendChild(cvP);


window.addEventListener('resize', ()=>{

        cvP.height = sec_height;
        cvP.width = sec_width;
        ctxP = cvP.getContext('2d');

        particels=[];

        if( sec_width< 650){
                n_dots=70;
                min_distance=80;
        }else if  ( (sec_width > 650) && (sec_width <1000 ) ){
                n_dots=80;
                min_distance=80;
        }else if ( sec_width > 1000 && sec_height < 400 ){
                n_dots=100;
                min_distance=80;
        }else{
                n_dots=100;
                min_distance=150;
        }

        fillDots(n_dots);
})


if( sec_width< 650){
	n_dots=70;
	min_distance=80;
}else if  ( (sec_width > 650) && (sec_width <1000 ) ){
	n_dots=80;
	min_distance=80;
}else if ( sec_width > 1000 && sec_height < 400 ){
	n_dots=100;
	min_distance=80;
}else{
	n_dots=100;
	min_distance=150;
}

function getVel(){
	while(true){
		const vel =  Math.random() - Math.random();
		if (vel != 0){
			return vel
		}
	}
}


function fillDots(n_dots){
	for(var i=0; i<n_dots; i++){
		var velx = getVel();
		var vely =  getVel();
		var r = Math.floor(Math.random())+5;
		var part = {
			x: Math.floor((Math.random()*sec_width)),
			y: Math.floor((Math.random()*sec_height)),
			r: r < 5 ? 6 : r,
			velx: velx,
			vely:vely
		}
		particels.push(part);
	}
}


function show(){

	ctxP.fillStyle='rgba(255,0 ,0, 1)';
	ctxP.rect(0, 0, sec_width, sec_height);
	ctxP.fill()

	var len = particels.length
	while (len--){

		var part = particels[len];
		part.x += part.velx;
		part.y += part.vely;

		if ( part.x < 0 ){
			part.x = sec_width;
		}

		if ( part.x  >  sec_width ){
			part.x = 0;
		}

		if (part.y  < 0 ){
			part.y = sec_height;
		}
	
		if (part.y  >  sec_height ){
			part.y = 0;
		}

		ctxP.beginPath();
		ctxP.fillStyle = 'white';
		ctxP.arc(part.x, part.y, part.r/2, 0, Math.PI*2, false);
		ctxP.fill();
		ctxP.closePath();
	}
	checkDistance();
}





function checkDistance(){
	for(var x=0; x<particels.length; x++){
		var p1 = particels[x];
		for(var i=0 ; i<particels.length; i++){
			var p2 = particels[i];
			var close = getDistance(p1,p2);
			if(close){
				ctxP.beginPath()
				ctxP.strokeStyle='white';
				ctxP.moveTo(p1.x, p1.y);
				ctxP.lineTo(p2.x,p2.y);
				ctxP.stroke()
		 		ctxP.closePath();
		 	}
		}
	}
}

function getDistance(prt, prt1){
	return Math.sqrt((prt.x-prt1.x)*(prt.x-prt1.x)+ (prt.y-prt1.y)*(prt.y-prt1.y)) < min_distance
}



fillDots(n_dots)

