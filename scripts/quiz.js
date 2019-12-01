const choiceOptions = document.querySelector(".choice");
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

generateRandomQuestions = questions => {
    let questionsLength = questions.length;

    //pick a random question
    const index = Math.floor(Math.random() * questionsLength);
    const questionPickedRandomly = questions[index];

    questionText.innerHTML = questionPickedRandomly.question;
};
