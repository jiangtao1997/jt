define(['config'],function(){//定义模块，依赖模块
	require(['jquery','jqcookie'],function($,cookie){
		var $user = $('#user');
		var $pass = $('#password');
		var $submit = $('#submit');
		$.ajax({
				type:"post",
				url:"http://10.31.162.17/diliuzhou/projectname/php/denglu/registor.php",
				data:{
					users:$user.val()
				},
				dataType:'json',
			}).done(function(data){
				
				
				console.log(data);
					if(!data){
//							oSpan.innerHTML='√';
//							oSpan.style.color='green';
//							usernameflag=true;
						alert('成功');
					}else{
//							oSpan.innerHTML='改手机号码已被注册';
//							oSpan.style.color='red';
//							usernameflag=false;
						alert('失败');
					}
				
			});
		
		
	});
});
