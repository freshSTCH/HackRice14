(function(){
	var FPS=/**/50/**/,FRAME=1000/FPS,WIDTH=/**/500/**/;var HEIGHT=/**/500/**/;
	var /**/canvas/**/=(function(elem){return (function(canvas){
		elem.width=WIDTH;elem.height=HEIGHT;
		/*
		//resizing thing
		canvas.resize=function(){
			if(window.innerWidth*(1/ASPECT_RATIO)>window.innerHeight){
				HEIGHT=window.innerHeight;
				WIDTH=HEIGHT*ASPECT_RATIO;
			}else{
				WIDTH=window.innerWidth;
				HEIGHT=WIDTH*(1/ASPECT_RATIO);
			}
			var factor=WIDTH/window.innerWidth;
			elem.width=WIDTH;elem.height=HEIGHT;
			return factor;
		};
		canvas.resize();
		*/
	//input
		elem.style.cursor="none";elem.setAttribute("tabindex","0");
            //these lines require you to mouse over the canvas for focus
		elem.addEventListener('mouseover',function(){elem.focus()},false);
		elem.addEventListener('mouseout',function(){elem.blur()},false);
            //keyboard and mouse
		canvas.buffer=[];canvas.state=[];canvas.mouse=[];
		var rect = elem.getBoundingClientRect(),root = document.documentElement;
            //change elem to window if you don't want to require focus
		elem.addEventListener('keyup',function(){canvas.state[event.keyCode]=false;},false);
		elem.addEventListener('keydown',function(){
			//if(!canvas.state[event.keyCode])canvas.buffer.push(event.keyCode);//buffer code
			canvas.state[event.keyCode]=true;
		},false);
		elem.addEventListener('mousemove',function(evt){
			canvas.mouse[0]=evt.clientX - rect.top - root.scrollTop;
			canvas.mouse[1]=evt.clientY - rect.left - root.scrollLeft;
		},false);
		elem.addEventListener('mousedown',function(){canvas.mouse[2]=true;},false);
		elem.addEventListener('mouseup',function(){canvas.mouse[2]=false;},false);
            //does not include click buffer
	//drawing
		canvas.clear=function(){canvas.clearRect(0,0,WIDTH,HEIGHT);};
		canvas.putImage=function(img,x,y,radians){
			if(radians){
				canvas.save();
				canvas.translate(x,y);
				canvas.rotate(radians);
				canvas.drawImage(img,-.5*img.width,-.5*img.height);
				canvas.restore();
			}else{canvas.drawImage(img,-.5*img.width,-.5*img.height);}
		};
	return canvas;}(elem.getContext("2d")));}(document.getElementById(/**/"time.js"/**/)));
	
        //you can safely remove all this mucking about with the array prototype
	Array.prototype.max=function(){
		for(var i=1,max=this[0];i<this.length;i++)
			if(this[i]>max)max=this[i];
		return max;
	};
	Array.prototype.min=function(){
		for(var i=1,min=this[0];i<this.length;i++)
			if(this[i]<min)min=this[i];
		return min;
	};
	Array.prototype.normalize=function(){
		for(var i=0,result=[],length=this.vectorLength();i<this.length;i++)
			result[i]=this[i]/length;
		return result;
	};
	Array.prototype.vectorLength=function(){
		for(var i=0,total=0;i<this.length;i++)
			total+=this[i]*this[i];
		return Math.sqrt(total);
	};
	Array.prototype.add=function(b){
		for(var i=0,result=[];i<this.length;i++)
			result[i]=this[i]+b[i];
		return result;
	};
	Array.prototype.sub=function(b){
		for(var i=0,result=[];i<this.length;i++)
			result[i]=this[i]-b[i];
		return result;
	};
	Array.prototype.dot=function(b){
		for(var i=0,result=0;i<this.length;i++)
			result+=this[i]*b[i];
		return result;
	};
	Array.prototype.project=function(b){
		for(var i=0,result=[],b_Norm=b.normalize(),dot=b.dot(b_Norm);i<b.length;i++)
			result[i]=b_Norm[i]*dot;
		return result;
	};
	
	var Math=(function(Math){Math.prototype=window.Math;Math=new Math;
		Math.TAU=Math.PI*2;
        Math.toRads=function(degrees){return degrees/360*Math.TAU};
        Math.toDegrees=function(rads){return rads/Math.TAU*360};
		Math.isPointInRect=function(x,y,r){//r=[x,y,w,h,a]   (x,y)=center
			var dy=y-r[1],dx=x-r[0],dist= Math.sqrt(dx*dx+dy*dy),a=Math.atan2(dy,dx)-r[4];
			return (Math.abs(dist*Math.cos(a))<r[2]/2)&&(Math.abs(dist*Math.sin(a))<r[3]/2);
		};
		Math.rectToPoints=function(a){//[tl,tr,br,bl]
			var x=a[0],y=a[1],widthCos=.5*a[2]*Math.cos(a[4]),heightSin=.5*a[3]*Math.sin(a[4]);
			return [[x-widthCos,y+heightSin],[x+widthCos,y+heightSin],[x+widthCos,y-heightSin],[x-widthCos,y-heightSin]];
		};
            //I can't vouch for this next function (i remember it working at one point...)
		Math.isRectInRect=function(a,b){//a=[x,y,width,height,a]  (x,y)=center
			a=Math.rectToPoints(a),b=Math.rectToPoints(b);
			var axis1=a[0].sub(a[1]);
		//check axis1
			for(var i=0,a_Axis1=[];i<a.length;i++)
				a_Axis1[i].project(axis1);
			for(var i=0,b_Axis1=[];i<b.length;i++)
				b_Axis1[i].project(axis1);
			if(!(a_Axis1.max()<b_Axis1.min()||a_Axis1.min()>b_Axis1.max()))
				return false;
		//check axis 2
			var axis2=a[1].sub(a[2]);
			for(var i=0,a_Axis2=[];i<a.length;i++)
				a_Axis2[i].project(axis2);
			for(var i=0,b_Axis2=[];i<b.length;i++)
				b_Axis2[i].project(axis2);
			if(!(a_Axis2.max()<b_Axis2.min()||a_Axis2.min()>b_Axis2.max()))
				return false;
				
			return true;
		};
	return Math;}(function(){}));

//xml util (I have the other functions needed to load xml files if you want them
	Element.prototype.getElementText=function(title){return this.getElementsByTagName(title)[0].textContent;}
	Element.prototype.getNum=function(title){return Number(this.getElementText(title));}
	Element.prototype.getList=function(title){return this.getElementText(title).split(" ");}
	Element.prototype.getNumList=function(title){return this.getList(title).map(Number);}
	
//where you actual game goes
	loop();
	
	function loop(){
		setTimeout(loop,FRAME);
	}
}());
