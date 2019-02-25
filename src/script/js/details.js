define(['config'],function(){//定义模块，依赖模块
	require(['jquery','jqcookie'],function($){
		//放大镜图片
		var $sid=location.search.substring(1).split('=')[1];
			$.ajax({
				url:"http://10.31.162.17/diliuzhou/projectname/php/neirong/detail.php",
				data:{
					sid:$sid
				},
				dataType:'json'
			}).done(function(data){
				console.log(data);
				$('.xq-js h1').html(data.title);
//				$('.xq-js .jieshi').html(data.);
				$('.touxiang img').attr("src",data.portraitimg);
				$('.jiage-b1 strong').html(data.price1);
				$('.jiage-b1-b del').html('￥'+data.price2);
				$('.jiage-b1-b i').html('￥'+data.price1);
				console.log(data.portraitimg);
				var arrpic=data.urls.split(',');
//				console.log(arrpic);
				var strhtml='';
				$.each(arrpic,function(index,value){
					strhtml+=`
						<li class="fangdj-li"><img src="${value}"/></li>
					`;
				});
				
				$('.fangdj .fangdj-xiao .fangdj-ul').html(strhtml);
			});
			
			
			
			
		//点击加入购物车按钮。
			var sidarr=[];//商品的编号
			var numarr=[];//商品的数量
			
			//判断cookie的值是否存在
			if($.cookie('cooksid') && $.cookie('cookienum')){
				sidarr=$.cookie('cooksid').split(',');
				numarr=$.cookie('cookienum').split(',');
			}
			
			console.log($.cookie('cookienum'));
			console.log($.cookie('cooksid'));
			console.log(sidarr);
			console.log(numarr);
			
			
			$('.anniu button').on('click',function(){
				if($.inArray($sid,sidarr)==-1){//不存在
					sidarr.push($sid);
					//$('#count').val();  当前商品的个数
					numarr.push($('#cont').val());
					
					$.cookie('cooksid',sidarr.toString(),{expires:7});
					$.cookie('cookienum',numarr.toString(),{expires:7});
				}else{//存在
					//console.log(numarr[$.inArray($sid,sidarr)]);//已经存在的值  相加
					var newnum=parseInt($('#cont').val())+parseInt(numarr[$.inArray($sid,sidarr)]);
					numarr[$.inArray($sid,sidarr)]=newnum;
					$.cookie('cookienum',numarr.toString(),{expires:7});
				}
			});
			
	});
});
