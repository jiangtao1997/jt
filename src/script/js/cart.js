define(['config'],function(){//定义模块，依赖模块
	require(['jquery','jqcookie'],function($,cookie){
		
		//1.购物车列表渲染
		function ajaxcz(sid,num){//sid：商品的编号，num:商品的数量
    			$.ajax({
    				url:"http://10.31.162.17/diliuzhou/projectname/php/neirong/haitaodata.php",
    				dataType:'json'
    			}).done(function(data){
    				
    				$.each(data,function(index,value){
						
    					if(sid==value.sid){//比较当前传入的sid和数据里面的sid比较，相同获取当前的整条数据
    						
    						var clonegoodslist=$('.cart-box3:hidden').clone(true,true);//深度克隆被隐藏的商品列表。
    						clonegoodslist.find('#th1-a img').attr('src',value.imgli);
    						clonegoodslist.find('#th2-title').html(value.title);
    						clonegoodslist.find('.th3 del').html(value.price2);
    						clonegoodslist.find('.th3 div').html(value.price1);
    						clonegoodslist.find('.jiajian-inp').val(num).css({"text-align": "center"});
    						clonegoodslist.css('display','block');
    						
							$('.cart-box3-kuang').append(clonegoodslist);
    					}
    				});
    			});
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
    		});
    		
    		var $input = $('.cart-box3:visible').find('input:checkbox');
    		$('.cart-box3-kuang').on('input',$input,function(){
    			if($('.cart-box3:visible').find('input:checkbox').size()==$('.cart-box3:visible').find('input:checked').length){
    				$('.quanxuan').prop('checked',true);
    			}else{
    				$('.quanxuan').prop('checked',false);
    			}
    		});
    		
    		
    	//数量加减
    	
    	$('.up').on('click',function(){
    		alert(1);
    	})
    	
    	
	});
});
