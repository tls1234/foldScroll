# foldScroll  
foldScroll 是一款折叠滚动插件，可以用于Y轴和X轴的折叠滚屏，同时兼容手机和pc端，另外支持圆点导航和X轴滚屏模式下的左右翻屏按钮。  
## 用法  
只需要new一个FScroll()对象
> new FScroll({}) 

然后传入一个Object对象，里边包含一些配置参数
## 参数 
第一个参数 scrollY 和 scrollX ,二者只能选一个, scrollY 表示竖屏滚动，scrollX 表示横屏滚动。
> var scroll = new FScroll(  
	 {  
		scrollY: true,  
		scrollX: false    //**二者不能同时存在**  
   }  
  )  

第二个参数 transition, 滚屏过渡动画，第一个为过渡时间， 第二个为过度曲线， 不传入则默认为 '.7s ease' 。
> var scroll = new FScroll(  
	 {  
		scrollY: true,  
		scrollX: false    //**二者不能同时存在**  
    transition: '.7s ease'  
   }  
  )  

第三个参数, 在els对象中传入一个dom数组对象，其中第一个参数表示滚动的父容器，后边依次传入子元素，可以为CSS选择器(字符串)或者dom节点。
> var scroll = new FScroll({    
		scrollY: true,  
		scrollX: false,    //**二者不能同时存在**  
    transition: '.7s ease',  
    els: {  
        dom: [ul, li, li, li, ....]  
			  }  
})  

第四个参数，nav对象，是否开启导航圆点，默认为不开启，如果不开启请不要填写nav对象。  
open 开启导航圆点  
dom 导航圆点dom节点 ，可以为css选择器(字符串)或者dom节点  
navColor 导航圆点颜色  
selectNavColor 导航圆点被选中后的颜色  
> var scroll = new FScroll({    
		scrollY: true,  
		scrollX: false,    //**二者不能同时存在**  
    transition: '.7s ease',  
    els: {  
        dom: [ul, li, li, li, ....]  
			  },  
    nav: {  
	    open: false,  
	    dom: [
	    ".li1",
	    ".li2",
	    ".li3",
	    ".li4",
	    ".li5"
	    ],  
	    navColor: '#fff',   
	    selectNavColor: '#000'   
}  
}）  

第五个参数为翻页按钮，默认为不开启，如不开启请不要填写此项  
open 是否开启  
dom 传入翻页按钮dom节点，同样可以为css选择器或者dom节点  
> var scroll = new FScroll({  
    scrollY: true,  
    scrollX: false,    //**二者不能同时存在**  
    transition: '.7s ease',  
    els: {  
        dom: [ul, li, li, li, ....]  
			  },  
    nav: {  
	    open: false,  
	    dom: [
	    ".li1",
	    ".li2",
	    ".li3",
	    ".li4",
	    ".li5"
	    ],  
	    navColor: '#fff',   
	    selectNavColor: '#000'   
},  
	  countBtn: {  
		  open: false,  
			dom: ['.less', '.add']  
		}  
}）    
