class question{
    constructor(score){
        this.score = score;
    }
}

class category {
    constructor(){
        this.questionSeries=[];
        this.score=0;
    }

    insertQuestion(score){
        let q = new question(score);
        this.questionSeries.push(q);
    }

    addResult(n){
       this.score += parseInt(this.questionSeries[n].score);
    }
}



let s = [],
      results=["Nihilist", "Existentialist", "Hedonist"], cevaTest;
let c= new category, i=0, nihilism = new category, existentialism = new category, hedonism = new category, categList = [], categIndex = 0;
let question_section = document.getElementById("question_section"), nextButton = document.getElementById("next_button"), rate_butts = document.getElementsByClassName("ans"), percentage_box = document.getElementById("percentage_box");

categList.push(nihilism); categList.push(existentialism); categList.push(hedonism);

fetch("questions.json")
    .then(response => response.json())
    .then (data => {
        question_section.innerHTML = "<h2 style='text-align: center;'>"+data[i].question+"</h2>";

        //At the click of the "Next" button, it gets to the next question
        nextButton.onclick = function(){
            //Checks if any of the inputs were selected. Saves the position of the checked output
            let checked_val;
            if(categIndex < categList.length){
            for(let j=0;j<rate_butts.length;j++){
                if(rate_butts[j].checked){
                    checked_val = j;
                    break;
                }
            }
            //Verifies if there was any checked value found. If not, it opens a pop-up. If yes, proceeds with the questions.
            if(checked_val!=undefined){
                if(i != 0){
                    if(i % 5 == 0){
                        categIndex++;
                        i = 0;
                    }
                }
                categList[categIndex].insertQuestion(rate_butts[checked_val].value);
                categList[categIndex].addResult(i);
                i++;
                if(i < data.length){
                question_section.innerHTML = "<h2 style='text-align: center;'>"+data[i].question+"</h2>";
                }
            }
            else{
                window.alert("Please select a value before checking the next question, thanks.");
            }
    
            }
            //When the array gets to undefined(the end of the quiz), it ends the quiz and shows the result.
            if(categIndex == categList.length - 1 && i == 5){
                question_section.innerHTML = "<h1>Fin.</h1>";
                let resultRateNihilism = categList[0].score, resultRateExistentialism = categList[1].score, resultRateHedonism = categList[2].score, resultRoaster1, resultRoasterWinner, result_index;
                let nihilistPercentage = (resultRateNihilism*100)/20, existentialistPercentage = (resultRateExistentialism*100)/20, hedonistPercentage = (resultRateHedonism*100)/20;
                resultRateNihilism > resultRateExistentialism ? resultRoaster1 = resultRateNihilism : resultRoaster1 = resultRateExistentialism;
                resultRateHedonism > resultRoaster1 ? resultRoasterWinner = resultRateHedonism : resultRoasterWinner = resultRoaster1;
                for(k = 0; k < categList.length; k++){
                    console.log("Score Per Category: " + categList[k].score);
                    console.log("Final Score: "+ resultRoasterWinner);
                    if(categList[k].score == resultRoasterWinner) result_index = k;
                }
                console.log(result_index);
                result_box.innerHTML = "<h2>Score: "+ results[result_index] + "</h2>";
                percentage_box.innerHTML =
                "<h3>Nihilist: "+ nihilistPercentage +"%</h3>"+
                "<h3>Existentialist: "+ existentialistPercentage +"%</h3>"+
                "<h3>Hedonist: "+ hedonistPercentage +"%</h3>";
                nextButton.remove();
            }
        };
    });


