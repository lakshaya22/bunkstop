var loggedIn = false;
var cartArray=[];
var cartArray1=[];
var cartArrayMrp=[];
var inventoryId="";
var inventoryUnits="";

var cartArrayRoom=[];
var cartArrayRoom1=[];
var cartArrayMrpRoom=[];
var inventoryIdRoom="";
var inventoryUnitsRoom="";

var cartArrayTaxi=[];
var cartArrayTaxi1=[];
var cartArrayMrpTaxi=[];
var inventoryIdTaxi="";
var inventoryUnitsTaxi="";
$(document).ready(function() {
  console.log("Logged");
    
    if (isLoggedIn(COOKIE_NAME)) {
        console.log("User Logged In");
        mainView.router.load({url: "index.html"});
    } else {

        if (cookieExists(COOKIE_NAME)) {
            eraseCookie(COOKIE_NAME)
            myApp.addNotification({
                title: 'Logged Out',
                message: 'You Have been successfully logged Out! Please Relogin!'
            });
        }
        console.log("Not Logged In");
        mainView.router.load({url: "login.html"});

        myApp.onPageInit('login', function(page) {
            // Do something here for "about" page
            myApp.closePanel();
            $("#leftsidebar").css({'width':'0px'});
            $("#login-button").on("click", function(e) {
              console.log("INSIDE");
                var username = $("#login").val();
                var password = $("#password").val();
                console.log(username + password);
                logIn(username, password);

            });

        });
    }

       

  myApp.onPageInit('index', function(page) {
            // Do something here for "about" page
            var count=cartArray.length+cartArrayRoom.length+cartArrayTaxi.length;
            console.log(count);
            $('#cartIcon').html(count);
            $("#leftsidebar").css({'width':'75%'});
            
        });
  myApp.onPageInit('cart', function(page) {
            // Do something here for "about" page
            console.log("I am in cart"+cartArray);
            
            $("#cancel-button").on("click", function(e) {
               mainView.router.load({url: "index.html"});
            });
             $("#cancel-button1").on("click", function(e) {
               mainView.router.load({url: "index.html"});
            });
              $("#cancel-button2").on("click", function(e) {
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
            inventoryUnits:inventoryUnits,
            requestType:1
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
        console.log(data);
         if(data[0].is_valid==1)
         {
          myApp.alert("Order Placed successfully");
          $("#listCart").empty();
          cartArray=[];
          cartArray1=[];
          cartArrayMrp=[];
          cartRefresh1(data);
         }
         


          }
          
      });
            });
    
    $("#place-button2").on("click", function(e) {

              $.ajax({
             type:"POST",
         url: APIURL.placeOrder,
          dataType: 'json',
          datatype : "application/json",
          data:{
            inventoryId:inventoryIdRoom,
            inventoryUnits:inventoryUnitsRoom,
            requestType:2
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
        console.log(data);
         if(data[0].is_valid==1)
         {
          myApp.alert("Order Placed successfully");
          $("#listCart2").empty();
          cartArrayRoom=[];
          cartArrayRoom1=[];
          cartArrayMrpRoom=[];
          cartRefresh2(data);
         }
         


          }
          
      });
            });

    $("#place-button3").on("click", function(e) {

              $.ajax({
             type:"POST",
         url: APIURL.placeOrder,
          dataType: 'json',
          datatype : "application/json",
          data:{
            inventoryId:inventoryIdTaxi,
            inventoryUnits:inventoryUnitsTaxi,
            requestType:3
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
        console.log(data);
         if(data[0].is_valid==1)
         {
          myApp.alert("Order Placed successfully");
          $("#listCart3").empty();
          cartArrayTaxi=[];
          cartArrayTaxi1=[];
          cartArrayMrpTaxi=[];
          cartRefresh3(data);
         }
         


          }
          
      });
            });

 $.ajax({
             type:"POST",
         url: APIURL.inventoryGetAll,
          dataType: 'json',
          datatype : "application/json",
        data:{
            
            requestType:2
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
          
         cartRefresh2(data);
         


          }
          
      });

  $.ajax({
             type:"POST",
         url: APIURL.inventoryGetAll,
          dataType: 'json',
          datatype : "application/json",
        data:{
            
            requestType:1
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
          
         cartRefresh1(data);
         


          }
          
      });

    $.ajax({
             type:"POST",
         url: APIURL.inventoryGetAll,
          dataType: 'json',
          datatype : "application/json",
        data:{
            
            requestType:3
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
          
         cartRefresh3(data);
         


          }
          
      });
        });

   myApp.onPageInit('foods', function(page) {
         
         $.ajax({
             type:"POST",
         url: APIURL.inventoryGetAll,
          dataType: 'json',
          datatype : "application/json",
         data:{
            
            requestType:1
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
          //console.log(data[0].id);
          
      
          for(var counter=0;counter<data.length;counter++)
          {
          if(data[counter].type==1)
          $("#list").append("<article><div class='author'><img src='assets/img/inventory/"+data[counter].name+".jpg' alt=''/><span >"+data[counter].name+"<br /><i class='fa fa-inr'>"+data[counter].mrp+"</i></span></div><div class='buttons'><a href='#''><span id="+data[counter].name+" class='fa fa-plus'></span></a></div></article></br></br></br>");
          //$("#list").append(test);
          if(data[counter].type==2)
          $("#list1").append("<article><div class='author'><img src='assets/img/inventory/"+data[counter].name+".jpg' alt=''/><span >"+data[counter].name+"<br /><i class='fa fa-inr'>"+data[counter].mrp+"</i></span></div><div class='buttons'><a href='#''><span id="+data[counter].name+" class='fa fa-plus'></span></a></div></article></br></br></br>");
          
          if(data[counter].type==3)
          $("#list2").append("<article><div class='author'><img src='assets/img/inventory/"+data[counter].name+".jpg' alt=''/><span >"+data[counter].name+"<br /><i class='fa fa-inr'>"+data[counter].mrp+"</i></span></div><div class='buttons'><a href='#''><span id="+data[counter].name+" class='fa fa-plus'></span></a></div></article></br></br></br>");
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




 myApp.onPageInit('taxi', function(page) {
         
         $.ajax({
             type:"POST",
         url: APIURL.inventoryGetAll,
          dataType: 'json',
          datatype : "application/json",
        data:{
            
            requestType:3
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
          //console.log(data[0].id);
          
      
          for(var counter=0;counter<data.length;counter++)
          {
        
          $("#listTaxi").append("<article><div class='author'><img src='assets/img/inventory/"+data[counter].name+".jpg' alt=''/><span >"+data[counter].name+"<br /><i class='fa fa-inr'>"+data[counter].rate_per_trip+"</i></span></div><div class='buttons'><a href='#''><span id="+data[counter].name+" class='fa fa-plus'></span></a></div></article></br></br></br>");
          //$("#list").append(test);
         
          }
var counter=0;
           for(counter=0;counter<data.length;counter++)
          {
         $("#"+data[counter].name).on("click", function(e) {
          
           cartArrayTaxi.push(e.toElement.id);
           cartArrayTaxi1.push(e.toElement.id+"cart");
           
           console.log("I am in tab Taxi"+cartArrayTaxi);
         });
       }

          }
          
      });   
        });


 myApp.onPageInit('room', function(page) {
         
         $.ajax({
             type:"POST",
         url: APIURL.inventoryGetAll,
          dataType: 'json',
          datatype : "application/json",
        data:{
            
            requestType:2
          },
         error: function(e) {

            console.log(e);
         },

         success: function(data) {
          //console.log(data[0].id);
          
      
          for(var counter=0;counter<data.length;counter++)
          {
        
          $("#listRoom").append("<article><div class='author'><img src='assets/img/inventory/"+data[counter].name+".jpg' alt=''/><span >"+data[counter].name+"<br /><i class='fa fa-inr'>"+data[counter].price+"</i></span></div><div class='buttons'><a href='#''><span id="+data[counter].name+" class='fa fa-plus'></span></a></div></article></br></br></br>");
          //$("#list").append(test);
         
          }
var counter=0;
           for(counter=0;counter<data.length;counter++)
          {
            console.log(data[counter].name);
         $("#"+data[counter].name).on("click", function(e) {
          
           cartArrayRoom.push(e.toElement.id);
           cartArrayRoom1.push(e.toElement.id+"cart");
           
           console.log("I am in tab room"+cartArrayRoom);
         });
       }

          }
          
      });   
        });
 
 
});

function cartRefresh1(data){
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
          $('#amount').text('Total Amount: '+total).append(' <i class="fa fa-inr" aria-hidden="true"></i>');

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
           console.log("I am in cart food"+cartArray);
           cartRefresh1(data);
           
         });
       }
         
}

function cartRefresh2(data){
  var showDataOnCart=[];
      var showDataOnCartMrp=[];  
      var showDataOnCartId=[];    
      var dataCount=[];
      var dataFinalMrp=[]; 
      var total=0;
  for(var counter=0;counter<data.length;counter++)
          {
             if(cartArrayRoom.indexOf(data[counter].name)!=-1)
             {
              showDataOnCart.push(data[counter].name);
              showDataOnCartId.push(data[counter].id);
              showDataOnCartMrp.push(data[counter].price);
             }
          }
          console.log(showDataOnCartId);
           for(var counter=0;counter<showDataOnCart.length;counter++)
          {
          var count = cartArrayRoom.reduce(function(n, val) {
    return n + (val === showDataOnCart[counter]);
}, 0);
          dataCount[counter]=count;
          dataFinalMrp[counter]=count*showDataOnCartMrp[counter];
          }
          console.log(dataCount);

          inventoryIdRoom=showDataOnCartId.toString();
          inventoryUnitsRoom=dataCount.toString();

          for(var counter=0;counter<showDataOnCart.length;counter++)
          {
          
          $("#listCart2").append("<article><div class='author'><img src='assets/img/inventory/"+showDataOnCart[counter]+".jpg' alt=''/><span >"+showDataOnCart[counter]+"<br /><i class='fa fa-inr'>"+dataFinalMrp[counter]+"</i></span></div><div class='buttons'><label>"+dataCount[counter]+"</label><a href='#''><span id="+showDataOnCart[counter]+"cart"+" class='fa fa-minus'></span></a></div></article></br></br></br>");
          
          }

          for(var counter=0;counter<dataFinalMrp.length;counter++)
          {
            total=total+dataFinalMrp[counter];
          }
          $('#amount2').text('Total Amount: '+total).append(' <i class="fa fa-inr" aria-hidden="true"></i>');

for(var counter=0;counter<showDataOnCart.length;counter++)
          {
            console.log("For");
         $("#"+showDataOnCart[counter]+"cart").on("click", function(e) {
           console.log("For1");
           var index = cartArrayRoom1.indexOf(e.toElement.id);
           console.log(e.toElement.id);
           if (index > -1) {
           cartArrayRoom.splice(index, 1);
           cartArrayRoom1.splice(index, 1);
           
           }
           $("#listCart2").empty();
           console.log("I am in cart Room"+cartArrayRoom);
           cartRefresh2(data);
           
         });
       }
         
}


function cartRefresh3(data){
  var showDataOnCart=[];
      var showDataOnCartMrp=[];  
      var showDataOnCartId=[];    
      var dataCount=[];
      var dataFinalMrp=[]; 
      var total=0;
  for(var counter=0;counter<data.length;counter++)
          {
             if(cartArrayTaxi.indexOf(data[counter].name)!=-1)
             {
              showDataOnCart.push(data[counter].name);
              showDataOnCartId.push(data[counter].id);
              showDataOnCartMrp.push(data[counter].rate_per_trip);
             }
          }
          console.log(showDataOnCartId);
           for(var counter=0;counter<showDataOnCart.length;counter++)
          {
          var count = cartArrayTaxi.reduce(function(n, val) {
    return n + (val === showDataOnCart[counter]);
}, 0);
          dataCount[counter]=count;
          dataFinalMrp[counter]=count*showDataOnCartMrp[counter];
          }
          console.log(dataCount);

          inventoryIdTaxi=showDataOnCartId.toString();
          inventoryUnitsTaxi=dataCount.toString();

          for(var counter=0;counter<showDataOnCart.length;counter++)
          {
          
          $("#listCart3").append("<article><div class='author'><img src='assets/img/inventory/"+showDataOnCart[counter]+".jpg' alt=''/><span >"+showDataOnCart[counter]+"<br /><i class='fa fa-inr'>"+dataFinalMrp[counter]+"</i></span></div><div class='buttons'><label>"+dataCount[counter]+"</label><a href='#''><span id="+showDataOnCart[counter]+"cart"+" class='fa fa-minus'></span></a></div></article></br></br></br>");
          
          }

          for(var counter=0;counter<dataFinalMrp.length;counter++)
          {
            total=total+dataFinalMrp[counter];
          }
          $('#amount3').text('Total Amount: '+total).append(' <i class="fa fa-inr" aria-hidden="true"></i>');

for(var counter=0;counter<showDataOnCart.length;counter++)
          {
            console.log("For");
         $("#"+showDataOnCart[counter]+"cart").on("click", function(e) {
           console.log("For1");
           var index = cartArrayTaxi1.indexOf(e.toElement.id);
           console.log(e.toElement.id);
           if (index > -1) {
           cartArrayTaxi.splice(index, 1);
           cartArrayTaxi1.splice(index, 1);
           
           }
           $("#listCart3").empty();
           console.log("I am in cart Room"+cartArrayTaxi);
           cartRefresh3(data);
           
         });
       }
         
}

