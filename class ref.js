function Player(name) {
	var name=name;
	var x=0;
	var y=0;
	var moveTo=function(nx,ny){
		x=nx;
		y=ny;
	};
	var pos=function(){
		return [x,y];
	};
	var call=function(){
		alert(asdf);
	};
    return {name:name,moveTo:moveTo,pos:pos};//publics
}

var p1=Player("timbo");//don't use "new"
p1.moveTo(628,628);
var p2=Player("tai");
p2.moveTo(129,129);
alert(p1.pos());
alert(p2.pos());