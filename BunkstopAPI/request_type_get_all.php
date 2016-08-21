<?php
include("db_connect.php");

include("get_json_response.php");
db_connect();

$query = "CALL request_type_get_all()";
$result=mysql_query($query);




get_json_response($result);
?>