
const createQuiz = () => {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        if(questionNumber === 6){
            for(letter in currentQuestion.answers){

                answers.push(
                    `<label>
                    <input type="checkbox" id="question${questionNumber}" name="question${questionNumber}" value="${letter}" >
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
        } else {
            for(letter in currentQuestion.answers){

                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
        );

    });

    quizContainer.innerHTML = output.join('');
}

const showResults = () => {
    const answerContainers = quizContainer.querySelectorAll(".answers")

    let numCorrect = 0;
    const test = document.querySelectorAll("#question6")
console.log(test)

    myQuestions.forEach((currentQuestion, questionNumber) =>{
        const answerContainer = answerContainers[questionNumber];
        const select = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(select) || {}).value;


        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }


    })

    if(test[0].checked && test[2].checked && !test[1].checked && !test[3].checked){
        numCorrect++;
        answerContainers[6].style.color = 'lightgreen';
    } else {
        answerContainers[6].style.color = 'red';
    }

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.querySelector("#quiz");
const resultsContainer = document.querySelector("#results");
const submitBtn = document.querySelector("#submit");
const myQuestions = [
    // true or false
    {
        question: "question 1",
        answers: {
            a: "True",
            b: "False",
        },
        correctAnswer: "a",
    },
    {
        question: "question 2",
        answers: {
            a: "True",
            b: "False",
        },
        correctAnswer: "b"
    },
    {
        question: "question 3",
        answers: {
            a: "True",
            b: "False",
        },
        correctAnswer: "a"
    },
// 3 options
    {
        question: "question 4",
        answers: {
            a: "Option 1",
            b: "Option 2",
            c: "Option 3"
        },
        correctAnswer: "a"
    },
    {
        question: "question 5",
        answers: {
            a: "Option 1",
            b: "Option 2",
            c: "Option 3"
        },
        correctAnswer: "b"
    },
    {
        question: "question 6",
        answers: {
            a: "Option 1",
            b: "Option 2",
            c: "Option 3"
        },
        correctAnswer: "a"
    },
    //Multiple options
    {
        question: "question 7",
        answers: {
            a: "Option 1",
            b: "Option 2",
            c: "Option 3",
            d: "Option 4"
        },
        correctAnswer1: "a",
        correctAnswer2: "c"
    },

];

createQuiz();

submitBtn.addEventListener('click', showResults);