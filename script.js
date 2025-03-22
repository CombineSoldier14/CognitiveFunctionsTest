var questions;
var questionCount = 0; // Keeps track of individual questions


fetch('questions.json')
    .then(response => response.json())
    .then(json => {
        questions = json;
        Object.keys(questions).forEach((key) => {
            // Create a section for each function type (Ti, Te, etc.)
            var section = document.createElement("div");
            section.innerHTML = `<u><h2>${key + ' Questions'}</h2></u>`;

            questions[key].forEach((question) => {
                questionCount++; // Increment for each question

                var questionElement = document.createElement("div"); // Use <div> instead of <p>
                questionElement.innerHTML = `
                
                    <p><strong>${questionCount + '. ' + question}</strong></p>
                <div class="answers">
                    <div class="extremeagree">
                        <input type="radio" name="questionRow${questionCount}${key}" value="3">Extremely Agree
                    </div>
                    <div class="agree">
                        <input type="radio" name="questionRow${questionCount}${key}" value="2.5">Agree
                    </div>
                    <div class="kindaagree">
                        <input type="radio" name="questionRow${questionCount}${key}" value="2">Kinda Agree
                    </div>
                    <div class="neutral">
                        <input type="radio" name="questionRow${questionCount}${key}" value="1.5">Neutral
                    </div>
                    <div class="kindadisagree">
                        <input type="radio" name="questionRow${questionCount}${key}" value="1">Kinda Disagree
                    </div>
                    <div class="disagree">
                        <input type="radio" name="questionRow${questionCount}${key}" value="0.5">Disagree
                    </div>
                    <div class="extremedisagree">
                        <input type="radio" name="questionRow${questionCount}${key}" value="0">Extremely Disagree
                    </div>
                </div>
                `;

                section.appendChild(questionElement);
            });
            var div = document.getElementById("questions");
            div.appendChild(section);
        });
    })
    .catch(error => console.error("Error loading questions:", error));

function getResults() {
    var TiScore = 0;
    var TeScore = 0;
    var FiScore = 0;
    var FeScore = 0;
    var SiScore = 0;
    var SeScore = 0;
    var NiScore = 0;
    var NeScore = 0;
    var div = document.getElementById("questions");
    var inputs = div.getElementsByTagName("input");
    var missCounter = 0;
    for(var j = 0; j < inputs.length; j++) {
        if(!inputs[j].checked) {
            missCounter++;
        }
    }
    if(missCounter > (questionCount * 7) - questionCount) {
        alert("Please answer all questions");
        return;
    }
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            var value = parseFloat(inputs[i].value);
            if(inputs[i].name.includes("Ti")) {
                TiScore += value;
            }
            if(inputs[i].name.includes("Te")) {
                TeScore += value;
            }
            if(inputs[i].name.includes("Fi")) {
                FiScore += value;
            }
            if(inputs[i].name.includes("Fe")) {
                FeScore += value;
            }
            if(inputs[i].name.includes("Si")) {
                SiScore += value;
            }
            if(inputs[i].name.includes("Se")) {
                SeScore += value;
            }
            if(inputs[i].name.includes("Ni")) {
                NiScore += value;
            }
            if(inputs[i].name.includes("Ne")) {
                NeScore += value;
            }
        }
    }
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <table>
            <tr>
                <th>Function</th>
                <th>Score</th>
            </tr>
            <tr>
                <td>Introverted Thinking (Ti)</td>
                <td>${TiScore}</td>
            </tr>
            <tr>
                <td>Extroverted Thinking (Te)</td>
                <td>${TeScore}</td>
            </tr>
            <tr>
                <td>Introverted Feeling (Fi)</td>
                <td>${FiScore}</td>
            </tr>
            <tr>
                <td>Extroverted Feeling (Fe)</td>
                <td>${FeScore}</td>
            </tr>
            <tr>
                <td>Introverted Sensing (Si)</td>
                <td>${SiScore}</td>
            </tr>
            <tr>
                <td>Extroverted Sensing (Se)</td>
                <td>${SeScore}</td>
            </tr>
            <tr>
                <td>Introverted Intuition (Ni)</td>
                <td>${NiScore}</td>
            </tr>
            <tr>
                <td>Extroverted Intuition (Ne)</td>
                <td>${NeScore}</td>
            </tr>
        </table>
    `;
}