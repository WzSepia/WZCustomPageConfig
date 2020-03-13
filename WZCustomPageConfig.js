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
		//记录容器大小
		box: {
			width: null,
			height: null
		},
		//文本元素集合
		text: {},
		//图片元素集合
		imgs: {},
		//区域图形元素
		rect: {}
	},
	/**
	 * 自定义图形初始化
	 * @describing init
	 * @param el,opts
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	init: function(el, options, w, h) {
		let that = this;
		this.e = document.getElementById(el);
		this.opts = options;
		//如果元素存在
		if (this.e) {
			this.e.style.width = (w ? w : options.box.width) + "px";
			this.e.style.height = (h ? h : options.box.height) + "px";
			this.zr = zrender.init(this.e);
			this.oncontextmenu(this.e);
			$("#" + el).resize(function(e) {
				let _x = Number(e.target.offsetWidth / options.box.width).toFixed(2);
				let _y = Number(e.target.offsetHeight / options.box.height).toFixed(2);
				let layer = $("#" + el + ">div>canvas");
				$("#" + el).css({
					transformOrigin: "left top",
					transform: "scale(" + _x + "," + _y + ") translate(-50%, -50%)"
				});
			});
		}
		//如果数据存在
		if (options) this.customPageRender(options);
	},
	/**
	 * 添加图形区域
	 * @describing addRect
	 * @param name
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	addRect: function(rect) {
		//判断如果为空则返回
		if (!rect) return;
		//打开元素配置面板
		this.configBox("rect", rect, true);
	},
	/**
	 * 添加文本
	 * @describing addText
	 * @param name
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	addText: function(text) {
		//判断如果为空则返回
		if (!text) return;
		//打开元素配置面板
		this.configBox("text", text, true);
	},

	/**
	 * 添加图片
	 * @describing addImg
	 * @param name
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	addImg: function(img) {
		//判断如果为空则返回
		if (!img) return;
		//打开元素配置面板
		this.configBox("img", img, true);
	},
	/**
	 * 添加背景图片
	 * @describing addBgpic
	 * @param name
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	addBgpic: function(name, src) {
		$(this.zr.dom).css({
			backgroundImage: "url(" + src + ")",
			backgroundSize: "100% 100%",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "0 0"
		})
	},
	/**
	 * 删除背景图片
	 * @describing delBgpic
	 * @param dom
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	delBgpic: function(dom) {
		$(this.zr.dom).css({
			backgroundImage: "url()",
		})
	},
	/**
	 * 右键操作
	 * @describing rightKeyConfig
	 * @param el
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	rightKeyConfig: function(el) {
		//null
	},
	/**
	 * 计算画布大小配置
	 * @describing conNum
	 * @param num1, num
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	conNum: function(num1, num2) {
		if (typeof(num1) == "number" && typeof(num2) == "number") {
			if (num1 > 0 && num2 > 0) {
				return true;
			} else {
				alert("宽高请输入大于0的有效数值！");
			}
		} else {
			console.log("请输入数字!", typeof(num1), typeof(num2));
			return false;
		}
	},
	/**
	 * 确认配置后的数据opts
	 * @describing drawOpts
	 * @param txt, img, drag
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	drawOpts: function(txt, img, drag) {
		let opts = {};
		//文字颜色
		let fontColor = $("#font_color").val();
		//文字大小
		let fontSize = $("#font_size").val();
		//文字粗细
		let fontWeight = $("#font_weight").val();
		//背景起始色
		let bgColors = $("#bg_color_s").val();
		//背景过度色
		let bgColorm = $("#bg_color_m").val();
		//背景终止色
		let bgColore = $("#bg_color_e").val();
		//边框颜色
		let borderColor = $("#border_color").val();
		//元素宽度
		let elSizew = Number($("#el_size_w").val());
		//元素高度
		let elSizeh = Number($("#el_size_h").val());
		//元素横轴位置
		let x = Number($("#x").val());
		//元素纵轴位置
		let y = Number($("#y").val());
		//图形层级
		let zlevel = Number($("#zlevel").val());

		let rectColor = new zrender.LinearGradient(0, 0, 1, 0, [{
			offset: 0,
			color: bgColors ? bgColors : "#000"
		}, {
			offset: 0.5,
			color: bgColorm ? bgColorm : "#000"
		}, {
			offset: 1,
			color: bgColore ? bgColore : "#000"
		}], false);

		opts = {
			draggable: drag ? drag : false,
			style: {
				x: x ? x : 0,
				y: y ? y : 0,
				width: elSizew ? elSizew : 30,
				height: elSizeh ? elSizeh : 30,
				image: img ? img : null,
				text: txt ? txt : null,
				fontSize: fontSize ? fontSize : "18",
				textFill: fontColor ? fontColor : "#000000",
				fill: rectColor,
				stroke: borderColor ? borderColor : 'transparent'
			},
			shape: {
				r: null,
				x: x ? x : 0,
				y: y ? y : 0,
				width: elSizew ? elSizew : 30,
				height: elSizeh ? elSizeh : 30,
			},
			position: [x ? x : 0, y ? y : 0],
			zlevel: zlevel ? zlevel : null
		}
		return opts;
	},
	/**
	 * 配置窗口的显示隐藏
	 * @describing configBox
	 * @param mold, val, state
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	configBox: function(mold, val, state) {
		if (state) {
			$(".custompage_box input").val("");
			$(".active").hide();
			$(".config").show();
		} else {
			$(".custompage_box input").val("");
			$(".config").hide();
			$(".active").show();
			return;
		}
		var that = this;
		$(".config_sure").off("click").on("click", function() {
			switch (mold) {
				case "text":
					//数据存储
					that.custom_page_data.text[val] = that.drawOpts(val, null, false);
					//绘图
					that.eles[val] = new zrender.Text(
						that.drawOpts(val, null, true)
					);
					that.eles[val].on("mouseup", function(e) {
						that.elMouseup(e, "text", val);
					});
					that.zr.add(that.eles[val]);
					$(".config").hide();
					$(".active").show();
					break;
				case "img":
					//数据存储
					that.custom_page_data.imgs[val] = that.drawOpts(null, val, false);
					that.eles[val] = new zrender.Image(
						that.drawOpts(null, val, true)
					);
					that.eles[val].on("mouseup", function(e) {
						that.elMouseup(e, "imgs", val);
					});
					that.zr.add(that.eles[val]);
					$(".config").hide();
					$(".active").show();
					break;
				case "rect":
					//数据存储
					that.custom_page_data.rect[val] = that.drawOpts(null, null, false);
					//绘图
					that.eles[val] = new zrender.Rect(
						that.drawOpts(null, null, true)
					);
					that.eles[val].on("mouseup", function(e) {
						that.elMouseup(e, "rect", val);
					});
					that.zr.add(that.eles[val]);
					$(".config").hide();
					$(".active").show();
					break;
				default:
					break;
			}
		})
	},

	/**
	 * 阻止页面默认事件
	 * @describing oncontextmenu
	 * @param el
	 * @author wangze
	 * @updatetime 2020-03-12
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
	 * 移动元素的数据存储
	 * @describing elMouseup
	 * @param el,child,val
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	elMouseup: function(el, child, val) {
		this.custom_page_data[child][val].position = el.target.position;
		return el.target.position;
	},
	/**
	 * 根据配置画图
	 * @describing customPageRender
	 * @param opts
	 * @author wangze
	 * @updatetime 2020-03-12
		* opts:{
			 box:{},
			 text:{
					text1:{
						//图形配置
						opt:{
							style:{},
							shape:{}
							...
						}
					}
				},
				imgs:{},
				rect:{}
		}
	 */
	customPageRender: function(opts) {
		//元素个数（totle）
		let texts = opts.text;
		let imgs = opts.imgs;
		let rects = opts.rect;
		//元素类型（文字）
		if (texts) {
			for (i in texts) {
				this.customPageRenderText(texts[i]);
			}
		}
		//元素类型（图片)
		if (imgs) {
			for (i in imgs) {
				this.customPageRenderImg(imgs[i]);
			}
		}
		//元素类型（区域图形)
		if (rects) {
			for (i in rects) {
				this.customPageRenderRect(rects[i]);
			}
		}
	},

	/**
	 * 根据数据绘制文本
	 * @describing customPageRenderText
	 * @param opt
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	customPageRenderText: function(opt) {
		//绘图
		let text = new zrender.Text(opt);
		text.on("mousedown", function(e) {
			console.log("您点击了元素。");
		});
		this.zr.add(text);
	},

	/**
	 * 根据数据绘制图片
	 * @describing customPageRenderImg
	 * @param opt
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	customPageRenderImg: function(opt) {
		//绘图
		let img = new zrender.Image(opt);
		img.on("mousedown", function(e) {
			console.log("您点击了元素。");
		});
		this.zr.add(img);
	},

	/**
	 * 根据数据绘制区域图形
	 * @describing customPageRenderRect
	 * @param opt
	 * @author wangze
	 * @updatetime 2020-03-12
	 */
	customPageRenderRect: function(opt) {
		//绘图
		let rect = new zrender.Rect(opt);
		rect.on("mousedown", function(e) {
			console.log("您点击了元素。");
		});
		this.zr.add(rect);
	}
};

