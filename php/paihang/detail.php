<?php  
	
	include "../coon.php";
	
	$id=$_GET['sid'];
	
	$result=mysql_query("select * from paihang where sid=$id ");
	
	$wronglist=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo json_encode($wronglist);

?>