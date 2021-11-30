const darkmodeBtn = document.querySelector("#darkmodeBtn")

darkmodeBtn.addEventListener("click", () => {
    let element = document.body
    element.classList.toggle("dark-mode")
})

const createQuiz = () => {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        if (questionNumber === 6) {
            for (letter in currentQuestion.answers) {

                answers.push(
                    `<label>
                    <input type="checkbox" name="question${questionNumber}" value="${letter}" >
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
        } else {
            for (letter in currentQuestion.answers) {

                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
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
    const multipleAnswer = document.querySelectorAll(`[name="question6"]`)

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const select = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(select) || {}).value;


        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
        }


    })

    if (multipleAnswer[0].checked && multipleAnswer[2].checked && !multipleAnswer[1].checked && !multipleAnswer[3].checked) {
        numCorrect++;
    }

    if (numCorrect === 7) {
        resultsContainer.style.color = "green"
    } else if (numCorrect > 7 / 2) {
        resultsContainer.style.color = "orange"
    } else {
        resultsContainer.style.color = "red"
    }



    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.querySelector("#quiz");
const resultsContainer = document.querySelector("#results");
const submitBtn = document.querySelector("#submit");
const myQuestions = [
    // true or false
    {
        question: "There are over 2,500 stars on the Hollywood Walk of Fame",
        answers: {
            a: "True",
            b: "False",
        },
        correctAnswer: "a",
    },
    {
        question: "Goldfish only have a memory of three seconds ",
        answers: {
            a: "True",
            b: "False",
        },
        correctAnswer: "b"
    },
    {
        question: "Flying in an aeroplane is statistically safer than driving in a car",
        answers: {
            a: "True",
            b: "False",
        },
        correctAnswer: "a"
    },
    // 3 options
    {
        question: "How many time zones are there in Russia?",
        answers: {
            a: "11",
            b: "8",
            c: "1"
        },
        correctAnswer: "a"
    },
    {
        question: "How many stripes are there in the US flag?",
        answers: {
            a: "11",
            b: "8",
            c: "13"
        },
        correctAnswer: "c"
    },
    {
        question: "What country has the most islands in the world?",
        answers: {
            a: "USA",
            b: "Sweden",
            c: "Russia"
        },
        correctAnswer: "b"
    },
    //Multiple options
    {
        question: "Which superheroes are apart of the DC universe?",
        answers: {
            a: "Batman",
            b: "IronMan",
            c: "Superman",
            d: "Thor"
        },
        correctAnswer: ""
    },

];

createQuiz();

submitBtn.addEventListener('click', showResults);