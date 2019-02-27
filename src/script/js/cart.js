define(['config'],function(){//定义模块，依赖模块
	require(['jquery','jqcookie'],function($,cookie){
		
		$('.tou').load('header.html',function(){
			
			$('.gwc-span1').find('span').css({'color':'white','text-align':'center','line-height':'24px'})
			
			if($.cookie('cookienum')){
				var $sl = $.cookie('cookienum').split(',');
				function sum(arr) {
				    return eval($sl.join("+"));
				};
				
				$('.gwc-span1').find('span').html(sum());
			}else{
				$('.gwc-span1').find('span').html(0);
			}
		});
		
		//1.购物车列表渲染
		function ajaxcz(sid,num){//sid：商品的编号，num:商品的数量
    			$.ajax({
    				url:"http://10.31.162.17/diliuzhou/projectname/php/neirong/haitaodata.php",
    				dataType:'json'
    			}).done(function(data){
    				
    				$.each(data,function(index,value){
						
    					if(sid==value.sid){//比较当前传入的sid和数据里面的sid比较，相同获取当前的整条数据
    						
    						var clonegoodslist=$('.cart-box3:hidden').clone(true,true);//深度克隆被隐藏的商品列表。
    						clonegoodslist.find('.th1-a img').attr('src',value.imgli);
    						clonegoodslist.find('.th1-a img').attr('sid',value.sid);
    						clonegoodslist.find('#th2-title').html(value.title);
    						clonegoodslist.find('.th3 del').html(value.price2);
    						clonegoodslist.find('.th3 div').html(value.price1);
    						clonegoodslist.find('.th5').html(value.price1);
    						clonegoodslist.find('.jiajian-inp').val(num).css({"text-align": "center"});
    						clonegoodslist.css('display','block');
    						//计算单价
    						clonegoodslist.find('.th5').html((value.price1 * num).toFixed(2));
    						clonegoodslist.find('.th7').html(((value.price2 - value.price1) * num).toFixed(2));
							$('.cart-box3-kuang').append(clonegoodslist);
							priceall();
							kong();
    					}
    				});
    			});
    		}
    		
    		
    		
    		//如多为空  则 显示空
    		
			function kong(){
				if($.cookie('cooksid')){
					$('#kong').hide();//cookie存在，购物车有商品，隐藏盒子。
				}else{
					$('#kong').show();
				}
			}
    		
    		//购物车数量
    		if($.cookie('cookienum')){
				var $sl = $.cookie('cookienum').split(',');
				function sum(arr) {
				    return eval($sl.join("+"));
				};
				
				$('.gwc-span1').find('span').html(sum());
				$('.fudong-gwc').find('i').html(sum());
			}else{
				$('.gwc-span1').find('span').html(0);
				$('.fudong-gwc').find('i').html(0);
			}
    		
    		
    		
    		
    		
    		//2.得到存在的cookie  并传给ajax进行列表渲染
    		if($.cookie('cooksid') && $.cookie('cookienum')){
    			var sid=$.cookie('cooksid').split(',');//[2,1,3,4]
    			var num=$.cookie('cookienum').split(',');//[2,1,3,4]
    			$.each(sid,function(index,value){
    				ajaxcz(sid[index],num[index]);
    			});
    		}
    		
    	//3.按钮的全选
    		$('.quanxuan').on('change',function(){
    			$('.cart-box3:visible').find('input:checkbox').prop('checked',$(this).prop('checked'));
    			$('.quanxuan').prop('checked',$(this).prop('checked'));
    			priceall();
    		});
    		
    		var $input = $('.cart-box3:visible').find('input:checkbox');
    		$('.cart-box3-kuang').on('input',$input,function(){
    			if($('.cart-box3:visible').find('input:checkbox').size()==$('.cart-box3:visible').find('input:checked').length){
    				$('.quanxuan').prop('checked',true);
    			}else{
    				$('.quanxuan').prop('checked',false);
    			}
    			priceall();
    		});
    		
    		
    	//4.数量加减
    	
    	
    	$('.up').on('click',function(){
    		var $const=$(this).parents('#updown').find('input').val();
    		$const++;
    		if($const>10){
    			$const=10;
    			alert("最多购买10件");
    		}
    		$(this).parents('#updown').find('input').val($const);
    		$(this).parents('.cart-box3').find('.th5').html(singlegoodsprice($(this)));
    		$(this).parents('.cart-box3').find('.th7').html(singlegoodsprice($(this)));
    		setcookie($(this));
    		priceall();
    	});
    	
    	
    	$('.down').on('click',function(){
    		var $consts=$(this).parents('#updown').find('input').val();
    		$consts--;
    		if($consts<1){
    			$consts=1;
    			alert("最少购买1件");
    		}
    		$(this).parents('#updown').find('input').val($consts);
    		$(this).parents('.cart-box3').find('.th5').html(singlegoodsprice($(this)));
    		$(this).parents('.cart-box3').find('.th7').html(singlegoodsprice($(this)));
    		setcookie($(this));
    		priceall();
    	});
    	
    	//直接输入
    	
    	$('#updown input').on('input', function() {
		    var $reg = /^\d+$/g; //只能输入数字
		    var $value = parseInt($(this).val());
		    if ($reg.test($value)) {//是数字
		        if ($value >= 10) {//限定范围
		            $(this).val(10);
		        } else if ($value <= 1) {
		            $(this).val(1);
		        } else {
		            $(this).val($value);
		        }
		    } else {//不是数字
		        $(this).val(1);
		    }
		    setcookie($(this));
		    priceall();
		    $(this).parents('.cart-box3').find('.th5').html(singlegoodsprice($(this)));
		    $(this).parents('.cart-box3').find('.th7').html(singlegoodsprice($(this)));
		});
    	
    	//5.计算数量改变后单个商品的价格
    	
		function singlegoodsprice(obj) { //obj:当前元素
			var $dj = parseFloat(obj.parents('.cart-box3').find('.th3 .danjia').html());//单价
		    var $cnum = parseInt(obj.parents('.cart-box3').find('#updown input').val());//数量
		    return ($dj * $cnum).toFixed(2);//结果
		}
    	
    	//6.计算总价和总的商品件数，必须是选中的商品。
		function priceall(){
			var $sum=0;
			var $count=0;
			var $guoqu=0;
			$('.cart-box3:visible').each(function(index,element){
			  if($(element).find('.th1 input').prop('checked')){
			  	$sum+=parseInt($(element).find('#updown').find('input').val());
			  	$guoqu+=parseInt($(element).find('.th7').html());
				$count+=parseFloat($(element).find('.th5').html());
			  }
			  
			});
			$('#strongs em').html('￥'+$count.toFixed(2));
			$('#js em').html('￥'+$guoqu.toFixed(2));
			
		}
    	
    	
    	//删除
    	
    	
    	//删除cookie
		function delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
		    var $index = -1;
		    $.each(arrsid,function(index,value){//删除的sid对应的索引位置。 index:数组项的索引
		    	if(sid==value){
		    		$index=index;//如果传入的值和数组的值相同，返回值对应的索引。
		    	}
		    });
		    arrsid.splice($index, 1);//删除数组对应的值
		    arrnum.splice($index, 1);//删除数组对应的值
		    $.cookie('cooksid', arrsid.toString(), {expires:7});//添加cookie
		    $.cookie('cookienum', arrnum.toString(), {expires:7});//添加cookie
		}
		
		//删除单个商品的函数(委托)
		$('.cart-box3-kuang').on('click', '.th6-bj', function(ev) {
			cookietoarray();//得到数组,上面的删除cookie需要。
		    if(confirm('你确定要删除吗？')){
		     	$(this).first().parents('.cart-box3').remove();//通过当前点击的元素找到整个一行列表，删除
		    }
		    delgoodslist($(this).first().parents('.cart-box3').find('img').attr('sid'), arrsid);
		    priceall();
		    kong();
		});
	
	
		//删除全部商品的函数
		$('.shanchu').on('click', function() {
			cookietoarray();//得到数组,上面的删除cookie需要。
			if(confirm('你确定要全部删除吗？')){
			    $('.cart-box3:visible').each(function() {
			        if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
			            $(this).remove();
			            delgoodslist($(this).find('img').attr('sid'), arrsid);
			        }
			    });
			    priceall();
			    kong();
			}
		});
    	
    	
    	
    	//5.将改变后的数量的值存放到cookie
		//点击按钮将商品的数量和id存放cookie中
		var arrsid=[]; //商品的id
		var arrnum=[]; //商品的数量
		//提前获取cookie里面id和num
		function cookietoarray(){
			if($.cookie('cooksid') && $.cookie('cookienum')){
				arrsid=$.cookie('cooksid').split(',');//cookie商品的sid  
				arrnum=$.cookie('cookienum').split(',');//cookie商品的num
			}
		}
		function setcookie(obj) { //obj:当前操作的对象
			cookietoarray();//得到数组
		    var $index = obj.parents('.cart-box3').find('.th1-a img').attr('sid');//通过id找数量的位置
		    arrnum[$.inArray($index,arrsid)] = obj.parents('.cart-box3').find('#updown input').val();
		    $.cookie('cookienum', arrnum.toString(),{expires:7});
		}
    	
    	
    	
    	
    	
    	
	});
});
