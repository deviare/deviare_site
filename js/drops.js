const workerDrop = new Worker('js/workerDrop.js');
const workerShape = new Worker('js/workerShape.js');
const dropSec = document.querySelector('.drops');
const dropcv = document.createElement('canvas');
const tmpdropcv = document.createElement('canvas');
var heightD = dropcv.height = tmpdropcv.height =  sec_height;
var widthD = dropcv.width = tmpdropcv.width = sec_width;
var tmpcxtD = tmpdropcv.getContext('2d');
var cxtD = dropcv.getContext('2d');
var coef = 210;
var drops = [];
var requestId=[];
var spikes = []

dropSec.appendChild(dropcv);


workerDrop.addEventListener('message', (e)=>{
	vertici = JSON.parse(e.data);
	var velsy = []
	var heights = []

	if (drops.length == 0){
		for(var i=0; i<vertici.length ;i++){
			const svgs = document.querySelectorAll('.svg')
			for(var q=0; q<svgs.length; q++){
				var  posx = 0
				if (q == 0){
					posx = vertici[i].x
				}
				if (q == 1){
			 		posx = vertici[i].x + (1440-vertici[i].x) *2
				}
				if (q == 2){
					posx = vertici[i].x + 1440 *2
				}
				if (q == 3) {
			 		posx = (vertici[i].x + (1440-vertici[i].x) *2) +  1440 * 3
				}
	
				spike = {
					'x':posx,
					'y':vertici[i].y
				}
				spikes.push(spike)
			
				var final_vel = 0
				while (true){
					const vely = (Math.random() *2 ) + 3 
					if ( !velsy.includes(vely) ){
						velsy.push(vely)
						final_vel =  vely
						break
					} 
				}

				var final_height = 0
				while (true){
					const h = Math.random() * vertici[i].y
					if ( !heights.includes(h) ){
						heights.push(h)
						final_height = h
						break
					}
				}
				

				var r = Math.floor((Math.random() *13*3)+30);
				var drop = {
					x:posx,
					y:final_height,
					r:r,
					vely: final_vel,
					};
				drops.push(drop);
			}
		}
	}
	horizontal_dots(spikes);
})




workerShape.addEventListener('message', (bloodShape) => {

	const title = document.querySelector('.title');
	const first = document.querySelector('#first');
	const shapeWrap = document.createElement('div');
	const blood = bloodShape.data
	const svgWidth = 1440
	with (shapeWrap.style){
		position='absolute'
		width ='100vw'
		height = '100vh'
	}
	first.insertBefore(shapeWrap, title);
	if (window.innerWidth < svgWidth ){	
		shapeWrap.innerHTML = blood;
	}
	if (window.innerWidth > svgWidth && window.innerWidth < svgWidth *2 ){	
		shapeWrap.innerHTML = blood+blood;
		const svgs = document.querySelectorAll('.svg');
		const bloodTwo = svgs[1]
		bloodTwo.style.transform = 'scale(-1,1) translateX(-100%)'
	}
	if (window.innerWidth > svgWidth * 2  && window.innerWidth < svgWidth *3 ){	
		shapeWrap.innerHTML = blood+blood+blood;
		const svgs = document.querySelectorAll('.svg');
		const bloodTwo = svgs[1]
		bloodTwo.style.transform = 'scale(-1,1) translateX(-100%)'
		const bloodThree = svgs[2]
		bloodThree.style.transform = 'translateX(200%)'
	}
	if (window.innerWidth > svgWidth*3 ){	
		shapeWrap.innerHTML = blood+blood+blood+blood;
		const svgs = document.querySelectorAll('.svg');
		const bloodTwo = svgs[1]
		bloodTwo.style.transform = 'scale(-1,1) translateX(-100%)'
		const bloodThree = svgs[2]
		bloodThree.style.transform = 'translateX(200%)'
		const bloodFour = svgs[3]
		bloodFour.style.transform = 'scale(-1,1) translateX(-300%)'
	}
	
	const path = document.querySelector('.svgP');
	getCordsPathPoits(path)
		.then ( (points)  => {
			const data = {
				'width':widthD,
				'points':points
			}
			workerDrop.postMessage(data);
		})
	})


workerShape.postMessage(true);
	
window.addEventListener('resize', ()=>{
 	heightD = dropcv.height = tmpdropcv.height =  sec_height;
	widthD = dropcv.width = tmpdropcv.width = sec_width;
	tmpcxtD = tmpdropcv.getContext('2d');
	cxtD = dropcv.getContext('2d');
})




async function getCordsPathPoits (path){
	var allPoints=[];
	var length_path = parseInt(path.getTotalLength());

	for(var i=0 ; i<length_path; i=i+3){
		var pointDom=path.getPointAtLength(i);
		if(pointDom.y < 60 ){
			continue;
		}
		var x = pointDom.x;
		var y = pointDom.y;
		allPoints.push({
			x:x,
			y:y, 
		});
	}
	return await allPoints
}


function horizontal_dots(vertix) {

	for (var i = 0 ; i<vertix.length; i++){
		var grdx = tmpcxtD.createRadialGradient(vertix[i]['x'], vertix[i]['y']-10, 0,  vertix[i]['x'], vertix[i]['y'], 50);
		grdx.addColorStop(0,'rgba(255,0,0,1)');
		grdx.addColorStop(.7,'rgba(255,0,0,0)');
		grdx.addColorStop(1,'rgba(255,0,0,0)');
		tmpcxtD.fillStyle =grdx;
		tmpcxtD.arc(vertix[i].x, vertix[i].y-10, 80, 0, Math.PI*2 , false);
		tmpcxtD.fill();
		tmpcxtD.closePath();
 	}
}


function fall(){
		tmpcxtD.clearRect(0,0, widthD, heightD);
		var le = drops.length;
		while(le--){
			var drp = drops[le];
			drp.y += drp.vely;
			
			if ( drp.y > heightD ){
			drp.y = 0;
			}

			tmpcxtD.beginPath();
			var grd = tmpcxtD.createRadialGradient(drp.x, drp.y, 0, drp.x, drp.y, drp.r);
			grd.addColorStop(0,'rgba(255,0,0,1)');
			grd.addColorStop(1,'rgba(255,0,0,0)');
			tmpcxtD.fillStyle= grd;
			tmpcxtD.arc(drp.x,  drp.y , drp.r , 0 ,Math.PI*2, 0);
			tmpcxtD.fill();
			tmpcxtD.closePath();
		}
	horizontal_dots(spikes);
	metabalize();
}


function metabalize() {
	var imageData = tmpcxtD.getImageData(0, 0, widthD, heightD),
	pix = imageData.data;

	for (var i = 0, n = pix.length; i < n; i += 4) {
		if (pix[i + 3] < coef) {
			pix[i + 3] /= 6;
			if (pix[i + 3] > coef / 4) {
				pix[i + 3] = 0;
			}
		}
	}
	cxtD.putImageData(imageData, 0, 0);
}




