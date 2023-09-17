let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    Ties: 0
};

// yeh dono hum DOM of score kai neeche likh rahe hai toh kaam hi nahi kar rahi. Matlab jab globally declare karna hota hai toh uper hi uper kiya jata hai
let isAutoPlay = false;
// this is declared globally because setInterval always returns an id which is unique every time. So to stop setIntervl we want the last id. Hence to store the id, declared globally
let autoplayId;


// local storage mai computer ka ek hi storage hai, toh 06-rockPaperScissors mai jo score store ho raha hai aur jo yaha ho raha hai vo ek hi hai
// toh vaha jo score hai vahi yaha bhi hai.


// To play game by the keyboard
// Don't works with document.body.  But works with document only. Don't know why ?
document.addEventListener('keydown', (event) =>{
    if(event.key === 'r'){
        playGame('rock');
    }
    else if(event.key === 'p'){
        playGame('paper');
    }
    else if(event.key === 's'){
        playGame('Scissors');
    }
});

// Dry Run
function autoplay(){
    if(!isAutoPlay){
        // setInterval returns a id which can be used to stop the interval. This id is always different. 
        autoplayId = setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlay = true;
        // Toh yaha if kai ander aaker setInterval vala function chale ja raha hai. isAutoPlay true hone kai baad bhi. kyuki baar baar check thodi hogi if condition. Ek baar aa gaya bas loop kai ander 
    }
    else{
        // vo jo last wali id hogi vo aa jayegi yaha aur ruk jaayega
        clearInterval(autoplayId);
        isAutoPlay = false;
    }
}

function playGame(playerMove){
const computerMove = pickComputerMove();
document.querySelector('.moves').innerHTML = `<div class="js-moves"><div>Your Move:</div> <img src="${playerMove}.jpg" class= "resultButton"> <div>Computer Move:</div> <img src="${computerMove}.jpg" alt="" class= "resultButton"></div>`;
let result = '';

if(playerMove === 'Scissors'){
    if(computerMove === 'rock'){
        result = 'You lose';
    }
    else if(computerMove === 'paper'){
        result = 'You win';
    }
    else if(computerMove === 'Scissors'){
        result = 'Tie';
    }
}
else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
        result = 'You win';
    }
    else if(computerMove === 'paper'){
        result = 'Tie';
    }
    else if(computerMove === 'Scissors'){
        result = 'You lose';
    }
}
else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
        result = 'Tie';
    }
    else if(computerMove === 'paper'){
        result = 'You lose';
    }
    else if(computerMove === 'Scissors'){
        result = 'You win';
    }
}

if(result === 'You win'){
    score.wins++;
}
else if(result === 'You lose'){
    score.losses++;
}
else{
    score.Ties++;
}
localStorage.setItem('score', JSON.stringify(score));
document.querySelector('.result').innerHTML = `${result}`;
document.querySelector('.score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.Ties}`;

}
function pickComputerMove(){
    const num = Math.random();
    if(num>=0 && num<1/3){
        return 'rock';
    }
    if(num>=1/3 && num<2/3){
        return 'paper';
    }
    else{
        return 'Scissors';
    }
}
