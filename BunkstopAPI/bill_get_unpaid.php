<?php
include("db_connect.php");

include("get_json_response.php");
db_connect();
get_json_response($result);
?>