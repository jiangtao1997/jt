//require 调用模块，接收二个参数。
//第1个参数是一个数组，表示所调用的模块  
//第2个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。

//调用模块可以调用多个。
//require(['m1','m2'],function(mod1,mod2){//mod1代表m1模块暴露的对象
//	//alert(mod1.num);
//	//alert(mod1.rannum(3,9));
//	//mod2.getcontent();
//});


require(['style','details','cart','registor']);
