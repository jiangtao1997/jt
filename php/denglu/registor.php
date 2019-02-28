<?php
	//引入数据库连接
	require "../coon.php";
	//二.后端获取手机号码和数据库进行匹配 --sql语句
	if(isset($_POST['users'])){
		$user=$_POST['users'];
		$result=mysql_query("select * from user where user=$user");//如果存在，返回结果。
		//如果$result存在值，tel已经存在
		if(mysql_fetch_array($result)){//存在
			echo true;
		}else{//不存在
			echo false;
		}
	}else{
		echo "非法操作";
	}
	
	
	
	//一.确认点击的是提交按钮
	if(isset($_POST['submit'])){
		//1.接收前端表单提交过来的数据,加入数据库。
		$user=$_POST['users'];
		$pass=sha1($_POST['password']);
		//2.将数据通过insert语句插入数据库中
		mysql_query("insert user values(NULL,'$user','$pass')");
		
		//3.跳转到登陆页面
		header('location:http://10.31.162.17/diliuzhou/projectname/src/login.html');
	}
	

?>