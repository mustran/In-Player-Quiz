const choiceOptions = document.querySelectorAll(".choice");
const questionText = document.querySelector("#questionText");
const countQuestionsTag = document.querySelector("#countQuestions");

let questions = [];
//get data
async function getDataset() {
    let response = await fetch("../data/questions.json");
    let data = response.json();
    return data;
}

getDataset().then(data => {
    questions = data;
    generateRandomQuestions(questions);
});

// we need the correct answer after we randomly pick a question
let correctAnswer;

generateRandomQuestions = questions => {
    let questionsLength = questions.length;

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
            elementTag.classList.add("btn-success");
            setTimeout(() => {
                generateRandomQuestions(questions);
                elementTag.classList.remove("btn-success");
            }, 800);
        }
    });
});
