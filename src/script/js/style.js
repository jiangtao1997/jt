define(['config'],function(){//定义模块，依赖模块
	//引入配置模块进行开发。
	/*require(['jquery','jqcookie'],function($){//加载模块
		//1.tab切换
		var $btns=$('.tab_title li');
		var $contents=$('.tab_content .item');
		$btns.on('click',function(){
			$(this).addClass('active').siblings('li').removeClass('active');//链式操作的核心是最开始的元素对象
			$contents.eq($(this).index()).addClass('show').siblings('div').removeClass('show');
		});
		
	});
	*/
	
	
		
	
	
	//滚动触发滚动条
	require(['jquery','jqcookie'],function($,coolie){
		var $box = $('.fudong');
		var $uli = $('.fudong-ul li a').not($('.active'));
		$(window).on('scroll',function(){
			var $top = $(window).scrollTop();
			if($top>=200){
				$box.stop(true).animate({
						top: 0
					});
			}else{
				$box.stop(true).animate({
						top: -60
					});
			}
		});
		//字体变色
		$uli.hover(function(){
			$(this).css({
				'padding-bottom':'12px',
				'color':'#E73736',
				'border-bottom': '2px solid #E73736'
			})
		},function(){
			$(this).css({
				'color':'#333',
				'border-bottom': 'none'
			})
		});
		
		
		
		//搜索下面的导航栏
		var $logosousuo = $('.logo-ul li a');
		$logosousuo.hover(function(){
			$(this).css({
				'color':'#E73736'
				})
			},function(){
				$(this).css({
					'color':'#333'
				})
			});
		
		
		
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
		
		
		//轮播图
		
		//点击时  ol li 背景变色
		$('.Carousel-ol li').on('click',function(){
			$(this).addClass('active').siblings('li').removeClass('active');
			var $left=$(this).index();
			var $width=$('.Carousel-ul-img li').prop('offsetWidth');
			$('.Carousel-ul-img').css({'left':- $left * $width})
		});
		
		//定时器
		var $num=0;
		var time=setInterval(function(){
			$num++;
			if($num>=$('.Carousel-ol li').length){
				$num=0;
			}
			$('.Carousel-ol li').eq($num).addClass('active').siblings('li').removeClass('active');
			var $width=$('.Carousel-ul-img li').prop('offsetWidth');
			$('.Carousel-ul-img').css({'left':- $num * $width});
		},4000);
		//鼠标移入定时器停止/ 开启
		$('.Carousel').hover(function(){
			clearInterval(time);
		},function(){
			time=setInterval(function(){
				$num++;
				if($num>=$('.Carousel-ol li').length){
					$num=0;
				}
				$('.Carousel-ol li').eq($num).addClass('active').siblings('li').removeClass('active');
				var $width=$('.Carousel-ul-img li').prop('offsetWidth');
				$('.Carousel-ul-img').css({'left':- $num * $width});
			},4000);
		});
		
		
		
		//ajax传值  主题内容
	
	$.ajax({
			url:"http://10.31.162.17/diliuzhou/projectname/php/neirong/haitaodata.php",
				dataType:'json'
			}).done(function(data){
				var $pinjie = ''
				$.each(data, function(index,value) {
					$pinjie+=`
						<li class="zhuti-left-li">
							<a href="details.html?sid=${value.sid}" target="_blank">
								<img src="${value.imgli}">
							</a>
							<h3><a href="#">${value.title}</a></h3>
							<div class="qian">
								<img src="${value.portraitimg}" />
								<span>￥</span>
								<span>${value.price1}</span>
								<strong>￥${value.price2}</strong>
							</div>
							<div class="hongg"></div>
						</li>
						
					`;
				});
				$('.zhuti-left-ul').html($pinjie);
				
			});
		
		
		
		
		
		//热销排行
		
		$.ajax({
			url:"http://10.31.162.17/diliuzhou/projectname/php/paihang/haitaodata.php",
				dataType:'json'
			}).done(function(data){
				var $pinjie = '<h2>热销排行榜</h2>'
				$.each(data, function(index,value) {
					$pinjie+=`
						
							<li class="zhuti-right-li">
								<a href="#">
									<div class="imgzhuti">
										<img src="${value.img}" />
									</div>
									<div class="jieshao">
										<span>${value.title}</span>
										<strong>￥${value.price1}</strong>
										<i>￥${value.price2}</i>
									</div>
								</a>
							</li>
					`;
				});
				$('.zhuti-right-ul').html($pinjie);
			});
			
			
			
		//返回顶部
		
		var $fanhui = $('.fanhui');
		var timer = null;
		$fanhui.on('click',function(){
			var $hui = $(window).scrollTop();
			timer = setInterval(function(){
				$(window).scrollTop($hui-=20);
				if($hui<=0){
					clearInterval(timer);
				}
			},10);
			
		});
		
		$(window).on('scroll',function(){
			var $ftop = $(window).scrollTop();
			if($ftop>=400){
				$fanhui.css('display','block')
			}else{
				$fanhui.css('display','none')
			}
		});
		
		
		//懒加载
		
		require(['jqlazy'],function(){
			$('img').addClass('lazy');
			$('img').attr('data-original',function(){
				return $(this).attr('src');
			});
			$("img .lazy").lazyload({
					effect: "fadeIn"
				});
		});
		
	});
});
