define(['config'],function(){//定义模块，依赖模块
	require(['jquery','jqcookie'],function($,cookie){
		//放大镜图片
		var $sid=location.search.substring(1).split('=')[1];
			$.ajax({
				url:"http://10.31.162.17/diliuzhou/projectname/php/neirong/detail.php",
				data:{
					sid:$sid
				},
				dataType:'json'
			}).done(function(data){
				$('.xq-js h1').html(data.title);
				$('.touxiang img').attr("src",data.portraitimg);
				$('.jiage-b1 strong').html(data.price1);
				$('.jiage-b1-b del').html('￥'+data.price2);
				$('.jiage-b1-b i').html('￥'+data.price1);
				var arrpic=data.urls.split(',');
				$('.fd-li').find('img').attr('src',arrpic[0]);
				var strhtml='';
				$.each(arrpic,function(index,value){
					strhtml+=`
						<li class="fangdj-li"><img src="${value}"/></li>
					`;
				});
				$('.fangdj .fangdj-xiao .fangdj-ul').html(strhtml);
				
				//点击切换图片 
				$('.fangdj-ul li').on('click',function(){
						var $fd = $(this).find('img').attr('src');
						$('.fd-li').find('img').attr('src',$fd);
				});
				
			});
			
			
			
		//点击加入购物车按钮。
			var sidarr=[];//商品的编号
			var numarr=[];//商品的数量
			
			//判断cookie的值是否存在
			if($.cookie('cooksid') && $.cookie('cookienum')){
				sidarr=$.cookie('cooksid').split(',');
				numarr=$.cookie('cookienum').split(',');
			}
			//添加  判断cookie是否存在
			$('.anniu a').on('click',function(){
				if($.inArray($sid,sidarr)==-1){
					sidarr.push($sid);
					numarr.push($('#cont').val());
					$.cookie('cooksid',sidarr.toString(),{expires:7});
					$.cookie('cookienum',numarr.toString(),{expires:7});
				}else{//存在
					//如果存在  则相加
					var newnum=parseInt($('#cont').val())+parseInt(numarr[$.inArray($sid,sidarr)]);
					numarr[$.inArray($sid,sidarr)]=newnum;
					$.cookie('cookienum',numarr.toString(),{expires:7});
				}
			});
			
		//点击加减数量
		var num = 1;
		$('.shuliang .jian').on('click',function(){
			num--;
			if(num<=0){
				num=1;
				alert('最少选购一个');
			}
			$('#cont').val(num)
		});
		
		$('.shuliang .jia').on('click',function(){
			num++;
			if(num>=11){
				num=10;
				alert('最多选购十个');
			}
			$('#cont').val(num)
		});
		
		
		
	});
});
