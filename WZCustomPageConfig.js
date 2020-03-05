/*
	自定义表格==画布版(canvas)
	依赖：zrender
	作者：wangze
	版本：pageCustom -V 1.0
	
	禁止鼠标右键：oncontextmenu="return false"；
	禁止选择：onselectstart="return false"；
	禁止拖放：ondragstart="return false"；
	禁止拷贝：oncopy=document.selection.empty() 。
	禁止复制：oncopy = "return false"；
	禁止保存：<noscript><iframe src="*.htm"></iframe></noscript>，放在head里面。
	禁止粘贴：<input type=text onpaste="return false">
	禁止剪贴：oncut = "return false"；
	关闭输入法：<input style="ime-mode:disabled">
*/

//自定义表格方法集：pageCustom
var pageCustom = {
	/**
	 * 图形元素集合
	 * */
	eles: {},
	//配置保存的数据集合
	custom_page_data: {
		text: {}, //文本元素集合
		imgs: {}, //图片元素集合
		rect: {} //区域图形元素
	},
	/**
	 * 自定义图形初始化
	 * @describing init
	 * @param el,opts
	 * @author wangze
	 * @updatetime 2020-02-26
	 */
	init: function(el, options, w, h) {
		this.e = document.getElementById(el);
		this.opts = options;
		var defaultOpt = this.getDefaultOptions();
		for (var key in defaultOpt) {
			if (!this.opts[key]) {
				this.opts[key] = defaultOpt[key];
			}
			if (this.e) {
				this.e.style.width = w + "px";
				this.e.style.height = h + "px";
				this.zr = zrender.init(this.e);
				this.oncontextmenu(this.e);
			}
		}
		if (options && options.length > 0) this.customPageRender(options);
	},
	/**
	 * 添加图形区域
	 * @describing addRect
	 * @param name
	 * @author wangze
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
		this.eles[name].on('click', function(e) {
			console.log('单击了这个矩形', e);
		});
		this.zr.add(this.eles[name]);
	},
	/**
	 * 添加文本
	 * @describing addText
	 * @param name
	 * @author wangze
	 * @updatetime 2020-02-26
	 */
	addText: function(name, text) {
		if (!name) return;
		this.eles[name] = new zrender.Text({
			draggable: true,
			style: {
				text: text ? text : ""
			},
			position: [100, 100]
		});
		this.eles[name].on("click", function(e) {
			console.log("e", e);
		});
		this.zr.add(this.eles[name]);
		console.log(this.eles[name]);
	},
	/**
	 * 添加图片
	 * @describing addImg
	 * @param name
	 * @author wangze
	 * @updatetime 2020-02-26
	 */
	addImg: function(name) {
		this.eles[name] = new zrender.Image({
			draggable: true,
			style: {
				image: name ? name : "",
				x: 10,
				y: 10,
				width: 100,
				height: 100
			}
		})
		this.zr.add(this.eles[name]);
	},
	/**
	 * 添加背景图片
	 * @describing addBgpic
	 * @param name
	 * @author wangze
	 * @updatetime 2020-02-26
	 */
	addBgpic: function(name, src) {
		console.log(this.zr.dom)
		$(this.zr.dom).css({
			backgroundImage: "url(" + src + ")",
			backgroundSize: "100% 100%",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "0 0"
		})
	},
	/**
	 * 删除背景图片
	 * @describing addImg
	 * @param name
	 * @author wangze
	 * @updatetime 2020-02-26
	 */
	delBgpic: function(name, src) {
		$(this.zr.dom).css({
			backgroundImage: "url()",
		})
	},
	/**
	 * 右键操作
	 * @describing rightKeyConfig
	 * @param el
	 * @author wangze
	 * @updatetime 2020-03-05
	 */
	rightKeyConfig: function(el) {

	},
	/**
	 * 获取默认配置
	 * @describing init
	 * @param el,opts
	 * @author wangze
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
	/**
	 * 计算画布大小配置
	 * @describing conNum
	 * @param num1, num
	 * @author wangze
	 * @updatetime 2020-02-26
	 */
	conNum: function(num1, num2) {
		if (typeof(num1) == "number" && typeof(num2) == "number") {
			console.log(num1, num2)
			if (num1 > 0 && num2 > 0) {
				return true;
			} else {
				alert("宽高请输入大于0的有效值！");
			}
		} else {
			console.log("请输入数字!", typeof(num1), typeof(num2));
			return false;
		}
	},
	/**
	 * 阻止页面右键事件
	 */
	oncontextmenu: function(el) {
		// 阻止页面右键
		// window.oncontextmenu = function() {
		// 	return false;
		// };
		// 阻止元素右键
		el.oncontextmenu = function(e) {
			//左键--button属性=1，右键button属性=2
			if (e.button == 2) {
				e.preventDefault();
			}
		}
	},
	/**
	 * 根据配置画图
	 * @describing customPageRender:function(opts){
	 * @param opts
	 * @author wangze
	 * @updatetime 2020-02-26
		* opts:{
			 text:{
					text1:{
						//图形id
						id:1,
						//图形配置
						opt:{
							style:{},
							shape:{}
						}
					}
				},
				imgs:{},
				rect:{}
		}
	 */
	customPageRender: function(opts) {
		//元素个数（totle）

		//元素类型（文字，图片，区域图形）

		//

	}
};
