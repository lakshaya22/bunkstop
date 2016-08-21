<?php
include("db_connect.php");
include("get_json_response.php");
db_connect();


$mobile=9557922628;
$hotel_site=1;
$query="CALL user_unapproved_get_all($hotel_site)";
$result = mysql_query($query);
get_json_response($result);


?>