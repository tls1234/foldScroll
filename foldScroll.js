function FScroll(options) {
	this.defaultOptions = {
		scrollX: false,
		scrollY: false,
		transition: '.7s ease',
		nav: {
			open: false,
			dom: [],
			navColor: '#fff',
			selectNavColor: '#000'
		},
		countBtn: {
			open: false,
			dom: []
		}
	}
	this._init(options);
}

FScroll.prototype._init = function(options) {
	//合并参数
	this._mergeOptions(options);
	//查找dom并缓存
	var els = this.defaultOptions.els.dom;
	this.elsDom = this._dom(els);
	this.parentNode = this.elsDom[0];
	this.childNodes = this.elsDom.slice(1);
	var navEls = this.defaultOptions.nav.dom;
	this.navElsDom = this._dom(navEls);
	this.nav = this.defaultOptions.nav;
	this.scrollStyle = window.getComputedStyle(this.elsDom[1], null);

	this._index();
	this._openNav();
	this._openCountBtn();
	//设置鼠标滚轮事件
	this.mouseWheelEvent();
}
FScroll.prototype._index = function(){
	this.index = {};
	var that = this;
	var curIndex;
	Object.defineProperty(this.index, 'curIndex', {
		get: function() {
			return curIndex;
		},
		set: function(val) {
			that.navBtnActive(val);
			curIndex = val;
		},
		enumerable : true,
		configurable : true
	})
	this.index.curIndex = 0;
}
FScroll.prototype._openNav = function() {
	if(this.defaultOptions.nav.open == false){
		return;
	} else{
		this.navEvent();
	}
}
FScroll.prototype._openCountBtn = function() {
	if(this.defaultOptions.countBtn.open == false || this.defaultOptions.scrollY){
		return;
	} else {
		var that = this;
		var childNodes = this.childNodes;
		var childNodesLength = childNodes.length;
		var countEls = this._dom(this.defaultOptions.countBtn.dom);
		this.addEvent(countEls[0], 'click', function(e) {
			e.preventDefault();
			that.scrollRight();
		})
		this.addEvent(countEls[1], 'click', function(e) {
			e.preventDefault();
			that.scrollLeft();
		})
	}
}
FScroll.prototype.navBtnActive = function(val) {
	if(this.defaultOptions.nav.open == false){
		return;
	} else{
		var that = this;
		this.navElsDom.forEach(function(item){
		item.style.background = that.nav.navColor;
	})
		this.navElsDom[val].style.background = that.nav.selectNavColor;
	}
}
FScroll.prototype.navEvent = function() {
	var that = this;
	this.navElsDom.forEach(function(item){
		that.addEvent(item, 'click', function(e) {
			e.preventDefault();
			var preIndex = that.index.curIndex;
			var curIndex = that.navElsDom.indexOf(e.target);
			e.target.style.background = that.nav.selectNavColor;
			if(that.defaultOptions.scrollX == true) {
				if(preIndex < curIndex){
					for(var i = preIndex; i < curIndex; i++) {
						that.scrollLeft();
					}
				} else {
					for(var i = preIndex; i > curIndex; i--) {
						that.scrollRight();
					}
				}
			} else if(that.defaultOptions.scrollY == true){
				if(preIndex < curIndex){
					for(var i = preIndex; i < curIndex; i++) {
						that.scrollUp();
					}
				} else {
					for(var i = preIndex; i > curIndex; i--) {
						that.scrollDown();
					}
				}
			}
		})
	})
}

FScroll.prototype.mouseWheelEvent = function () {
	var options = this.defaultOptions;
	//判断是否是手机	
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		this.mobile(options);
	} else {
		this.pc(options);
	}
}
FScroll.prototype.pc = function (options) {
	//mouseWheel事件
	//DOMMouseScroll为了兼容firefox的mousewheel事件
	var FScroll = this;
	this.addEvent(this.parentNode, 'mousewheel', this.throttle(function (e) {
		var e = e || window.event;

		e.preventDefault();
		var deltaY = e.deltaY ? e.deltaY : e.detail;
		if(options.scrollY == true && options.scrollX == false) {
			if(deltaY > 0) {
				FScroll.scrollUp();
			} 
			else {
				FScroll.scrollDown();
			}	
		}
	}, 1500))
}
FScroll.prototype.throttle = function (scroll, time) {
	var timeout, startTime = Date.now();
	return function() {
		var context = this;
		var args = arguments[0];
		var curTime = Date.now();
		clearTimeout(timeout);
		    // 如果达到了规定的触发时间间隔，触发 handler
		    if(curTime - startTime >= time){
		    	scroll.call(context, args);
		    	// 没达到触发间隔，重新设定定时器
		    	startTime = curTime;
		    }
		}
}

