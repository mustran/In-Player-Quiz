const choiceOptions = document.querySelectorAll(".choice");
const questionText = document.querySelector("#questionText");
const countQuestionsTag = document.querySelector("#countQuestions");
const pointsTag = document.querySelector("#points");
const progressBar = document.querySelector("#progressBar");

let questions = [];
let questionsSize;
//get data
async function getDataset() {
    let response = await fetch("../data/questions.json");
    let data = response.json();
    return data;
}

getDataset().then(data => {
    questions = data;
    questionsSize = questions.length;
    generateRandomQuestions(questions);
});

// we need the correct answer after we randomly pick a question
let correctAnswer;

let questionsCounter = 0;

generateRandomQuestions = questions => {
    let questionsLength = questions.length;

    //no questions left here
    if (questionsLength <= 0) {
        //save user score in local storage
        localStorage.setItem("userScore", points);
        window.location.href = "../pages/results.html";
    }

    if (questionsLength !== 0) {
        questionsCounter++;
    }

    countQuestionsTag.innerHTML = `Question ${questionsCounter} of ${questionsSize}`;
    pointsTag.innerHTML = `${points} Points`;
    progressBar.style = `width: ${(questionsCounter / questionsSize) * 100}%`;

    //pick a random question
    const index = Math.floor(Math.random() * questionsLength);
    const questionPickedRandomly = questions[index];

    //question section
    questionText.innerHTML = questionPickedRandomly.question;

    //display question options
    choiceOptions.forEach((choice, index) => {
        choice.innerHTML = questionPickedRandomly.available_choices[index];
    });

    correctAnswer = questionPickedRandomly.correct_answer;

    //remove the picked question
    questions.splice(index, 1);
    console.log(questions);
};

let points = 0;

choiceOptions.forEach(el => {
    el.addEventListener("click", event => {
        let elementTag = event.target;
        let selectedChoice = event.srcElement.innerText;

        //animate red if the selected choice is wrong
        if (selectedChoice !== correctAnswer) {
            elementTag.classList.add("btn-danger");
            setTimeout(() => {
                generateRandomQuestions(questions);
                elementTag.classList.remove("btn-danger");
            }, 800);
        }
        //animate green color for the correct answer
        else {
            points += 1;
            elementTag.classList.add("btn-success");
            setTimeout(() => {
                generateRandomQuestions(questions);
                elementTag.classList.remove("btn-success");
            }, 800);
        }
    });
});
