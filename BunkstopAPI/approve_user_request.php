<?php
include("db_connect.php");

include("get_json_response.php");
db_connect();


$mobile=8058727630;
$in_user_id=20;
$query="CALL approve_user_request($in_user_id)";
$result = mysql_query($query);
get_json_response($result);




?>