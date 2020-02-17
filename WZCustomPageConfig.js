! function() {
	var pageCustom = function() {
		
	};
	var page = {
		
	};
	var data = {

	};
	var render = {

	};
	var methods = {

	}
	var zr = zrender.init(document.getElementById('demo1'));
	var circle = new zrender.Circle({
	    shape: {
	        cx: 150,
	        cy: 50,
	        r: 40
	    },
	    style: {
	        fill: 'none',
	        stroke: '#F00'
	    }
	});
	zr.add(circle);
	console.log(123)
}()
