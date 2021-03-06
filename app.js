const cards = document.querySelectorAll('.memory-card');
const sound = document.getElementById('myAudio');
const value = document.querySelector('#value');
const counter = document.querySelector('#counter');
const gameOver = document.querySelector('.gameover')
const socialMenuUl = document.querySelector('.social-menu ul');
const restartBtn = document.querySelector('#restart .restart');
const pictures = document.querySelectorAll('.front-face');
let picturesArray = [];
pictures.forEach(picture => {
  picturesArray.push(picture.src)  
})
console.log(picturesArray)

var time = 0;
var score = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let isStarted = false;
let isOver = false;
let intervalid;
function flipCard(){
  if(lockBoard || isOver) return;
  if (!isStarted) {
    isStarted = true;
    startInterval();
  }
  play()
  if(this === firstCard) return;
  this.classList.add('flip');
  if(!hasFlippedCard){
    //first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  } // second click
    secondCard = this;
    checkForMatch();
}
function success(){
  var audio = new Audio('audio/success.wav');
  audio.play();
}
function play(){
  var audio = new Audio('audio/flipcard.wav');
  audio.play();
}
function checkForMatch(){
  let isMatch = firstCard.dataset.framework === 
  secondCard.dataset.framework;
    // it's matching
    if (isMatch){
      lastPicture();
    } 
    isMatch ? disableCards() : unFlipCards();
}
function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard()
}
function unFlipCards(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    play()
    secondCard.classList.remove('flip');
    resetBoard()
  }, 500);
}
function resetBoard(){
  [hasFlippedCard,lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null]
}
function lastPicture(){
  let firstImage = firstCard.querySelector('.front-face');
  let secondImage = secondCard.querySelector('.front-face');
  setTimeout(() => {
    firstImage.src = './images/pati.jpg';
    secondImage.src = './images/pati.jpg';
    success()
  }, 500);
  score = score + 1
  counter.textContent = score; 
  stopInterval();
  
}

function startInterval(){
  intervalid = setInterval(function(){
    value.innerHTML =  ' '+ time + ' ';
    time = time +1;
  }, 1000)
}
function stopInterval(){
  if(score == 6){
    clearInterval(intervalid);
    gameOver.classList.add('gameover-show')
    socialMenuUl.classList.add('show')
    restartBtn.classList.add('restart-show')
  } else {
    console.log('is not finished yet!')
  }
}
function restart(){
  resetBoard();
  time = 0;
  value.textContent = time;
  score = 0;
  counter.textContent = score;
  isStarted = false;
  isOver = false;
  gameOver.classList.remove('gameover-show')
  socialMenuUl.classList.remove('show')
  restartBtn.classList.remove('restart-show');
  pictures.forEach((picture, index)  => {
    console.log(pictures)
    console.log(picture)
    picture.parentElement.classList.remove('flip')
    picture.src = picturesArray[index]
    console.log(picturesArray[index])
  })
  cards.forEach(card =>card.addEventListener('click', flipCard))

  shuffle()
}

function shuffle(){
  cards.forEach(card =>{
    let refreshCard = Math.floor(Math.random()*12);
    card.style.order = refreshCard
  })
};
shuffle()
cards.forEach(card =>card.addEventListener('click', flipCard))
restartBtn.addEventListener('click', restart)

