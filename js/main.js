



var section = document.querySelector('section');
var sec_height = section.clientHeight;
var sec_width = section.clientWidth;
var noscript = document.querySelector("[noscript='']");

noscript.style.display='none';
noscript.style.visibility='hidden';
noscript.removeAttribute('noscript')




const uA = navigator.userAgent


if( uA.includes("iPhone") ||  uA.includes("Android") ){

	var body = document.querySelector("body");
	var btn = document.querySelector(".menu-btn");
	var head = document.querySelector("head");
	var head_html = head.innerHTML;
	var no_zoom = "<meta name='viewport' content='user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi' />"


	var new_head = head_html + no_zoom;
	head.innerHTML = new_head;


	body.style.overflow="hidden";

}

		



window.addEventListener('resize', ()=>{

	section = document.querySelector('section');
	sec_height = section.clientHeight;
	sec_width = section.clientWidth;

})










const music = ()=>{

	const play = document.querySelector('.play-ico');
	const pause = document.querySelector('.pause-ico');
	const audio = document.querySelector('.audio');

	play.addEventListener('click', (event)=>{
		audio.play();
		pause.style.display='block';
		event.target.style.display='none';

	})


	pause.addEventListener('click', (event)=>{
		audio.pause();
		play.style.display='block';
		event.target.style.display='none';
	})
}





const changeLenguage = ()=>{


	const ita = document.querySelector('.ita');
	const eng = document.querySelector('.eng');

	const itaT = document.querySelectorAll("[lang='ita']");
	const engT = document.querySelectorAll("[lang='eng']");


	ita.addEventListener('click', ()=>{


		for(var i=0; i<itaT.length; i++){
			itaT[i].style.display='block';
		}

		for(var i=0; i<engT.length; i++){
			engT[i].style.display='none';
		}
	})


	eng.addEventListener('click', ()=>{


		for(var i=0; i<itaT.length; i++){
			itaT[i].style.display='none';
		}

		for(var i=0; i<engT.length; i++){
			engT[i].style.display='block';
		}
	})


}




const rotateT = ()=>{

	var T = document.querySelectorAll('.T');

	var svgns = 'http://www.w3.org/2000/svg';


	function drawTriangle(T){

	
	for(var i=0;i<T.length;i++){
		var svg = document.createElementNS( svgns, 'svg');
		var triangle = document.createElementNS( svgns, 'polygon');
		

		var heightT = T[i].clientHeight;
		var widthT = T[i].clientWidth;

		svg.setAttributeNS(null, 'viewBox', `0 0 ${widthT} ${heightT}`);
		svg.style.position='relative';
		svg.style.zIndex='10';	


		triangle.setAttributeNS(null, 'points', `${widthT/8} ${heightT/8}, ${widthT/4} ${heightT-heightT/4}, ${widthT-widthT/6} ${heightT-heightT/8}`);
		


		if( i == 0){
			with(triangle.style){
				fill='none';
				stroke='rgb(0,0,0)';
				strokeWidth='7px'
			}
		}else if(i == 1) {

			with(triangle.style){
				fill='none';
				stroke='red';
				strokeWidth='7px'
				filter=`blur(4px)`
			}

		}else if (i == 2) {

			with(triangle.style){
				fill='none';
				stroke='black';
				strokeWidth='7px'
				filter=`blur(4px)`
			}
		}

		triangle.style.position='relative';
		triangle.style.zIndex='10';
		svg.appendChild(triangle);
		T[i].appendChild(svg);
	}
	}


	drawTriangle(T);

	window.addEventListener('scroll', ()=>{
		var scroll = window.scrollY
		for(var i=0; i<T.length ;i++){
			T[i].style.transform=`rotate(${scroll/10-60}deg)`;
		}
	})


	window.addEventListener('resize',()=>{
		
		for(var i=0; i<T.length; i++){

			T[i].innerHTML='';
		}

		drawTriangle(T)

	})
}



const open_menu = () => {
	let menu = document.querySelector('.menu');
	let controlsNav = document.querySelector('.ctrl-nav');
	let controls = document.querySelector('.controls');
	let btn = document.querySelector('.menu-btn');
	btn.addEventListener('click', function () {
		menu.classList.toggle('nav-active');
		if (!menu.classList.contains('nav-active')){
			menu.style.animation="closeM 1s ease-out";
		}
		else{
			menu.style.animation="";
		}
	
		controls.classList.toggle('controls-active');
		if (!controls.classList.contains('controls-active')){
			controlsNav.style.height='0px';
			controlsNav.style.transition='height 2s';
			controls.style.animation="closeC 1s ease-out forwards";

		}
		else{
			controlsNav.style.height='40vh';
			controls.style.animation="";
		}	

	});


}



const spiral = () => {

	const sec3 = document.querySelector('.section3');
	const svgns = "http://www.w3.org/2000/svg"

	function create_cicles(){

		var ccx = sec_width /2;
		var ccy = sec_height /2;
		var svg = document.createElementNS( svgns, 'svg');
		svg.setAttributeNS(null, 'viewBox',`0 0 ${sec_width} ${sec_height}`);

		svg.setAttributeNS(null, 'preserveAspectRatio', "xMidYMid slice");
		svg.id='spiral';

		svg.style.position='absolute';


		for (var i = 0; i < 20; i++){
			var circle = document.createElementNS(svgns, 'circle');
			circle.setAttributeNS(null, 'cx', `${ccx}`);
			circle.setAttributeNS(null, 'cy',`${ccy}`);
			circle.setAttributeNS(null, 'r', `${i*20*3}`);
		

			with(circle.style){
				fill='none';
				stroke='black';
				strokeWidth='30px';
				zIndex='0';
			}


			circle.addEventListener('mouseenter', (event)=>{
				with(event.target.style){
					fill='none';
					stroke='red';
					strokeWidth='40px';
				}
			})
			
			circle.addEventListener('mouseleave', (e,i)=>{
 				with(event.target.style){
				fill='none';
				stroke='black';
				strokeWidth='30px';
				}
			})

			svg.appendChild(circle);

		}
	sec3.appendChild(svg);
		
	}



	window.addEventListener('load', () => {
		create_cicles();
	})


	window.addEventListener('resize', () =>{
		var old = document.querySelector('#spiral');
		sec3.removeChild(old)
		create_cicles();	
	})

}


const fixControls = () =>{
	const controls = document.querySelector('.controls')
	const btn = document.querySelector('.menu-btn')

	var widthBtn = btn.clientWidth
	controls.style.width = widthBtn+'px'


	window.addEventListener('resize', ()=>{

		widthBtn = btn.clientWidth
		controls.style.width= widthBtn+'px'
	})
}


const app = () => {
	open_menu()	
	fixControls();
	spiral();
	rotateT();
	changeLenguage();
	music();
}

app();
