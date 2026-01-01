let score = 0;
let time = 15 * 60;
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
    timer = setInterval(()=>{
        let min = Math.floor(time / 60);
        let sec = time % 60;
        document.getElementById("time").innerText =
            `${min}:${sec < 10 ? "0"+sec : sec}`;
        time--;
        if(time < 0){
            clearInterval(timer);
            submitQuiz();
        }
    },1000);
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
    let today = new Date().toLocaleDateString();

    if(score >= 8){
        passCert.classList.remove("hide");
        passName.innerText = studentName.value;
        passScore.innerText = `Score: ${score} / 15`;
        passDate.innerText = today;
    }else{
        failCert.classList.remove("hide");
        failName.innerText = studentName.value;
        failScore.innerText = `Score: ${score} / 15`;
        failDate.innerText = today;
    }
}

function downloadPDF(id, filename){
    html2pdf().from(document.getElementById(id)).save(filename + ".pdf");
}
