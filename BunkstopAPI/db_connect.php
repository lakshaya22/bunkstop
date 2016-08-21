<?php
function db_connect(){
	header("CONTENT-TYPE:application/json");
mysql_connect('localhost','root','')
or die ('Connection Failed');

mysql_select_db('hotel_management')
or die ('Connection with database failed');

}


?>