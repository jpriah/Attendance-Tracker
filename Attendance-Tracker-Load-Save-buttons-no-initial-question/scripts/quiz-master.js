$(document).ready(function()
{
    $("#viewQ").click(function(){
        $("#view-questions").toggle();
        $("#multiChoiceBtn").toggle();
        $("#viewQ").toggle();
        $("#viewQBack").toggle();
    });

    $("#viewQBack").click(function(){
        $("#view-questions").toggle();
        $("#multiChoiceBtn").toggle();
        $("#viewQ").toggle();
        $("#viewQBack").toggle();
    });

    $("#backBtn").click(function(){
        loadHTMLPage('../partials/_MainMenu.html', '#container-contents');
    })

    $("#multiChoiceBtn").click(function(){
        loadHTMLPage('../partials/_MultipleChoice.html', '#container-contents');
    })

    $("#container-contents").on(change)

    
});