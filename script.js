const checkList = document.querySelectorAll(".custom-checkbox");
const inputField = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error");
const progressLabel = document.querySelector(".sub-title");
const progressBar = document.querySelector(".progress");
const progressValue = document.querySelector(".progress-bar");

const allQuotes =[
    'RAise the bar by completihg your goals!',
    'Every step counts, keep moving!',
    'Well begun is half done!',
    'Keep going, you are doing great!',
    'Whoa! You are just completed all your goals!',
]

const allGoals = JSON.parse(localStorage.getItem("allGoals"))  || {};
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width = ` ${(completedGoalsCount / inputField.length) * 100}% `
progressValue.firstElementChild.innerText =`${completedGoalsCount}/${inputField.length} Completed`
progressLabel.innerText = allQuotes[completedGoalsCount];


checkList.forEach((checkbox) => {
    checkbox.addEventListener( "click", (e) => {

        const allinputFieldFilled = [...inputField].every(function (input) {
            return input.value;
        })

        if(allinputFieldFilled){
            checkbox.parentElement.classList.toggle('completed');
            const inputId =checkbox.nextElementSibling.id;           
            allGoals[inputId].completed = !allGoals[inputId].completed;
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
            progressValue.style.width = `${(completedGoalsCount / inputField.length) * 100}% `
            progressValue.firstElementChild.innerText =`${completedGoalsCount}/${inputField.length} Completed`
            progressLabel.innerText = allQuotes[completedGoalsCount];
            localStorage.setItem("allGoals", JSON.stringify(allGoals));
        }
        else{
            progressBar.classList.add("show-error")
        }
    })
})

inputField.forEach((input) => {

    if(allGoals[input.id] ) {
            input.value = allGoals[input.id].name;
             if(allGoals[input.id].completed) {
             input.parentElement.classList.add("completed");
    }

    }

   

    input.addEventListener("focus", () => {
        progressBar.classList.remove("show-error");
    })

    input.addEventListener("input", (e) => {

        if(allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name;
            return;
        }
        if(allGoals[input.id]){
            allGoals[input.id].name = input.value;
        }else{
        allGoals[input.id] = {
            name: input.value,
            completed: false,
        }
    }
        
        console.log(allGoals);
        localStorage.setItem("allGoals", JSON.stringify(allGoals));

    })
})





