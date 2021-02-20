var dropSec = document.querySelector('.drops');
var dropcv = document.createElement('canvas');
var tmpdropcv = document.createElement('canvas');
var svg = document.querySelector('.svg');
var path = document.querySelector('.svgP');


var heightD = dropcv.height = tmpdropcv.height =  sec_height;
var widthD = dropcv.width = tmpdropcv.width = sec_width;

var tmpcxtD = tmpdropcv.getContext('2d');
var cxtD = dropcv.getContext('2d');
var coef = 210;
var drops = [];
svg.setAttributeNS(null , 'width', `${widthD}`)
svg.setAttributeNS(null , 'height', `${heightD}`)

dropSec.appendChild(dropcv);

var length_path = parseInt(path.getTotalLength());

var requestId=[];
var vertici= []
var allPoints=[];

	
window.addEventListener('resize', ()=>{

	heightD = dropcv.height = tmpdropcv.height =  sec_height;
	widthD = dropcv.width = tmpdropcv.width = sec_width;
	tmpcxtD = tmpdropcv.getContext('2d');
	cxtD = dropcv.getContext('2d');

	svg.setAttributeNS(null , 'width', `${widthD}`)
	svg.setAttributeNS(null , 'height', `${heightD}`)

	length_path = parseInt(path.getTotalLength());


})


for(var i=0; i<length_path; i+=10){
	var pointDom=path.getPointAtLength(i);
	if(pointDom.y < 60){
		continue;
	}
	var x = pointDom.x;
	var y = pointDom.y;
	allPoints.push({
		x:x,
		y:y,
	});
}


var worker = new Worker('js/workerDrop.js');

worker.addEventListener('message', (e)=>{

	vertici = JSON.parse(e.data);

	if (drops.length == 0){
		for(var i=0; i<vertici.length ;i++){

			var vely = (Math.random() *10);
			
			var r = Math.floor((Math.random() *13*3)+30);
			var drop = {
				x:vertici[i].x,
				y:Math.floor((Math.random()*10)+(Math.random()*30)+(Math.random()*3)),
				r:r,
				vely: vely >7 || vely < 3 ? vely = 4+Math.random()*Math.random() : vely
				}
			drops.push(drop);
			}
	}

	horizontal_dots(vertici);
	fall();
})



worker.postMessage(allPoints);


function horizontal_dots(vertix) {


	for (var i = 0 ; i<vertix.length; i++){
		
		var grdx = tmpcxtD.createRadialGradient(vertix[i].x, vertix[i].y-10, 0,  vertix[i].x, vertix[i].y-10 , 50);
		grdx.addColorStop(0,'rgba(255,0,0,1)');
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

	horizontal_dots(vertici);
	metabalize();
	
	requestAnimationFrame(fall)

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




