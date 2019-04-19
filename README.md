# foldScroll  
foldScroll 是一款Y轴折叠滚屏插件，后扩展为同时支持Y轴和X轴的滚屏插件，同时兼容手机和pc端，另外支持圆点导航和X轴滚屏模式下的左右翻屏按钮。  
X轴滚动demo地址--https://tls1234.github.io/foldScroll/scrollX  (支持手机端滑动和Pc端点击翻页及导航按钮)  
Y轴滚动demo地址--https://tls1234.github.io/foldScroll/scrollY  (支持手机端滑动和Pc端鼠标滚轮及导航按钮)  
# html 结构  
！！ 必须设定每项 z-index的值  
```js
<ul class="wrapper">
   <li class="div1" style="background:#FF8C00;z-index:50"></li>
   <li class="div2" style="background:#FF6347;z-index:40"></li>
   <li class="div3" style="background:#FFA07A;z-index:30"></li>
   <li class="div4" style="background:#F08080;z-index:20"></li>
   <li class="div5" style="background:#CD5C5C;z-index:10"></li>
</ul>
<ul class="nav">
   <li class="li1"></li>
   <li class="li2"></li>
   <li class="li3"></li>
   <li class="li4"></li>
   <li class="li5"></li>
</ul>
<p class="less-btn"></p>
<p class="add-btn"></p>
```
## 用法  
只需要new一个FScroll()对象
> new FScroll({}) 

然后传入一个Object对象，里边包含一些配置参数
## 参数 
第一个参数 scrollY 和 scrollX ,二者只能一个为true, scrollY 表示竖屏滚动，scrollX 表示横屏滚动。   

第二个参数 transition, 滚屏过渡动画，第一个为过渡时间， 第二个为过度曲线， 不传入则默认为 '.7s ease' 。   

第三个参数, 在els对象中传入一个dom数组对象，其中第一个参数表示滚动的父容器，后边依次传入子元素，可以为CSS选择器(字符串)或者dom节点。  

第四个参数，nav对象，是否开启导航圆点，如果不开启则省略此参数      
　　　　dom 导航圆点dom节点 ，可以为css选择器(字符串)或者dom节点    
　　　　navColor 导航圆点颜色    
　　　　selectNavColor 导航圆点被选中后的颜色    
      
第五个参数为翻页按钮，，如不开启则省略此参数    
　　　　dom 传入翻页按钮dom节点，同样可以为css选择器或者dom节点  
```js
var scroll = new FScroll(
		{
			scrollY: true,　　　　　　　／／竖屏滚动，为false则可以省略此参数
			scrollX: false,　　　　　　／／横屏滚动，为false则可以省略此参数
			transition: '.7s ease',　／／滚屏过渡效果　（可以省略，默认启用内置过度效果）
			els: {　　　　　　　　　　　／／滚动相关元素节点
				dom: [
				".wrapper",　　　／／滚动的父容器
				".div1",　　　　　／／子节点
				".div2",
				".div3",
				".div4",
				".div5"
				]
			},
			nav: {　　　　　　　　　　　／／导航圆点 ，如果不需要导航则省略此参数
				dom: [　　　　　　／／导航圆点元素
				".li1",　　　
				".li2",
				".li3",
				".li4",
				".li5"
				],
				navColor: '',　　／／导航圆点颜色 
				selectNavColor: '#e6e6e6'　　／／导航圆点被选中后的颜色 
			},
			countBtn: {　　　　　　　　／／翻页按钮 ，如果不需要翻页按钮则省略此参数
				dom: ['.less-btn', '.add-btn']　　／／翻页按钮dom节点
			}
		})
```

# Future  
1. 支持横屏轮播  
2. 优化传入的参数  
