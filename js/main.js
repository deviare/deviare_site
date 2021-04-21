var section = document.querySelector('section');
var sec_height = section.clientHeight;
var sec_width = section.clientWidth;
const noscript = document.querySelector("[noscript='']");

noscript.style.display='none';
noscript.style.visibility='hidden';
noscript.removeAttribute('noscript')

const uA = navigator.userAgent

if( uA.includes("iPhone") ||  uA.includes("Android") ){

	const body = document.querySelector("body");
	const btn = document.querySelector(".menu-btn");
	const head = document.querySelector("head");
	const head_html = head.innerHTML;
	const no_zoom = "<meta name='viewport' content='user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi' />"

	const new_head = head_html + no_zoom;
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

	const T = document.querySelectorAll('.T');
	const svgns = 'http://www.w3.org/2000/svg';

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
			triangle.style.zIndex='0';
			svg.appendChild(triangle);
			T[i].appendChild(svg);
		}
	}

	drawTriangle(T);

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



const fixControls = () =>{
	const controls = document.querySelector('.ctrl-nav')
	const btn = document.querySelector('.menu-btn')
	const nav = document.querySelector('.nav')

	function fixWidth(){
		const widthBtn = btn.clientWidth
		controls.style.width = widthBtn+'px'

	}

	function fixMarginTop() {
		const heightBtn = btn.clientHeight
		const marginTopBtn = parseInt(window.getComputedStyle(btn).marginTop.replace('px',''))
		controls.style.marginTop = heightBtn + marginTopBtn + 20 +'px'

	}
	
	function fixMarginRight() {
		const marginRightBtn = parseInt(window.getComputedStyle(nav).paddingRight.replace('px',''))
		controls.style.marginRight =  marginRightBtn + 6 +'px'

	}

	fixWidth()
	fixMarginTop()
	fixMarginRight()

	window.addEventListener('resize', ()=>{
		fixWidth()
		fixMarginRight()
		fixMarginTop()
	})
}


const app = () => {
	open_menu()	
	fixControls();
	rotateT();
	changeLenguage();
	music();
}

app();
