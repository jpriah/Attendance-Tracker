var questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Rome', correct: false }
        ]
    },
    // Add more questions as needed
];

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
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionTextElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    // You can add more logic here, e.g., check if the answer is correct
    // For simplicity, let's just move to the next question
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        // Quiz finished
        alert('Quiz finished!');
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

function updateSidebar() {
    questionList.innerHTML = '';

    questions.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = question.question;
        listItem.addEventListener('click', () => loadQuestionForEdit(index));
        questionList.appendChild(listItem);
    });
}

function loadQuestionForEdit(index) {
    currentQuestionIndex = index;
    showQuestion(questions[currentQuestionIndex]);

    // Populate the edit form with the current question's details
    editedQuestionInput.value = questions[currentQuestionIndex].question;
    editedAnswersInput.value = questions[currentQuestionIndex].answers.map(answer => answer.text).join(', ');

    // Show the edit form
    editQuestionForm.style.display = 'block';
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
    questions[currentQuestionIndex].answers = editedAnswersInput.value.split(',').map(answer => ({ text: answer.trim(), correct: false }));

    // Hide the edit form
    editQuestionForm.style.display = 'none';

    // Refresh the sidebar
    updateSidebar();
}

updateSidebar();