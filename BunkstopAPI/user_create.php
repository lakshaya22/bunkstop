<?php
include("db_connect.php");
include("get_json_response.php");
db_connect();


$in_name='Shantanu Bansal';
$in_age=22;
$in_associated_number_of_guests=2;
$in_phone=80587276230;
$gender='male';
$in_verification_id='Aadhar Card';
$in_verification_id_unique_number=1221;
$in_city='Jaipur';
$in_country='India';
$in_occupation='Software Engineer';

$in_password='Admin@123';
$in_security_question='how you doin';
$in_answer='fine';
$in_date_of_birth='1992-12-05';
$in_designation='Trainee';
$in_email='shantanubansal05@gmail.com';
$in_mobile=8058727630;
$in_nationality='Indian';
$in_img_url='localhost:9090';


$query="CALL user_create
(
'$in_name',
$in_age,
$in_associated_number_of_guests,
$in_phone,
'$gender',
'$in_verification_id',
$in_verification_id_unique_number,
'$in_city',
'$in_country',
'$in_occupation',
'$in_password',
'$in_security_question',
'$in_answer',
'$in_date_of_birth',
'$in_designation',
'$in_email',
$in_mobile,
'$in_nationality',
'$in_img_url'

)";
$result=mysql_query($query);
get_json_response($result);



?>