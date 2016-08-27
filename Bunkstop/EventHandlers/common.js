var socket = io(MESSAGE_SERVER);
var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
               "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
// Cookies
       function createCookie(name, value, days) {
           if (days) {
               var date = new Date();
               date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
               var expires = "; expires=" + date.toGMTString();
           }
           else var expires = "";

           document.cookie = name + "=" + value + expires + "; path=/";
       }

       function readCookie(name) {
           var nameEQ = name + "=";
           var ca = document.cookie.split(';');
           for (var i = 0; i < ca.length; i++) {
               var c = ca[i];
               while (c.charAt(0) == ' ') c = c.substring(1, c.length);
               if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
           }
           return null;
       }

       function eraseCookie(name) {
           createCookie(name, "", -1);
       }
       function cookieExists(name){
         if(document.cookie.indexOf(name) >= 0){
           return true;
         }else {
           return false;
         }

       }
       ///Log In Functions
       function isLoggedIn(username){
         if(cookieExists(username)){ return true }else{ return false};
       }

       // Log in to Platform
       function logIn(usernamep,passwordp){
         console.log("In AJAX");
         console.log("username" + usernamep + "  Password:" + passwordp );
         requestServer(function(data,type,xhr){
           console.log("success");
           console.log(data);
           if(data[0].is_valid == 1){
             var validity = data[0].check_out;
           createCookie(COOKIE_SCREEN_NAME,data[0].name,1);
           myApp.addNotification({
               title: 'Welcome !' + readCookie(COOKIE_SCREEN_NAME) ,
               message: 'You Have been successfully logged In.Start Ordering now!'
           });
           var name = readCookie(COOKIE_SCREEN_NAME).split(" ");
           var checkin = new Date (data[0].check_in);
           var checkout = new Date (data[0].check_out);
           var checkinDate = checkin.getDate() + "-" + months[parseInt(checkin.getMonth())] ;
            var checkOutDate = checkout.getDate() + "-" + months[parseInt(checkout.getMonth())] ;
            createCookie("checkInDate",checkinDate.toString());
            createCookie("checkOutDate",checkOutDate.toString());

           console.log(name);

           loggedIn = true;
           mainView.router.load({url: "index.html"});
           $("#firstName").html(name[0]);
           $("#secondName").html(name[1]);
           $("#checkedin").html(checkinDate.toString());
           $("#checkedout").html(checkOutDate.toString());

         }else{
           notificationMessage("Bunkstop",data[0].message);
         }
         },APIURL.loginAPI,{
            username : usernamep,
            password : passwordp,
         });

       }

       /**
       * This function is used to send ajax request to specified server
       *
       *@param {string}[url] - The server url does not include parameters with it only the api url
       *@param {array string} [data] - the data to be sent to server
       *
       */

       var activeRequest ; // to handle current active AJAX request
       function requestServer(callBackFunction,url,data,type="POST",dataType="JSON",contentType = "application/x-www-form-urlencoded",killable = false ){

           if (activeRequest && activeRequest.readystate != 4 && killable)
           {              activeRequest.abort();
           }

           activeRequest = $.ajax({
               type: type,
               url: url,
               data: data,
               dataType: dataType,
               contentType: contentType,
               success:callBackFunction ,
               error: function(xhr, status, err) {
                   dataRecieved = null;
                   notificationMessage("Sorry Something went wrong maybe our servers are down currently!");
                   return false;
               }.bind(this)
           });

       }

function notificationMessage(titlep,messasgep,onCloseCallBack){

  myApp.addNotification({
              title: titlep ,
              message:messasgep,
              media: '<img width="44" height="44" style="border-radius:50%" src="./assets/img/logo/android-chrome--48.png">',
            onClose: onCloseCallBack
          });

}
//to notify managerers
function notifyStaff(data = {name:"vipul",room:103,type:"fnb"},type = 1,heading = "Thank you for contacting us!",textBody = "We are on our way!"){

      notificationMessage(heading,textBody,function(){
        console.log("Sending Data To Server");
        socket.emit('notifyStaff',data);
        console.log("Sent");
    });
}

$(document).ready(function() {

      console.log("sTEP 1");
    socket.on('notifyAllStaff', function(data) {
        console.log("Notifying All Staff");
        if (isManager) {
            console.log("Manager");
            socket.on('message', function(message) {
                notificationMessage(heading, textBody, function onAccept() {
                    socket.emit('click', {
                        name: "order Confirmed by Vipul"
                    });
                });
                $(".item-text").append('<p><a href="#" class="button button-round" id = "acceptedOrder" style="color: greenyellow;">Accept</a></p>');
            });

        } else
        {

        }
    });

    if (isLoggedIn(COOKIE_SCREEN_NAME)) {
       mainView.router.load({url: "index.html"});
    }else{
      mainView.router.load({url: "login.html"});
    }
});
