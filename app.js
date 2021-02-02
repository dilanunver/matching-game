const cards = document.querySelectorAll('.memory-card');
const sound = document.getElementById('sound')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  if(lockBoard) return;
  if(this === firstCard) return;
  this.classList.add('flip');
  if(!hasFlippedCard){
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  } // second click
    secondCard = this;
    flipSound()
    checkForMatch();
    
}
function checkForMatch(){
  let isMatch = firstCard.dataset.framework === 
  secondCard.dataset.framework;
    // it's matching
    if (isMatch){
      lastPicture()
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
  }, 500);
  
}
function flipSound(){
  var soundFlag = true;
  if(soundFlag){
    
    sound.currentTime = 0;
    sound.onplay();
    soundFlag = false;
  }
}


(function shuffle(){
  cards.forEach(card =>{
    let refreshCard = Math.floor(Math.random()*12);
    card.style.order = refreshCard
  })
})();
cards.forEach(card =>card.addEventListener('click', flipCard))