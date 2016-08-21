<?php
include("db_connect.php");

include("get_json_response.php");
db_connect();
$in_mobile=8058787630;


$query="CALL bill_get_total_amount_unpaid($in_mobile)";
$result = mysql_query($query);


get_json_response($result);
?>