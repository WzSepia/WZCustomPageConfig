! function() {
	var pageCustom = {

	};
	var zr = zrender.init(document.getElementById('demo1'));
	var circle = new zrender.Circle({
		shape: {
			cx: 50,
			cy: 50,
			r: 30
		},
		style: {
			fill: 'transparent',
			stroke: '#F00'
		}
	});
	circle.on("click", function() {
		console.log("circle点击事件")
	});
	zr.add(circle);
	var circle1 = new zrender.Circle({
		shape: {
			cx: 210,
			cy: 50,
			r: 40
		},
		style: {
			fill: 'none',
			stroke: '#F00'
		}
	});
	zr.add(circle1);
	
	var rect = new zrender.Rect({
		shape: {
			x: 0,
			y: 100,
			width: 100,
			height: 100
		},
		style: {
			stroke: '#ffc8aa'
		},
		position: [10, 10]

	});
	rect.on('click', function() {
		console.log('单击了这个矩形');
	});
	zr.add(rect);
}()
