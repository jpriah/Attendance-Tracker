var questions = [];

var currentQuestionIndex = 0;

var questionTextElement = document.getElementById('question-text');
var answerButtonsElement = document.getElementById('answer-buttons');

var sidebar = document.getElementById('sidebar');
var questionList = document.getElementById('question-list');

var editQuestionForm = document.getElementById('edit-question-form');
var editedQuestionInput = document.getElementById('edited-question');
var editedAnswersInput = document.getElementById('edited-answers');

function startQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0; // Reset correctAnswersCount
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionTextElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.classList.add('correct-answer'); // Add a class to highlight correct answer
        }
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

var correctAnswersCount = 0; // Variable to store the count of correct answers

function selectAnswer(answer) {
    // Check if the selected answer is correct and the quiz hasn't finished
    if (answer.correct && currentQuestionIndex < questions.length) {
        correctAnswersCount++; // Increment correctAnswersCount if the selected answer is correct
    }

    // Move to the next question
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        // Quiz finished
        alert('Quiz finished! You got ' + correctAnswersCount + ' out of ' + questions.length + ' correct answers.');
        // You can add more actions or redirect to another page
    }
}

function nextQuestion() {
    selectAnswer(); // For now, just move to the next question when the 'Next' button is clicked
}

// Start the quiz when the page loads
startQuiz();

function toggleCreateQuestionForm() {
    const formContainer = document.getElementById('create-question-form');
    formContainer.style.display = (formContainer.style.display === 'none' || formContainer.style.display === '') ? 'block' : 'none';
}

function addCustomQuestion(event) {
    event.preventDefault();

    const customQuestionInput = document.getElementById('custom-question');
    const customAnswersInput = document.getElementById('custom-answers');

    const newQuestion = {
        question: customQuestionInput.value,
        answers: customAnswersInput.value.split(',').map(answer => ({ text: answer.trim(), correct: false }))
    };

    questions.push(newQuestion);
    customQuestionInput.value = '';
    customAnswersInput.value = '';
    
    // If it's the first custom question, start the quiz
    if (currentQuestionIndex === questions.length - 1) {
        startQuiz();
    }
}

// Function to update the sidebar with questions
function updateSidebar() {
    questionList.innerHTML = '';

    questions.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.addEventListener('click', () => loadQuestionForEdit(index));
        const orderedAnswerListItem = document.createElement('ol');
        orderedAnswerListItem.setAttribute('type', 'a')
        listItem.textContent = question.question;
        listItem.addEventListener('click', () => loadQuestionForEdit(index));
        question.answers.forEach((answers, index) => {
            const answerListItem = document.createElement('li');
            answerListItem.textContent = answers["text"];
            orderedAnswerListItem.appendChild(answerListItem)
        });
        if (currentQuestionIndex !== index) {
            if (question.answers.some(answer => answer.correct)) {
                button.classList.add('correct-answer'); // Add 'correct-answer' class if the question has a correct answer
            }
        }
        listItem.appendChild(orderedAnswerListItem)
        questionList.appendChild(listItem);
    });
}

function loadQuestionForEdit(index) {
    currentQuestionIndex = index;
    showQuestion(questions[currentQuestionIndex]);

    // Populate the edit form with the current question's details
    editedQuestionInput.value = questions[currentQuestionIndex].question;
    
    // Display answers with asterisk for the correct answer in the edit form
    const editedAnswers = questions[currentQuestionIndex].answers.map(answer => {
        return answer.correct ? answer.text + '*' : answer.text;
    }).join(', ');
    editedAnswersInput.value = editedAnswers;

    // Show the edit form
    editQuestionForm.style.display = 'block';

    // Attach event listener to the "Save Changes" button
    const saveChangesButton = document.querySelector('#edit-question-form button[type="submit"]');
    saveChangesButton.addEventListener('click', saveEditedQuestion);
}

