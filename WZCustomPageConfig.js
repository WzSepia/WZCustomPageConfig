/*
	自定义表格==画布版(canvas)
	依赖：zrender
	作者：wangze
	版本：pageCustom -V 1.0
*/

//自定义表格方法集：pageCustom
var pageCustom = {
	/**
	 * 图形元素集合
	 * */
	eles: {},
	/**
	 * 自定义图形初始化
	 * @describing init
	 * @param el,opts
	 * @author wangze
	 * @version v1.0
	 * @updatetime 2020-02-26
	 */
	init: function(el, options) {
		this.e = document.getElementById(el);
		this.opts = options;
		var defaultOpt = this.getDefaultOptions();
		for (var key in defaultOpt) {
			if (!this.opts[key]) {
				this.opts[key] = defaultOpt[key];
			}
			if (this.e) this.zr = zrender.init(this.e);
		}
		console.log(this.zr);
	},
	/**
	 * 添加图形
	 * @describing init
	 * @param el,opts
	 * @author wangze
	 * @version v1.0
	 * @updatetime 2020-02-26
	 */
	addRect: function(name) {
		this.eles[name] = new zrender.Rect({
			draggable: true,
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
		this.eles[name].on('click', function() {
			console.log('单击了这个矩形');
		});
		this.zr.add(this.eles[name]);
	},
	/**
	 * 添加文本
	 * @describing addText
	 * @param name
	 * @author wangze
	 * @version v1.0
	 * @updatetime 2020-02-26
	 */
	addText: function(name, text) {
		if (!name) return;
		this.eles[name] = new zrender.Text({
			draggable: true,
			style: {
				text: text ? text : ""
			}
		});
		this.zr.add(this.eles[name]);
		console.log(this.eles[name]);
	},
	/**
	 * 添加图片
	 * @describing addImg
	 * @param name
	 * @author wangze
	 * @version v1.0
	 * @updatetime 2020-02-26
	 */
	addImg: function(name) {
		this.eles[name] = new zrender.Image({
			draggable: true,
			style: {
				image: "",
				x: 10,
				y: 10,
				width: 100,
				height: 100
			}
		})
		this.zr.add(this.eles[name]);
	},
	addBgpic: function() {

	},
	/**
	 * 右键操作
	 * @describing init
	 * @param el,opts
	 * @author wangze
	 * @version v1.0
	 * @updatetime 2020-02-26
	 */
	rightKeyConfig: function(name) {

	},
	/**
	 * 确认右键弹出框的配置
	 * @describing init
	 * @param el,opts
	 * @author wangze
	 * @version v1.0
	 * @updatetime 2020-02-26
	 */
	getDefaultOptions: function() {
		return {
			itemWidth: 200,
			itemHeight: 40,
			textHeight: 30,
			textWidth: 160,
			padding: 10,
			colors: ["#99CC00", "#FF99CC", "#66CC99", "#CCCC00", "#CCFF66", "#66CCCC"]
		}
	},
};
