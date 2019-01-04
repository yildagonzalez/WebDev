//solution for problem 1
$("#wishes").text("I hate you, Bob.")

//solution for problem 2
$("#chicken").attr("src","https://i.ytimg.com/vi/oMQI0bJJOvM/hqdefault.jpg")

//solution for problem 3
$(".otters").find("img").css("width", 300)

//solution for problem 4
$(".btn").click(function(){
    $("#changeMe").css("color", "red")
    $("#changeMe").css("font-size", "2rem")
})

//solution for problem 5
$("#hide").click(function(){
    $("span").removeClass("hidden")
})

//solution for problem 6
$(".menu").hover(function(){
    $(this).css("border", "solid 3px yellow")
}, function(){
    $(this).css("border", "none")
})

//solution for problem 7
$("#first").keyup(function(){
    var value = $(this).val()
    $("#second").val(value)
})

//solution for problem 8
$("#tab").blur(function(){
    $("#tab").val("HAHA")
})

//solution for problem 9
$(":checkbox").next().prop("disabled", true)
$(":checkbox").click(function(){
    if($(this).prop("checked") == false)
        $(this).next().prop("disabled", true)
    else
        $(this).next().prop("disabled", false)
})

//solution for problem 10
$("#date").blur(function(){
    d = $(this).val()
    var newD = moment(d).format("MM/DD/YYYY")
    $(this).val(newD)
})