define(['config'],function(){//定义模块，依赖模块
	
	
	require(['jquery','jqcookie','jqvalidate'],function($,cookie,validate){
		
		
		$('.logintou').load('header.html',function(){
			
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
		
		
		var $users = $('#users');
		var $pasw = $('#password');
		var $oForm = $('#form1');
		var $usernameflag=true;
		
		$('#submit').on('click',function(){
			if($users.val()!=''){
				$.ajax({
					type:"post",
					url:"http://10.31.162.17/diliuzhou/projectname/php/denglu/login.php",
					data:{
							username:$users.val(),
							password:$pasw.val()
					}
					}).done(function(data){
						if(!data){
							alert("账号或密码错误");
							$usernameflag=false;
						}else{
							location.href='http://10.31.162.17/diliuzhou/projectname/src/index.html';
							$usernameflag=true;
							$.cookie('user',$users.val().toString());
						}
					});
			}else{
				alert("账号或密码不能为空");
				$usernameflag=false;
			};
			if(!$usernameflag){
				return false;
			}
		});
			
		
		
				

		
	});
});
