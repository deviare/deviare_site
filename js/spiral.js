const sec3 = document.querySelector('.section3');
const svgns = "http://www.w3.org/2000/svg"
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.height = h = sec_height
canvas.width = w = sec_width
canvas.style.position = 'absolute'
canvas.style.zIndex= '-10'

sec3.appendChild(canvas)

function epiletic() {
	function  r(){  return Math.floor(Math.random() *255)  }

	ctx.clearRect(0,0, w,h)
	var  imageData = ctx.getImageData(0, 0 , w, h)
	var pixels = imageData.data
	for ( var i=0; i<pixels.length; i=i+4 ){
		
		pixels[i] =r()
		pixels[i+1] = r()
		pixels[i+2] = r()
		pixels[i+3] = 255 
	}
	ctx.putImageData(imageData, 0, 0)
	ctx.fill()
}


function create_cicles(){
	const ccx = sec_width /2
	const ccy = sec_height /2;
	const svg = document.createElementNS( svgns, 'svg');
	svg.setAttributeNS(null, 'viewBox',`0 0 ${sec_width} ${sec_height}`);
	svg.setAttributeNS(null, 'preserveAspectRatio', "xMidYMid slice");
	svg.id='spiral';
	svg.style.position='absolute';
	svg.style.zIndex='-5';
	for (var i=20; i > 0; i--){
		var circle = document.createElementNS(svgns, 'circle');
		
		const r = i*90
		circle.setAttributeNS(null, 'cx', `${ccx}`);
		circle.setAttributeNS(null, 'cy',`${ccy}`);
		circle.setAttributeNS(null, 'r', r);
		circle.classList.add('circle-black')
		circle.classList.add(i)
		with(circle.style){

			fill='none';
			stroke='black';
			strokeWidth='30px';
			position='absolute'
			zIndex='-5';
		}

		var circleWhite = document.createElementNS(svgns, 'circle');
		
		circleWhite.setAttributeNS(null, 'cx', `${ccx}`);
		circleWhite.setAttributeNS(null, 'cy',`${ccy}`);
		circleWhite.setAttributeNS(null, 'r', r-30);
		with(circleWhite.style){
			fill='none';
			stroke='white';
			strokeWidth='30px';
			position='absolute'
			zIndex='-5';
		}

		svg.appendChild(circle);
		svg.appendChild(circleWhite);
	}
	sec3.appendChild(svg);
}





window.addEventListener('load', () => {
	create_cicles();
})


window.addEventListener('resize', () =>{
	var old = document.querySelector('#spiral');
	canvas.height = h = sec_height
	canvas.width = w = sec_width
	sec3.removeChild(old)
	create_cicles();	
})



