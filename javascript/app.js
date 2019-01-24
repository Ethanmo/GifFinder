var pokemonList = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise"];

function generateButtons(){
    for (var i = 0; i < pokemonList.length; i++){
        var pokeButton = $("<button></button>", { class : 'pokeButton', text : pokemonList[i]});     
        $(".buttonDiv").append(pokeButton);
    }
}



function addNewButton(){
    var pokeButton = $("<button class='pokeButton'>" + document.getElementById("newButtonName").value + "</button>");
    document.getElementById("newButtonName").value = '';
    $(".buttonDiv").append(pokeButton);
} 

$(document).on("click", ".pokeButton", function() {
    console.log(this.innerText);
    $("#showGifs").empty();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + this.innerText + "&api_key=3itcSrORC9sQXeWCX83MVgKXtoKQqJ6x&limit=10";

    $.ajax({
        url : queryUrl,
        method : "GET"
    })
        .then(function(response){
            var results = response.data;
            
            for (var i = 0; i < results.length; i++){
                var pokeDiv = $("<div>");
                var ratingDiv = $("<p>").text("Rating: " + results[i].rating);
                var imageDiv = $("<img>");
                imageDiv.attr("src", results[i].images.fixed_height_still.url);
                imageDiv.attr("data-state", "still");
                imageDiv.attr("data-animate", results[i].images.fixed_height.url);
                imageDiv.attr("data-still", results[i].images.fixed_height_still.url);
                imageDiv.attr("class", "clickableGif");
                pokeDiv.append(ratingDiv);
                pokeDiv.append(imageDiv);
                $("#showGifs").append(pokeDiv);

            }
        })
})

$(document).on("click", ".clickableGif", function(){
    var state = $(this).attr('data-state');
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

})




generateButtons();