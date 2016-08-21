<?php
include("db_connect.php");
include("get_json_response.php");
db_connect();
$in_mobile=8058727630;
$in_staffid='5454q54dwqd';
$in_request_id=2;

$query = "CALL paid_for_order(
$in_mobile,
'$in_staffid',
$in_request_id)";
$result=mysql_query($query);


get_json_response($result);
?>