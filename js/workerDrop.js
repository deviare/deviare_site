


self.onmessage = function(e) {



	var  allPoints = e.data;

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
				vertici.push(temp_point)
			}
		}
		old_point = new_point;
	}

	self.postMessage(JSON.stringify(vertici));

}