function addCustomQuestion(event) {
    event.preventDefault();

    const customQuestionInput = document.getElementById('custom-question');
    const customAnswersInput = document.getElementById('custom-answers');

    // Split the input into answers
    const answersArray = customAnswersInput.value.split(',');
    
    // Initialize an array to store parsed answers
    const parsedAnswers = [];

    // Loop through each answer
    answersArray.forEach(answer => {
        // Trim the answer text
        const trimmedAnswer = answer.trim();
        
        // Check if the answer ends with an asterisk
        const isCorrect = trimmedAnswer.endsWith('*');
        
        // Remove the asterisk and trim again if present
        const answerText = isCorrect ? trimmedAnswer.slice(0, -1).trim() : trimmedAnswer;

        // Push the answer object to the parsedAnswers array
        parsedAnswers.push({ text: answerText, correct: isCorrect });
    });

    // Create the new question object
    const newQuestion = {
        question: customQuestionInput.value,
        answers: parsedAnswers
    };

    // Add the new question to the questions array
    questions.push(newQuestion);

    // Clear input fields
    customQuestionInput.value = '';
    customAnswersInput.value = '';
    
    // Update the sidebar with the new question
    updateSidebar();
    
    // If it's the first custom question, start the quiz
    if (currentQuestionIndex === questions.length - 1) {
        startQuiz();
    }
}

function saveEditedQuestion(event) {
    event.preventDefault();

    // Update the current question with the edited details
    questions[currentQuestionIndex].question = editedQuestionInput.value;

    // Extract answers from the editedAnswersInput
    const editedAnswers = editedAnswersInput.value.split(',').map(answer => ({ text: answer.trim().replace(/\*$/, ''), correct: answer.trim().endsWith('*') }));

    // Update the answers array of the current question
    questions[currentQuestionIndex].answers = editedAnswers;

    // Hide the edit form
    editQuestionForm.style.display = 'none';

    // Refresh the sidebar
    updateSidebar();

    // Show the updated question in the view questions section
    showQuestion(questions[currentQuestionIndex]);
}

function updateViewQuestions() {
    const viewQuestionsButtons = document.querySelectorAll('#question-list li button');
    viewQuestionsButtons[currentQuestionIndex].classList.remove('correct-answer'); // Remove previous correct-answer class
    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        if (answer.correct) {
            viewQuestionsButtons[currentQuestionIndex].classList.add('correct-answer'); // Add correct-answer class to the new correct answer
        }
    });
}

function loadQuestionForEdit(index) {
    currentQuestionIndex = index;
    showQuestion(questions[currentQuestionIndex]);

    // Populate the edit form with the current question's details
    editedQuestionInput.value = questions[currentQuestionIndex].question;

    // Clear previous content of editedAnswersInput
    editedAnswersInput.value = '';

    // Display answers with asterisk for the correct answer in the edit form
    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const asterisk = answer.correct ? '*' : '';
        editedAnswersInput.value += answer.text + asterisk + (index !== questions[currentQuestionIndex].answers.length - 1 ? ', ' : '');
    });

    // Show the edit form
    editQuestionForm.style.display = 'block';

    // Attach event listener to the "Save Changes" button
    const saveChangesButton = document.querySelector('#edit-question-form button[type="submit"]');
    saveChangesButton.addEventListener('click', function(event) {
        saveEditedQuestion(event);
        updateViewQuestions();
    });
}

function saveQuiz() {
    // Convert questions array to JSON string
    const jsonData = JSON.stringify(questions);

    // Create a Blob object with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set link properties
    link.href = url;
    link.download = 'quiz_data.json'; // Specify filename

    // Append the link to the document body
    document.body.appendChild(link);

    // Simulate a click on the link to trigger the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);

    // Revoke the URL to release the resources
    URL.revokeObjectURL(url);
}

function loadQuiz() {
    // Create an input element of type file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json'; // Allow only JSON files

    // Trigger a click event on the input element
    input.click();

    // Add event listener to handle file selection
    input.addEventListener('change', function() {
        // Get the selected file
        const file = input.files[0];

        // Create a file reader
        const reader = new FileReader();

        // Define event listener to handle file reading
        reader.onload = function(event) {
            // Parse the JSON data
            const jsonData = event.target.result;
            const parsedData = JSON.parse(jsonData);

            // Update questions array with loaded data
            questions = parsedData;

            // Refresh the sidebar with loaded questions
            updateSidebar();

            // Optionally, you can start the quiz immediately
            startQuiz();
        };

        // Read the file as text
        reader.readAsText(file);
    });
}

updateSidebar();