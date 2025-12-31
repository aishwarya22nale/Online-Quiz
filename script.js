let score = 0;
let timeLeft = 300;
let timer;

function startQuiz(){
    if(studentName.value === ""){
        alert("Enter your name");
        return;
    }
    login.classList.add("hide");
    quiz.classList.remove("hide");
    startTimer();
}

function startTimer(){
    timer = setInterval(() => {
        timeLeft--;
        time.innerText = timeLeft;

        if(timeLeft <= 0){
            clearInterval(timer);
            alert("Time Over!");
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz(){
    clearInterval(timer);
    score = 0;

    const answers = {
        q1:"a", q2:"c", q3:"b", q4:"b", q5:"a",
        q6:"a", q7:"a", q8:"b", q9:"a", q10:"a",
        q11:"d", q12:"b", q13:"b", q14:"b", q15:"c"
    };

    for(let q in answers){
        if(document.querySelector(`input[name="${q}"]:checked`)?.value === answers[q]){
            score++;
        }
    }

    quiz.classList.add("hide");
    result.classList.remove("hide");
    scoreText.innerText = `Score: ${score} / 15`;
}

function generateCertificate(){
    result.classList.add("hide");
    cert.classList.remove("hide");

    certName.innerText = studentName.value;
    certScore.innerText = `Score: ${score} / 15`;
    certDate.innerText = new Date().toLocaleDateString();

    certStatus.innerText = score >= 8 ? "✔ PASSED" : "❌ FAILED";
}
