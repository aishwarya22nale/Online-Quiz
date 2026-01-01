let studentName = "";
let timeLeft = 120; // 2 minutes
let timerInterval;

// Correct answers
const answers = {
    q1: "a",
    q2: "c",
    q3: "b",
    q4: "b",
    q5: "a",
    q6: "a",
    q7: "a",
    q8: "b",
    q9: "a",
    q10: "a",
    q11: "d",
    q12: "b",
    q13: "b",
    q14: "b",
    q15: "b"
};

// Start Quiz
function startQuiz() {
    studentName = document.getElementById("studentName").value;
    if (studentName === "") {
        alert("Please enter your name");
        return;
    }

    document.getElementById("login").classList.add("hide");
    document.getElementById("quiz").classList.remove("hide");

    startTimer();
}

// Timer
function startTimer() {
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        document.getElementById("time").innerText =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
        timeLeft--;
    }, 1000);
}

// Submit Quiz
function submitQuiz() {
    clearInterval(timerInterval);

    let score = 0;
    let total = Object.keys(answers).length;

    for (let q in answers) {
        let selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) {
            score++;
        }
    }

    document.getElementById("quiz").classList.add("hide");
    document.getElementById("result").classList.remove("hide");

    document.getElementById("scoreText").innerText =
        `Hello ${studentName}, You scored ${score} out of ${total}`;

    // Certificate data
    document.getElementById("certName").innerText = studentName;
    document.getElementById("certScore").innerText =
        `Score: ${score} / ${total}`;

    document.getElementById("certStatus").innerText =
        score >= 8 ? "Status: PASS" : "Status: FAIL";

    document.getElementById("certDate").innerText =
        new Date().toLocaleDateString();
}

// Show Certificate
function generateCertificate() {
    document.getElementById("result").classList.add("hide");
    document.getElementById("cert").classList.remove("hide");
}

// Download Certificate
function downloadCertificate() {
    html2canvas(document.getElementById("certificateArea")).then(canvas => {
        let link = document.createElement("a");
        link.download = "certificate.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
