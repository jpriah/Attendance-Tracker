
function loadHTMLPage(viewName, targetElement) {
    $.ajax({
        url: viewName,
        dataType: 'html',
        success: function(data) {
            $(targetElement).empty();
            $(targetElement).append(data);
        },
        error: function(xhr, status, error) {
            console.error('Error loading partial view:', error);
        }
    });

}

function reloadScript(scriptSrc) {
    $('script[src="' + scriptSrc + '"]').remove(); // Remove existing script tag
    $('<script>').attr('src', scriptSrc).appendTo('head'); // Append new script tag
}

