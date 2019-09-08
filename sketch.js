var pacman, biscuit, cherry, ghostB, ghostP, ghostR, ghostG;

var button, ghostReach, biscuitReach, cherryReach, badGhostReach;

var ghosts = []; var biscuits = []; var cherries = []; var badGhosts = []; var finalScore = [];

var lives, score, heart, pacmanCursor, bestScore;

var gameStarted, startButton, rankButton, showScore, returnButton, showMain, insButton, showInstruction;

var boardWidth; var boardHeight; var boardX; var boardY; var square_size;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload() {
  // load any assets (images, sounds etc.) here

  pacman = loadImage('assets/pacman.png');
  biscuit = loadImage('assets/biscuit.png');
  cherry = loadImage('assets/cherry.png');
  ghostB = loadImage('assets/ghostB.png');
  ghostP = loadImage('assets/ghostP.png');
  ghostR = loadImage('assets/ghostR.png');
  ghostG = loadImage('assets/ghostG.png');
  heart = loadImage('assets/heart.png');
   
  // load font 
  myFont = loadFont('assets/DalekPinpoint.ttf');

  // load sound 
  button = loadSound('assets/button.mp3');
  ghostReach = loadSound('assets/ghostReach.mp3');
  biscuitReach = loadSound('assets/biscuitReach.mp3');
  cherryReach = loadSound('assets/cherryReach.mp3');
  badGhostReach = loadSound('assets/badGhostReach.mp3');

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  // set default value for gameStarted;
  gameStarted = false;
  showScore = false;
  showMain = false;
  showInstruction = false;

  // create startButton 
  startButton = createButton('START');
  startButton.position(width/3*2, height/2.5);
  startButton.mousePressed(startGame);

  // create rankButton 
  rankButton = createButton('SCORE RANKING');
  rankButton.position(width/2.2, height/2.5);
  rankButton.mousePressed(showRank);

  // create returnButton
  returnButton = createButton('RETURN');
  returnButton.position(width/5*4, height/4*3);
  returnButton.mousePressed(showOriginal);

  // create insButton
  insButton = createButton('INSTRUCTION');
  insButton.position(width/3.5, height/2.5);
  insButton.mousePressed(showIns);

  // set default lives and score values
  lives = 3;
  score = 0;
  bestScore = 0;
  
  // set viarable square_size for calculation
  square_size = windowWidth/40;

  // set default value for cherryCount
  cherryCount = 0;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {

  background(0);
  returnButton.hide();

  // display title;
  pop();
  textSize(1.2*square_size);
  textFont(myFont);
  stroke('purple');
  strokeWeight(5);
  fill('orange');
  text('PAC-MAN',2*square_size,1.5*square_size);
  push();
  
  image(pacman,square_size/2,square_size/2,square_size,square_size);
 
  // display dividing line
  stroke('purple');
  strokeWeight(5);
  line(0,2*square_size,windowWidth,2*square_size);

  // display score
  fill(200);
  noStroke();
  textSize(24);
  text("Score: "+score, width/3, 1.5*square_size);
  fill('red');
  text("Best Score: "+ bestScore, width/2, 1.5*square_size);

//-----------------------------------------------------------------------------------//

  pacmanCursor = image(pacman,mouseX,mouseY,1.5*square_size,1.5*square_size);

//-----------------------------------------------------------------------------------//
  if(gameStarted == true){
  
    // hide buttons
    startButton.hide();
    rankButton.hide();
    returnButton.hide();
    insButton.hide();

    // display lives
    switch(lives)
    {
      case 3:
        image(heart, windowWidth-4*square_size,square_size,square_size/3*2,square_size/3*2);
        image(heart, windowWidth-5*square_size,square_size,square_size/3*2,square_size/3*2);
        image(heart, windowWidth-6*square_size,square_size,square_size/3*2,square_size/3*2);
      break;
      case 2:
        image(heart, windowWidth-4*square_size,square_size,square_size/3*2,square_size/3*2);
        image(heart, windowWidth-5*square_size,square_size,square_size/3*2,square_size/3*2);
      break;
      case 1:
        image(heart, windowWidth-4*square_size,square_size,square_size/3*2,square_size/3*2);
      break;
    }

    if(cherryCount==0){
      
      // random pushing ghost
      var gnum = ceil(random(100));
      if(gnum == 1){
        ghosts.push(new Ghost());
      }
    
      // random pushing biscuit 
      var bnum = ceil(random(80));
      if(bnum == 1){
        biscuits.push(new Biscuit());
      }

      // random pushing cherry 
      var cnum = ceil(random(500));
      if(cnum == 1){
        cherries.push(new Cherry());
      }

      // random pushing badGhost
      var bgnum = ceil(random(40));
      if(bgnum == 1){
        badGhosts.push(new BadGhost());
      }

      // display ghost
      for(var i=0;i<ghosts.length;i++){
        ghosts[i].move();
        ghosts[i].display();

        if(ghosts[i].xpos > width){
          // remove ghost
          ghosts.splice(i, 1);
        
        } else {
          var d1 = dist(ghosts[i].xpos, ghosts[i].ypos, mouseX, mouseY);

            if(d1 < square_size){
            // remove ghost
            ghosts.splice(i, 1);
            ghostReach.play();
            
            // decrease lives by one
            lives --;
            }
          }
      }

      // display biscuits
      for(var i=0;i<biscuits.length;i++){
        biscuits[i].move();
        biscuits[i].display();
        
        if(biscuits[i].xpos > width){
          biscuits.splice(i, 1);
        } else {
          var d2 = dist(biscuits[i].xpos, biscuits[i].ypos, mouseX, mouseY);

          if(d2 < square_size){
            // remove biscuits
            biscuits.splice(i, 1);
            biscuitReach.play();
            
            // add 1 score for each biscuit
            score ++;
          }
        }
      }

      if(score >= 2){
        // display cherries
        for(var i=0;i<cherries.length;i++){
          cherries[i].move();
          cherries[i].display();

          if(cherries[i].xpos > width){
            cherries.splice(i, 1);
          } else{
            var d3 = dist(cherries[i].xpos, cherries[i].ypos, mouseX, mouseY);
  
            if(d3 < square_size){
              // remove cherries
              cherries=[];
              cherryCount=1;
              cherryReach.play();
      
            }
          }
        }
      }
    
    } else{ // bonus time startButton
        
      // display badGhost
      for(var i=0;i<badGhosts.length;i++){
        badGhosts[i].move();          
        badGhosts[i].display();

        if(badGhosts[i].xpos > width){
          badGhosts.splice(i, 1);

        }else{
          var d4 = dist(badGhosts[i].xpos, badGhosts[i].ypos, mouseX, mouseY);
          if(d4 < square_size){
            // remove biscuits
            badGhosts.splice(i, 1);
            badGhostReach.play();
              
            // add 2 score for each badGhost
            score += 2;
              
          }
        }

       
      }
    }
    
    // bonus time end
    if(badGhosts.length == 0){
      cherryCount =0;
    }

    
    // check for game over
    if(lives <= 0) {
     // reset lives and score
      lives = 3;
      finalScore.push(score);
      finalScore = sort(finalScore,finalScore.length);
      bestScore = max(finalScore);
      score = 0;
      
      // reset pacman's position
        
      ghosts = [];
      biscuits = [];
       
      // set gameStarted to false
      gameStarted = false;
    }
   
  } else {
    // show startButton button
    startButton.show();
    rankButton.show();
    insButton.show();
  
  }

  if(showScore==true){
    // hide buttons
    startButton.hide();
    rankButton.hide(); 
    returnButton.show();
    insButton.hide();
    
    stroke('purple');
    strokeWeight(5);
    fill('silver');
    rect(width/3,5*square_size,10*square_size,12*square_size);

    for(var i=7;i<17;i+=2){
      line(width/3, i*square_size, width/3+10*square_size, i*square_size);
    }
    
    line(width/3+3*square_size, 5*square_size, width/3+3*square_size, 17*square_size);
    
    push();
    textSize(square_size);
    textFont(myFont);
    stroke('purple');
    strokeWeight(5);
    fill('yellow');
    text('Score    Ranking',width/2.8,4*square_size);
    textSize(0.8*square_size);
    text('RANK',width/2.9,6.5*square_size);
    text('SCORE',width/2-1.5*square_size,6.5*square_size);

    for(var i=0;i<finalScore.length;i++){
      text(finalScore[i],width/2-0.5*square_size,(8.5+2*i)*square_size);
      text(i+1,width/2.8,(8.5+2*i)*square_size);
    }

       
    



    pop();

  }

  if(showMain == true){
    
    returnButton.hide();
    startButton.show();
    rankButton.show();
    insButton.show();
    
  }

  if(showInstruction == true){
    returnButton.show();
    startButton.hide();
    rankButton.hide();
    insButton.hide();

    stroke('purple');
    strokeWeight(5);
    fill('silver');
    rect(width/4.5, 5*square_size, 21*square_size, 13*square_size);

    push();
    textSize(square_size);
    textFont(myFont);
    stroke('purple');
    strokeWeight(5);
    fill('yellow');
    text('Game  Instruction', width/2.8, 4*square_size);

    textSize(0.8*square_size);
    for(var i=1;i<5;i++){
      text(i+'. ', width/4, (4.5+2*i)*square_size);
    }
    image(biscuit, width/3.2, 6*square_size, square_size/3, square_size/3);
    image(ghostG, width/3.2, 7.5*square_size, square_size, square_size);
    image(ghostP, width/3.2+square_size, 7.5*square_size, square_size, square_size);
    image(ghostR, width/3.2+2*square_size, 7.5*square_size, square_size, square_size);
    image(ghostB, width/3.2, 9.5*square_size, square_size, square_size);
    image(cherry, width/3.2, 11.5*square_size, square_size, square_size);


    text('1  biscuit  =  +  1  score', width/2-2*square_size, 6.5*square_size);
    text('1  normal ghost  =  -  1  life', width/2-2*square_size, 8.5*square_size);
    text('1  blue ghost  =  +  2  score', width/2-2*square_size, 10.5*square_size);
    text('1  cherry  =  BONUS  TIME', width/2-2*square_size, 12.5*square_size);

    
    text('BONUS  TIME  :  ', width/4, 14.5*square_size);
    textSize(0.6*square_size);
    text('When  reaching  one  cherry ,  the  BONUS  TIME  will  be ', width/4+2*square_size, 16*square_size);
    text('activated .  Eat  as  many  blue  ghosts  as  you  can !  ', width/4, 17*square_size);

    pop();

    



  }


   
}

  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startGame(){
  // change gameStarted variable
  gameStarted = true;
  showScore = false;
  showMain = false;
  showInstruction = false;
  button.play();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showRank(){
  showScore = true;
  gameStarted = false;
  showMain = false;
  showInstruction = false;
  button.play();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showOriginal(){
  gameStarted = false;
  showScore = false;
  showMain = true;
  showInstruction = false;
  button.play();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showIns(){
  showScore = false;
  gameStarted = false;
  showMain = false;
  showInstruction = true;
  button.play();
}



// ghost class
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Ghost(){
  // set default properties
  this.xpos = square_size;
  this.ypos = random(3*square_size, height);
  this.speed = random(1, 4);
  this.type = ceil(random(3));

  this.move = function(){

    this.xpos += this.speed;
  }

  this.display = function(){
    imageMode(CENTER);
    
    if(this.type == 1){
      image(ghostR, this.xpos, this.ypos, square_size, square_size);
    }
    if(this.type == 2){
      image(ghostG, this.xpos, this.ypos, square_size, square_size);
    }
    if(this.type == 3){
      image(ghostP, this.xpos, this.ypos, square_size, square_size);
    }
      
  }
    
}

// cherry class
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Cherry(){
  // set default properties
  this.xpos = square_size;
  this.ypos = random(3*square_size, height);
  this.speed = random(4, 6);

  this.move = function(){
  
    this.xpos += this.speed;
  }

  this.display = function(){
    imageMode(CENTER);
    image(cherry,this.xpos, this.ypos, square_size, square_size);
  }

  
}

// biscuit class
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Biscuit(){
  // set default properties
  this.xpos = square_size;
  this.ypos = random(3*square_size, height);
  this.speed = random(1,2);

  this.move = function(){
    
    this.xpos += this.speed;
  }

  this.display = function(){
    imageMode(CENTER);
    image(biscuit,this.xpos, this.ypos, square_size/3, square_size/3);
  }

  
}

// badGhost class
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function BadGhost(){
  // set default properties
  this.xpos = square_size;
  this.ypos = random(3*square_size, height);
  this.speed = random(6,10);

  this.move = function(){
    
    this.xpos += this.speed;
  }

  this.display = function(){
    imageMode(CENTER);
    image(ghostB,this.xpos, this.ypos, square_size, square_size);
  }

  
}