/**
 * 初始化面板操作
 * @describing webzCustom
 * @param el, opts
 * @author wangze
 * @updatetime 2020-03-12
 */
function webzCustom(el, opts) {
	//生成画布，开始绘画
	if (el && opts && opts.box.width && opts.box.height) {
		pageCustom.init(el, opts);
	}
	//配置页面，生成画布
	$(".set_active_area").on("click", function() {
		let w = Number($(".set_active_area_w").val());
		let h = Number($(".set_active_area_h").val());
		if (pageCustom.conNum(w, h)) {
			//初始化画布
			pageCustom.init(el, opts, w, h);
		}
	});
	//添加文本
	$(".btn_addText").on("click", function() {
		let str = $(".active_text").val();
		pageCustom.addText(str);
	})
	//添加图片
	$(".btn_addImg").on("click", function() {
		let str = $(".active_img").val();
		pageCustom.addImg(str);
	})
	//添加背景图
	// $(".btn_addBgpic").on("click", function() {
	// 	let str = $(".active_bgimg").val();
	// 	pageCustom.addBgpic("demo1", str);
	// });
	//删除背景图
	// $(".btn_delBgpic").on("click", function() {
	// 	pageCustom.delBgpic("demo1");
	// });
	//添加图形区域
	$(".btn_addRect").on("click", function() {
		let str = $(".active_rect").val();
		if (!str){
			alert("请输入唯一代码！");
			return;
		};
		pageCustom.addRect(str);
	})
}
