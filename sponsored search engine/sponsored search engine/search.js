var keys = ['cars', 'puppies', 'music']
var accepted_terms = []
var complete_results = []

$("#button").on("click", function(e){
    var ct = 0
    terms = $("#search").val().split(" ")

    $(".res").remove()
    accepted_terms = []
    complete_results = []

    for (i in terms){
        var tmpTerm = terms[i]
        if(tmpTerm == keys[0] || tmpTerm == keys[1] || tmpTerm == keys[2])
            accepted_terms.push(tmpTerm)
    }

   
    for ( i in accepted_terms){
        $.getJSON(accepted_terms[i] + ".json").done(function(data){
            for(i in data){
                complete_results.push(data[i])
            }
            ++ct

            if(ct == accepted_terms.length){

                complete_results.sort(function(a,b){
                    return a.score - b.score
                })

                for(i in complete_results){
                    template = $("#results").clone()
                    template.find("a").text(complete_results[i].title).attr("href", complete_results[i].url)
                    template.find(".url").text(complete_results[i].url)
                    template.find(".url").next().text(complete_results[i].score)
                    template.find(".excerpt").text(complete_results[i].excerpt)
                    template.removeAttr("id")
                    template.removeClass("display-none")
                    template.addClass("res")
                    template.insertAfter("#results")
                }
            }
        })
    }

    

    e.preventDefault()
})

