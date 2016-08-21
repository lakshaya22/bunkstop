<?php
include("db_connect.php");
include("get_json_response.php");
db_connect();


$in_staff_id='asdasda';
$in_name='Vipul_tes';	
$in_post=1;
$in_site=1;
$in_address='sadasd';
$in_phone=8857;
$in_gender='male';
$in_pay=1231;
$in_verfication_id_name='acas';
$in_verfication_id='ascasc';
$in_timezone=1;
$in_password='Admin@123';
$in_img_url='asdasd';



$query="CALL  hotel_staff_insert(

'$in_staff_id',
'$in_name',
$in_post,
$in_site,
'$in_address',
$in_phone,
'$in_gender',
$in_pay,
'$in_verfication_id_name',
'$in_verfication_id',
$in_timezone,
'$in_password',
'$in_img_url')";


$result=mysql_query($query);
get_json_response($result);
?>