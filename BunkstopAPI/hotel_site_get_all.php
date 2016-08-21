<?php
include("db_connect.php");

include("get_json_response.php");
db_connect();

$in_hotel_site_id=1;
$query = "CALL hotel_site_get_all($in_hotel_site_id)";
$result=mysql_query($query);
get_json_response($result);

?>