document.addEventListener("DOMContentLoaded", function () {
    var studentAttendance = [];
    const studentIDs = {
        "S407874": "Zachary DeLawyer",
        "S405356": "Caleb Sterbenz",
        "S406095": "McKenzie Haefner",
        "S406890": "Branson Bottorff",
        "S413007": "Jason Priah",
        "S406472": "Sam Kalume",
        "S406783": "Kenstad Jackson",
        "S406112": "Tony Torres",
        "S405187": "Emily Eikenberry"
    };
    var containerCount = 3;
    var currentContainerIndex = 0;
    var scannedNames = [];
    var textBox = document.getElementById("textbox");

    function submitData() {
        var textBoxValue = document.getElementById("textbox").value.trim();

        if (textBoxValue !== "") {
            // Check if entered value is a valid student ID
            if (studentIDs.hasOwnProperty(textBoxValue)) {
                var studentName = studentIDs[textBoxValue];

                // Check if the student has already been scanned
                if (scannedNames.indexOf(studentName) === -1) {
                    // Proceed to add the name to the containers
                    insertIntoContainers(studentName);
                    scannedNames.push(studentName);

                    // Hide the error messages
                    hideErrorMessage();
                } else {
                    // Show error message for duplicate scan.
                    showErrorMessage("STUDENT ALREADY SCANNED");
                }

            } else {
                // Show error message for invalid student ID.
                showErrorMessage("STUDENT NOT IN ROSTER");
            }

            document.getElementById("textbox").value = "";
        } else {
            // Value is empty, show the error message.
            showErrorMessage("ENTER A VALID STUDENT ID");
        }
    }

    function insertIntoContainers(studentName) {
        var containerId = "container" + (currentContainerIndex + 1);
        var container = document.getElementById(containerId);
        var listItem = document.createElement("div");
        listItem.textContent = studentName;
        container.appendChild(listItem);

        // Increment the container index and wrap around if necessary
        currentContainerIndex = (currentContainerIndex + 1) % containerCount;
    }

    function showErrorMessage(message) {
        var errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = message; // Set the error message content
        errorMessage.style.display = "block";
    }

    function hideErrorMessage() {
        var errorMessage = document.getElementById("errorMessage");
        if (errorMessage.style.display === "block") {
            errorMessage.style.display = "none";
        }
    }

    function exportData() {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Months are 0-based, so we add 1.
        var year = currentDate.getFullYear();
    
        // Format the date as "MM-DD-YYYY" (e.g., 11-02-2023).
        var formattedDate = (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day + "-" + year;
    
        var csv = scannedNames.join("\n"); // Use scannedNames array instead of studentAttendance
        var blob = new Blob([csv], { type: "text/csv" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
    
        // Set the download attribute with the formatted date in the filename.
        link.download = formattedDate + "_attendance.csv";
    
        link.click();
    }

    textBox.addEventListener("blur", function () {
        // Set the focus back to the text box when it loses focus
        textBox.focus();
    });

    document.getElementById("textbox").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default form submission
            submitData();
        }
    });

    document.getElementById("exportBtn").addEventListener("click", function () {
        exportData();
    });
});