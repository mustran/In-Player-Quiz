const username = document.querySelector("#username");
const submitScore = document.querySelector("#submitScore");
const scores = document.querySelector("#scores");

let allUsers = JSON.parse(localStorage.getItem("users"));

if (allUsers == null) {
    localStorage.setItem("users", JSON.stringify([]));
    allUsers = [];
}

let userAndScore = {
    username: null,
    score: localStorage.getItem("userScore")
};

displayScoresSorted();

submitScore.addEventListener("click", event => {
    event.preventDefault();
    userAndScore.username = username.value;

    //store the username if it is not empty
    if (username.value !== "") {
        allUsers.push(userAndScore);
        localStorage.setItem("users", JSON.stringify(allUsers));
        username.disabled = true;
        username.value = "";
    }
    displayScoresSorted();
});

function displayScoresSorted() {
    let displayScores;
    let allScores = JSON.parse(localStorage.getItem("users")).sort((a, b) => b.score - a.score);
    if (allScores.length == 0) {
        displayScores = `<h1>The are no scores</h1>`;
    } else {
        displayScores = `
        <ul class="list-group">
        ${allScores
            .map(
                (user, index) =>
                    `<li  class="list-group-item d-flex justify-content-between align-items-center">${index +
                        1}. ${user.username} <span class="badge badge-primary badge-pill">${
                        user.score
                    }</span></li>`
            )
            .join(" ")}
        </ul>
        `;
    }
    scores.innerHTML = displayScores;
}
