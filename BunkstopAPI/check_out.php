<?php
include("db_connect.php");

include("get_json_response.php");
db_connect();

$in_mobile=8058727630;
$in_staffid='abhqdqkb';
$query = "CALL check_out(
$in_mobile,
'$in_staffid'
)";
$result=mysql_query($query);
get_json_response($result);
?>