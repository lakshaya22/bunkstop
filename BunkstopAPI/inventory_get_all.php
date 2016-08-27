<?php
include("db_connect.php");

include("get_json_response.php");
db_connect();
$requestType=$_REQUEST["requestType"];
//$requestType=2;
$query = "CALL inventory_get_all($requestType)";
$result=mysql_query($query);
get_json_response($result);
?>