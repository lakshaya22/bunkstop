<?php
include("db_connect.php");
include("get_json_response.php");
db_connect();


$mobile=805872763; // 
$hotel_site=1;
$query="CALL user_register($mobile,$hotel_site)";
$result = mysql_query($query);
get_json_response($result);



?>