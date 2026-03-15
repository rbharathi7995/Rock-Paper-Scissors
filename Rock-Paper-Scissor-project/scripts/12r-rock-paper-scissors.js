
  const score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,
    losses:0,
    tie:0
  };

 
 updateScoreElement();
/*  if(score==null){//if(!score)
    score{
      wins:0,
      losses:0,
      tie:0
    };
  }
*/
let isautoplaying=false;
let intervalId;
  function autoplay(){
    if(!isautoplaying){
  intervalId=setInterval(()=>{
    
  const playerMove=pickComputerMove();
  playGame(playerMove);
  },1000);
  isautoplaying=true;
  document.querySelector('.js-autoplay'). innerHTML='Stop playing'
  
    }
    else {
      clearInterval(intervalId);
      isautoplaying=false;
      document.querySelector('.js-autoplay').innerHTML='Auto play'
    }
  }
  document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('rock')
  }
  )
  document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('paper')
  }
  )
  document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('scissors')
  }
  )
  document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
      playGame('rock');
    }
    else if(event.key==='p') {
      playGame('paper');
    }
    else if(event.key==='s'){
      playGame('scissors');
    }
    else if(event.key==='a'){
      autoplay();
    }
    else if(event.key==='Backspace'){
      showresetConfirmation();
    }
  } );
  document.querySelector('.js-autoplay').addEventListener('click',()=>autoplay())
  
  function resetScore(){
  score.wins=0;
  score.losses=0;
  score.tie=0
  localStorage.removeItem('score');
  updateScoreElement();
  }
  document.querySelector('.js-reset-score').addEventListener('click',()=>{
    showresetConfirmation();
  });
  
  function showresetConfirmation(){
    document.querySelector('.reset-confirmation').innerHTML=`Are you sure you want to reset the score?
    <button class="yes-button">Yes</button>
    <button class="No-button">No</button>
    `;
    document.querySelector('.yes-button').addEventListener('click',()=>{
      resetScore();
      hideShow();
      });
      
   document.querySelector('.No-button').addEventListener('click',()=>{
      hideShow();
      });
  }
  function hideShow(){
    document.querySelector('.reset-confirmation').innerHTML='';
  }
  
  
  function playGame(material){
      const computerMove=pickComputerMove();

    let result='';
    if(material==='rock'){
        if(computerMove==='rock'){
  result='tie';
  }
  else if(computerMove==='paper'){
  result='you lose';
  }
  else if(computerMove==='scissors'){
  result='you win';
  }
    }
    else if(material==='paper'){
        if(computerMove==='paper'){
  result='tie';
  }
  else if(computerMove==='rock'){
  result='you win';
  }
  else if(computerMove==='scissors'){
  result='you lose';
  }
    }
    else if(material==='scissors'){
        if(computerMove==='scissors'){
  result='tie';
  }
  else if(computerMove==='rock'){
  result='you lose';
  }
  else if(computerMove==='paper'){
  result='you win';
  } 
    }
    if(result==='you win'){
      score.wins+=1;
    }
    else if(result==='you lose'){
      score.losses+=1;
    }
    else if(result==='tie'){
      score.tie+=1;
    }
    localStorage.setItem('score',JSON.stringify(score));
    
    updateScoreElement();
     document.querySelector('.js-result').innerHTML=result;
    
    document.querySelector('.js-moves').innerHTML= `You<img src="${material}-emoji.jpeg" class="move-icon">
  <img src="${computerMove}-emoji.jpeg"class="move-icon">Computer`;


}


function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`wins:${score.wins},losses:${score.losses},tie:${score.tie}`;

    
  }
  function pickComputerMove(){
    const randomNumber=Math.random();
  let computerMove='';
  if(randomNumber >= 0 && randomNumber<1/3){
  computerMove='rock';
  }
  else if(randomNumber >= 1/3 && randomNumber <2/3){
  computerMove='paper';
  }
  else if(randomNumber >= 2/3 && randomNumber<1){
  computerMove='scissors';
  }
  return computerMove;
  }
  