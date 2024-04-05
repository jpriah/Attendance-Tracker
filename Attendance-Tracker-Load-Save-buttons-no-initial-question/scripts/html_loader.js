
function loadHTMLPage(url, targetElementId) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = html;
        } else {
            throw new Error(`Target element with id ${targetElementId} not found`);
        }
    })
    .catch(error => {
        console.error('There was a problem fetching the HTML page:', error);
    });
}