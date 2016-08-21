var loggedIn = false;
var cartArray=[];
var cartArray1=[];
var cartArrayMrp=[];
var inventoryId="";
var inventoryUnits="";
$(document).ready(function() {
  console.log("Logged");
    //logIn("vipul","Vipul");

    //
    // if (isLoggedIn(COOKIE_NAME)) {
    //     console.log("User Logged In");
    //     mainView.router.load({url: "index.html"});
    // } else {

        // if (cookieExists(COOKIE_NAME)) {
        //     eraseCookie(COOKIE_NAME)
        //     myApp.addNotification({
        //         title: 'Logged Out',
        //         message: 'You Have been successfully logged Out! Please Relogin!'
        //     });
        // }
        // console.log("Not Logged In");
        // mainView.router.load({
        //     url: "login.html"
        // });
        myApp.onPageInit('login', function(page) {
            // Do something here for "about" page
            console.log("I am in login"+cartArray);
            $("#login-button").on("click", function(e) {
              console.log("INSIDE");
                var username = $("#login").val();
                var password = $("#password").val();
                var isLoggedInf = logIn(username, password)
                if (isLoggedInf) {

                  mainView.router.load({url: "index.html"});

                  myApp.addNotification({
                      title: 'Welcome !' + readCookie(COOKIE_SCREEN_NAME) ,
                      message: 'You Have been successfully logged In.Start Ordering now!'
                  });
                  var name = readCookie(COOKIE_SCREEN_NAME).split(" ");
                  console.log(name);
                  $("#firstName").html(name[0]);
                  $("#secondName").html(name[1]);
                  loggedIn = true;
                } else {
                    console.log("Fail");
                }


            });

        });


  myApp.onPageInit('cart', function(page) {
            // Do something here for "about" page
            console.log("I am in cart"+cartArray);
            $("#cancel-button").on("click", function(e) {
               mainView.router.load({url: "index.html"});
            });
            $("#place-button").on("click", function(e) {

              $.ajax({
             type:"POST",
         url: APIURL.placeOrder,
          dataType: 'json',
          datatype : "application/json",
          data:{
            inventoryId:inventoryId,
            inventoryUnits:inventoryUnits
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
        console.log(data);
         if(data[0].is_valid==1)
         {
          alert("Order Placed successfully");
          $("#listCart").empty();
          cartArray=[];
          cartArray1=[];
          cartArrayMrp=[];
          cartRefresh(data);
         }
         


          }
          
      });
            });
    

 $.ajax({
             type:"POST",
         url: APIURL.inventoryGetAll,
          dataType: 'json',
          datatype : "application/json",
        
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
          
         cartRefresh(data);
         


          }
          
      });
        });

   myApp.onPageInit('tabs', function(page) {
         
         $.ajax({
             type:"POST",
         url: APIURL.inventoryGetAll,
          dataType: 'json',
          datatype : "application/json",
        
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
          //console.log(data[0].id);
          var test="";
          
          test=test+"<article>";
          test=test+"<div class='author'>";
          test=test+"<img src='assets/img/inventory/lays.jpg' alt=''/>";
          test=test+"<span >Lays</br><i class='fa fa-inr'> 50</i></span>";
          test=test+"<div>";
          test=test+"<div class='buttons'>";
          test=test+"<label>2</label>";
          test=test+"<a href='#'><span class='fa fa-plus'></span></a>";
          test=test+"</div>";
          test=test+"</article></br></br>";
      
          for(var counter=0;counter<data.length;counter++)
          {
          
          $("#list").append("<article><div class='author'><img src='assets/img/inventory/"+data[counter].name+".jpg' alt=''/><span >"+data[counter].name+"<br /><i class='fa fa-inr'>"+data[counter].mrp+"</i></span></div><div class='buttons'><a href='#''><span id="+data[counter].name+" class='fa fa-plus'></span></a></div></article></br></br></br>");
          //$("#list").append(test);
          }
var counter=0;
           for(counter=0;counter<data.length;counter++)
          {
         $("#"+data[counter].name).on("click", function(e) {
          
           cartArray.push(e.toElement.id);
           cartArray1.push(e.toElement.id+"cart");
           
           console.log("I am in tab"+cartArray);
         });
       }

          }
          
      });   
        });
 
});

function callBell(){
  console.log("called");
}

function cartRefresh(data){
  var showDataOnCart=[];
      var showDataOnCartMrp=[];  
      var showDataOnCartId=[];    
      var dataCount=[];
      var dataFinalMrp=[]; 
      var total=0;
  for(var counter=0;counter<data.length;counter++)
          {
             if(cartArray.indexOf(data[counter].name)!=-1)
             {
              showDataOnCart.push(data[counter].name);
              showDataOnCartId.push(data[counter].id);
              showDataOnCartMrp.push(data[counter].mrp);
             }
          }
          console.log(showDataOnCartId);
           for(var counter=0;counter<showDataOnCart.length;counter++)
          {
          var count = cartArray.reduce(function(n, val) {
    return n + (val === showDataOnCart[counter]);
}, 0);
          dataCount[counter]=count;
          dataFinalMrp[counter]=count*showDataOnCartMrp[counter];
          }
          console.log(dataCount);

          inventoryId=showDataOnCartId.toString();
          inventoryUnits=dataCount.toString();

          for(var counter=0;counter<showDataOnCart.length;counter++)
          {
          
          $("#listCart").append("<article><div class='author'><img src='assets/img/inventory/"+showDataOnCart[counter]+".jpg' alt=''/><span >"+showDataOnCart[counter]+"<br /><i class='fa fa-inr'>"+dataFinalMrp[counter]+"</i></span></div><div class='buttons'><label>"+dataCount[counter]+"</label><a href='#''><span id="+showDataOnCart[counter]+"cart"+" class='fa fa-minus'></span></a></div></article></br></br></br>");
          
          }

          for(var counter=0;counter<dataFinalMrp.length;counter++)
          {
            total=total+dataFinalMrp[counter];
          }
          $('#amount').text('Total Amount: '+total+" Rs");

for(var counter=0;counter<showDataOnCart.length;counter++)
          {
            console.log("For");
         $("#"+showDataOnCart[counter]+"cart").on("click", function(e) {
           console.log("For1");
           var index = cartArray1.indexOf(e.toElement.id);
           console.log(e.toElement.id);
           if (index > -1) {
           cartArray.splice(index, 1);
           cartArray1.splice(index, 1);
           
           }
           $("#listCart").empty();
           console.log("I am in cart"+cartArray);
           cartRefresh(data);
         });
       }
         
}
