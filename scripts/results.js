const scoreTag = document.querySelector("#score");

const score = localStorage.getItem("userScore");
scoreTag.innerHTML = `Your score is: ${score}`;
console.log(score);
