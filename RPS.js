let score = JSON.parse(localStorage.getItem('score'));  //instead of initialising everything to zero we use JSON parse to make the values its previous values
        if(!score){
            score = {
                wins: 0,
                loses: 0,
                ties: 0
            }
        }

        updatescoreelement();
        let autoplaying = false;
        let intervalID;
        function autoplay(){
            const button = document.querySelector('.autoplay-js');
            if(!autoplaying){
                    intervalID = setInterval(function() {
                    const playermove = getComputerChoice();
                    playgame(playermove);
                    }, 1000);
                autoplaying = true;
                setTimeout(function(){
                    button.innerHTML = 'Stop Playing';
                }, 1000);
            }else{
                clearInterval(intervalID);
                autoplaying = false;
                button.innerHTML = 'Auto Play';
            }
            
        }

        function playgame(userChoice) {
            let result = '';
            const computer = getComputerChoice();
            console.log('Computer chose:', computer);

            if (userChoice === computer) {
                result = 'tie';
            }
            else if (
                (userChoice === 'rock' && computer === 'scissors') ||
                (userChoice === 'paper' && computer === 'rock') ||
                (userChoice === 'scissors' && computer === 'paper')
            ) {
                result = 'win';
            }
            else {
                result = 'loss';
            }


            if(result === 'win') score.wins++;
            else if(result === 'loss') score.loses++;
            else score.ties++;

            localStorage.setItem('score', JSON.stringify(score));  //local storage only contains string value and message is the name. hence to write score we wil use JSON.stringyfy

            updatescoreelement();

            document.querySelector('.js-result').innerHTML = `You ${result}` ;

            document.querySelector('.js-moves').innerHTML = 
            `You
            <img src="${userChoice}-emoji.png"
            class="move-icon">
            <img src="${computer}-emoji.png"
            class="move-icon">
            computer`;
        }
            function updatescoreelement(){
                document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, loses: ${score.loses}, ties: ${score.ties}`;
            }
        function getComputerChoice() {
            const randomNum = Math.random();

            if (randomNum <= 1 / 3) {
                return 'rock';
            } else if (randomNum <= 2 / 3) {
                return 'paper';
            } else {
                return 'scissors';
            }
        }
