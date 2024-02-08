const questions=[
    {
        question : "Who invented C++ ?" ,
        answers:[
            {text : "Edward Lewis" , correct : "false"} , 
            {text : "Linus Torvalds" , correct : "false"},
            {text : "Bill gates" , correct : "false"},
            {text : "Bjarne Stroustrup" , correct : "true"} 
        ]
    },
    {
        question : "Datatypes are classified in how many types in Javascript" ,
        answers:[
            {text : "One" , correct : "false"} , 
            {text : "Two" , correct : "true"},
            {text : "Three" , correct : "false"},
            {text : "Four" , correct : "false"} 
        ]
    },
    {
        question : "Is HTML case sensitive? " ,
        answers:[
            {text : "Yes" , correct : "false"} , 
            {text : "No" , correct : "true"},
            {text : "Can't say" , correct : "false"},
            {text : "Sometimes case sensitive and sometime insensitive" , correct : "false"} 
        ]
    },
    {
        question : "Python developed by " ,
        answers:[
            {text : "Guido van Rossum" , correct : "true"} , 
            {text : "Leonardo da Sapphire" , correct : "false"},
            {text : "Archies Hayden" , correct : "false"},
            {text : "Charles Babbage" , correct : "false"} 
        ]
    }

]
const questionElement = document.getElementById("question") ; 
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn"); 


let currentQuestionIndex = 0 ; 
let score = 0 ;

function startQuiz(){
    currentQuestionIndex = 0 ; 
    score = 0 ; 
    nextButton.innerHTML = "Next" ; 
    showQuestion() ; 
}

function showQuestion(){
    resetState() ; 
    let currentQuestion = questions[currentQuestionIndex] ; 
    let questionNo = currentQuestionIndex + 1 ; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question ;

    currentQuestion.answers.forEach(answer=>
        {
            const button = document.createElement("button"); 
            button.innerHTML = answer.text;
            button.classList.add("btn") ;
            answerButton.appendChild(button) ; 
            if(answer.correct){
                button.dataset.correct = answer.correct ; 
            }
            //answerButton.appendChild(button) ;
            button.addEventListener("click" , selectAnswer ) ; 
        });
}
function resetState(){
    nextButton.style.display  = "none" ; 

    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn = e.target ; 
    const isCorrect = selectedBtn.dataset.correct === "true" ; 
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score +=1; 
    }
    else 
    {
        selectedBtn.classList.add("incorrect") ; 
    }

    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct") ; 
        }
        button.disabled = true ; 
    });
    nextButton.style.display = "block" ; 
}
function showScore(){
    resetState() ; 
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again" ; 
    nextButton.style.display = "block" ; 
}

function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length){
        showQuestion() ; 
    }
    else {
        showScore() ; 
    }
}
nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton() ; 
    }
    else {
        startQuiz() ; 
    }
});
startQuiz() ; 