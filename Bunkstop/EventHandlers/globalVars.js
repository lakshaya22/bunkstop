var GLOBALHOST = "http://localhost:8888/BunkstopAPI/";
var APIURL = {
  loginAPI: GLOBALHOST  +  "user_login_validate.php",
  inventoryGetAll: GLOBALHOST  +  "inventory_get_all.php",
  placeOrder: GLOBALHOST  +  "order_by_user.php"
}
var VALIDITY_PERIOD = 10;
var CART_ARRAY="";
var COOKIE_NAME = "username";
var COOKIE_SCREEN_NAME = "screenName";
var MESSAGE_SERVER  = 'http://localhost:3000';
var isManager = true;
