define(['config'],function(){//定义模块，依赖模块
	
	
	require(['jquery','jqcookie','jqvalidate'],function($,cookie,validate){
		
		$('.registortou').load('header.html',function(){
			
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
		
		var $user = $('#users');
		var $pass = $('#password');
		var $submit = $('#submit');
		var $oForm = $('#form1');
		var $usernameflag=true;
		var $tel=/^1[3578]\d{9}$/;//正则表达式
		var $mima = /^\d{6,18}$/;
		$('#users').on('blur',function(){
					if($('#users').val()!=''){
						if($tel.test($('#users').val())){
							$.ajax({
							type:"post",
							url:"http://10.31.162.17/diliuzhou/projectname/php/denglu/registor.php",
							data:{
								users:$user.val()
							}
						}).done(function(data){
							if(!data){
								$usernameflag=true;
								$('.ospan1').html('√');
								$('.ospan1').show().css({'color':'green'});
							}else{
								$('.ospan1').html('手机号码已被注册');
								$('.ospan1').show().css({'color':'red'});
								$usernameflag=false;
							}
						});
					}else{
						$('.ospan1').html('号码格式错误');
						$('.ospan1').show().css({'color':'red'});
						$usernameflag=false;
					}
						
				}else{
					$('.ospan1').html('不能为空');
					$('.ospan1').show().css({'color':'red'});
					$usernameflag=false;
				}
			
			
		});
		
		$('#password').on('blur',function(){
			if($('#password').val()!=''){
				$usernameflag=true;
				if($mima.test($('#password').val())){
					$usernameflag=true;
					$('.ospan2').html('');
					$('.ospan2').hide();
				}else{
					$('.ospan2').html('长度在6-18位之间');
					$('.ospan2').show().css({'color':'red'});
					$usernameflag=false;
				}
			}else{
				$('.ospan2').html('不能为空');
				$('.ospan2').show().css({'color':'red'});
				$usernameflag=false;
			}
		})
		

		$oForm.submit(function(){
				if(!$usernameflag){
					return false;
				}
		});
		
		
//		$('#form1').validate({
//			
//			rules:{
//				users:{
//					required:true,
//					minlength:
//				}
//			},
//			
//			messages:{
//				
//			},
//			
//			success:function(lable){
//				lable.append('<img src='' />')
//			}
//			
//			
//			
//		});
		
			
		
	});
});
