let score = 0;
let timeLeft = 2 * 60; // 2 minutes
let timer;

function startQuiz() {
    if (studentName.value === "") {
        alert("Please enter your name");
        return;
    }
    login.classList.add("hide");
    quiz.classList.remove("hide");
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        document.getElementById("time").innerText =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            alert("Time is up! Quiz submitted automatically.");
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    clearInterval(timer);
    score = 0;

    const answers = {
        q1: "a", q2: "c", q3: "b", q4: "b", q5: "a"
    };

    for (let q in answers) {
        if (document.querySelector(`input[name="${q}"]:checked`)?.value === answers[q]) {
            score++;
        }
    }

    quiz.classList.add("hide");
    result.classList.remove("hide");
    scoreText.innerText = `Score: ${score} / 5`;
}

function generateCertificate() {
    result.classList.add("hide");
    cert.classList.remove("hide");

    certName.innerText = studentName.value;
    certScore.innerText = `Score: ${score} / 5`;
    certDate.innerText = new Date().toLocaleDateString();

    certStatus.innerText = score >= 3 ? "✔ PASSED" : "❌ PARTICIPATED";
}

function downloadCertificate() {
    html2canvas(document.getElementById("certificateArea")).then(canvas => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
