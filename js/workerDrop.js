


self.onmessage = function(e) {


	console.log('worker e -> ', e.data)

	const width = e.data['width']
	var allPoints = e.data['points'];

	var vertici=[];
	var old_point = new DOMPoint(0,0);
	var new_point;
	var temp_point;


	for( var i=0 ; i<allPoints.length ; i++ ){
		
		new_point = allPoints[i];
	
		if(new_point.y > old_point.y){
			temp_point=new_point;
		}
		if (new_point.y < old_point.y){
			if (!vertici.includes(temp_point)){
				if ( temp_point.x > 25 && temp_point.x < width -25 )
				vertici.push(temp_point)
			}
		}
		old_point = new_point;
	}

	self.postMessage(JSON.stringify(vertici));

}



