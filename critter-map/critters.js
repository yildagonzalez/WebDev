
var imgs = { 0 : "http://animalcontrolphx.com/wp-content/uploads/2013/05/gophers-400.jpg",
             1 : "https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/Q-Z/wolverine-crouching.adapt.945.1.jpg",
             2 : "https://www.waikikiaquarium.org/wp-content/uploads/2013/11/octopus_620.jpg"
           }


$("select").change(function(){
  $("select option:selected").each(function(){
   
    var selected_critter = $("select option:selected").val()
    if(selected_critter != "null"){ 
      $(".current-critter").remove()
      /* on trigger, make ajax call to get image coordinates*/
      $.ajax({url:"data"+selected_critter+".js",
              dataType: "json",
              success: function(items){
                //data parsed
                console.log(items)
                for (x=y=0 ; x < items.length; x++, y++){
                  //create new <img> tag each time
                  //add css attributes based on coordinates
                  new_critter = $("<img>")
                  new_critter.addClass("current-critter")
                  new_critter.attr("src", imgs[selected_critter])
                  new_critter.css("height", "50px")
                  new_critter.css("width", "50px")
                  new_critter.css("position", "absolute")
                  new_critter.css("left", items[x][0])
                  new_critter.css("top", items[y][1])
                  $("#critters").append(new_critter)

                  console.log("x: " + items[x][0] + ", " + "y: " + items[y][1])
                }
              }    
    })

    }
    
  })
})




