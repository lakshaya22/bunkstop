<?php

include("db_connect.php");
include("get_json_response.php");
db_connect();
$mobile = 8058727630;
$password= 'Admin@123';
// $mobile = $_REQUEST['username'];
// $mobile = $mobile * 1;
// $password= $_REQUEST['password'];
$query="CALL user_login_validate($mobile, '$password')";
$result=mysql_query($query);
get_json_response($result);

?>
