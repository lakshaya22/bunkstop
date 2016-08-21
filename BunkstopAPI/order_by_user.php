<?php
include("db_connect.php");

include("get_json_response.php");
db_connect();


$in_user_id=20;
$in_mobile=9410922563;
$in_request_type=1;
$in_inventory_id=$_REQUEST["inventoryId"];
$in_units=$_REQUEST["inventoryUnits"];

$query = "CALL order_by_user($in_user_id,
$in_mobile,
$in_request_type,
'$in_inventory_id',
'$in_units')";
$result=mysql_query($query);
get_json_response($result);
?>