<?php
function get_json_response($result){

while($array= mysql_fetch_object($result)){

	$res[]=$array;
	
}
echo  json_encode($res);
}

?>
