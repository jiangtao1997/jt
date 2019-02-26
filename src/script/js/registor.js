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
				success:function(data){
					console(data);
				}
			}).done(function(data){
				console.log(data);
			});
		
		
	});
});