FScroll.prototype.mobile = function (options) {
	var startX,startY,moveEndX,moveEndY,X,Y;
	var FScroll = this;
	this.addEvent(this.parentNode, 'touchstart', this.throttle(function(e) {
		var e = e || window.event;
		if (e.cancelable) {
        	// 判断默认行为是否已经被禁用
        	if (!e.defaultPrevented) {
        		e.preventDefault();
        	}
    	}
    	startX = e.touches[0].clientX;
    	startY = e.touches[0].clientY;
	}, 700))
	this.addEvent(this.parentNode, 'touchend', this.throttle(function(e) {
		var e = e || window.event;
		if (e.cancelable) {
        // 判断默认行为是否已经被禁用
        	if (!e.defaultPrevented) {
        		e.preventDefault();
        	}
    	}
   		moveEndX = e.changedTouches[0].clientX;
   		moveEndY = e.changedTouches[0].clientY;
   		X = moveEndX - startX;
   		Y = moveEndY - startY;
		// //判断touch方向
		if(options.scrollY == true && options.scrollX == false) {
			if(Y < 0 && Math.abs(Y) > Math.abs(X)){
				FScroll.scrollUp();
			} else if(Y > 0 && Math.abs(Y) > Math.abs(X)){
				FScroll.scrollDown();
			}
		} else if (options.scrollX == true && options.scrollY == false) {
			if(X < 0 && Math.abs(X) > Math.abs(Y)){
				FScroll.scrollLeft();
			} else if(X > 0 && Math.abs(X) > Math.abs(Y)){
				FScroll.scrollRight();
			}
		}
	}, 700))
}
FScroll.prototype.scrollUp = function () {
	var rectHeight = '-' + this.scrollStyle.getPropertyValue('height');
	var translate = 'translateY('+ rectHeight +')';
	this.positive(translate);
}
FScroll.prototype.scrollDown = function () {
	var translate = 'translateY(0)';
	this.negative(translate);
}
FScroll.prototype.scrollLeft = function () {
	var rectWidth = '-' + this.scrollStyle.getPropertyValue('width');
	var translate = 'translateX('+ rectWidth +')';
	this.positive(translate);
}
FScroll.prototype.scrollRight = function () {
	var translate = 'translateX(0)';
	this.negative(translate);
	}
FScroll.prototype.positive = function(translate) {
	var childNodes = this.childNodes;
	var childNodesLength = childNodes.length;
	var curIndex = this.index.curIndex;
	var transition = 'all' + this.defaultOptions.transition;
	if(curIndex === childNodesLength - 1){
		return;
	} else {
		childNodes[curIndex].style.webkitTransform = translate;
		childNodes[curIndex].style.MozTransform = translate;
		childNodes[curIndex].style.msTransform = translate;
		childNodes[curIndex].style.OTransform = translate;
		childNodes[curIndex].style.transform = translate;
		childNodes[curIndex].style.transition = transition;
		this.index.curIndex ++;
	}	
}
FScroll.prototype.negative = function(translate) {
	var childNodes = this.childNodes;
	var curIndex = this.index.curIndex;
	var transition = 'all' + this.defaultOptions.transition;
	if(curIndex === 0){
		return;
	} else{
		childNodes[curIndex - 1].style.webkitTransform = translate;
		childNodes[curIndex - 1].style.MozTransform = translate;
		childNodes[curIndex - 1].style.msTransform = translate;
		childNodes[curIndex - 1].style.OTransform = translate;
		childNodes[curIndex - 1].style.transform = translate;
		childNodes[curIndex - 1].style.transition = transition;
		this.index.curIndex --;
	}
}
FScroll.prototype.addEvent = function(el, eventType, fn) {
	if(getExploreName() == 'Firefox'){
		//兼容Firefox
		el.addEventListener('DOMMouseScroll', fn, false);
		return;
	} else if(window.addEventListener) {
		el.addEventListener(eventType, fn, false);
	} else if(el.attachEvent) {
		el.attachEvent('on'+eventType, fn)
	} else {
		el['on' + eventType] = fn;
	}
}
//wran 
function warn(msg) {
	console.error('[FScroll wran]:' + msg);
}
FScroll.prototype._dom = function (els) {
	var domArr = [];
	for(var i = 0; i < els.length; i++){
		if(typeof els[i] === 'string') {
			domArr[i] = document.querySelector(els[i]);
		} else {
			domArr[i] = els[i];
		}
	}
	return domArr;
}
FScroll.prototype._mergeOptions = function(options) {
	if(options == null){
		warn('Missing options');
	}
	for(var item in options) {
		this.defaultOptions[item] = options[item];
	}
}
function getExploreName(){
	var userAgent = navigator.userAgent;
	if(userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1){
		return 'Opera';
	}else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1){
		return 'IE';
	}else if(userAgent.indexOf("Edge") > -1){
		return 'Edge';
	}else if(userAgent.indexOf("Firefox") > -1){
		return 'Firefox';
	}else if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1){
		return 'Safari';
	}else if(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1){
		return 'Chrome';
	}else if(!!window.ActiveXObject || "ActiveXObject" in window){
		return 'IE>=11';
	}else{
		return 'Unkonwn';
	}
}
