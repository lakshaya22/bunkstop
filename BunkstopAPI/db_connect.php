<?php
function db_connect(){
header("CONTENT-TYPE:application/json");
//error_reporting(0);
mysql_connect('localhost:3306','root','')
or die ('Connection Failed');

mysql_select_db('hotel_management')
or die ('Connection with database failed');

}


?>
