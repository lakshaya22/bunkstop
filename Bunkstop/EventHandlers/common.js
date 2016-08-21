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
       function logIn(username,password){
         console.log("LOG IN FUnction");
         if (isLoggedIn("username")) {
           console.log("I am HERE");
           mainView.router.load({
               url: "index.html"
           });
           myApp.addNotification({
               title: 'Hey !' + readCookie(COOKIE_SCREEN_NAME) ,
               message: 'You are already in !! keep browsing please'
           });
           return true;
         }
         else{
           $.ajax({
             type:"POST",
         url: APIURL.loginAPI,
          dataType: 'json',
          datatype : "application/json",
         data: {
            username: username,
            password:password
         },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {

          if(data[0].is_valid == "1"){

            createCookie(COOKIE_NAME, data[0].mobile, VALIDITY_PERIOD);
              createCookie(COOKIE_SCREEN_NAME, data[0].name, VALIDITY_PERIOD);
            return true;
          }else {
            return false;
          }
         }
      });
                     }
       }
