const questions =[
    {
        question: 'What is the smallest continent in the world?',
        answers: [
            {text: 'Asia', correct: false},
            {text: 'Australia', correct: true},
            {text: 'Arctic', correct: false},
            {text: 'Africa', correct: false},
        ]
    }, 
    {
        question: "Which planet is known as the Red Planet?",
        answers:[
            {text: 'Earth', correct: false},
            {text: 'Mars', correct: true},
            {text: 'Jupiter', correct: false},
            {text: 'Saturn', correct: false}
        ]
    }, 
    {
        question: 'What is the largest mammal in the world?',
        answers: [
            {text: 'Elephant', correct: false},
            {text: 'Blue Whale', correct: true},
            {text: 'Giraffe', correct: false},
            {text: 'Hippopotamus', correct: false},
        ]
    }, 
    {
        question: "Which element has the chemical symbol 'O'?",
        answers:[
            {text: 'Oxygen', correct: true},
            {text: 'Gold', correct: false},
            {text: 'Osmium', correct: false},
            {text: 'Iron', correct: false},
        ]
    }, 
];


const questionElement = document.querySelector('.question')
const answer_buttons = document.querySelector('.answer-buttons')
const nextButton = document.querySelector('.btn-next')

let currentQuestionIndex = 0
let score = 0


function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.style.display = 'block'
    showAnswers()
}

function showAnswers(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let currentQuestionNo = currentQuestionIndex + 1
    questionElement.innerHTML = currentQuestionNo + '. ' +  currentQuestion.question

    //button answer
    currentQuestion.answers.forEach((answer)=>{
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answer_buttons.appendChild(button)
        
        button.dataset.correct = answer.correct

        button.onclick = (e)=>{
            const selectBtn = e.target
            const isCorrect = selectBtn.dataset.correct === 'true'
            if(isCorrect){
                button.classList.add('correct')
                score++
            }else{
                button.classList.add('incorrect')
            }

            Array.from(answer_buttons.children).forEach((nut)=>{
                if(nut.dataset.correct === 'true'){
                    nut.classList.add('correct')
                }
                nut.disabled = true
            });
            nextButton.style.display = 'block'
        }
    })
}

function showScore(){
    resetState()
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}! `
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block'
}

function handlNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showAnswers()
    }else{
        showScore()
    }
}

nextButton.onclick = ()=>{
    if(currentQuestionIndex < questions.length){
        handlNextButton()
    }else{
        startQuiz()
    }
}

function resetState(){
    nextButton.style.display = 'none'
    while(answer_buttons.firstChild){
        answer_buttons.removeChild(answer_buttons.firstChild)
    }
}

startQuiz()