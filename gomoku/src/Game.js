import React from 'react';

class Game extends React.Component {

  constructor(props) {
    super(props);

    // stone info: radius, diameter
    this.stoneRadius = 25;
    this.stoneDiameter = this.stoneRadius * 2;

    // functions
    this.init = this.init.bind(this);
    this.addGo = this.addGo.bind(this);
    
    // game state
    this.history = [];
    this.blackStone = true;
    this.gameOver = false;
    this.gameState = "None"; // Win, Lose, Draw
  }

  componentDidMount() {
    this.goBoard = document.getElementById('goBoard');
    this.context = this.goBoard.getContext('2d');

    // draw multiple lines for go board
    for (let i = 0; i < 15; i++) {
      this.context.moveTo(0, 50 * i);
      this.context.lineTo(700, 50 * i);
      this.context.moveTo(50 * i, 0);
      this.context.lineTo(50 * i, 700);
    }
    this.context.stroke();

    // for mouse coordinate
    this.rect = {};
    this.goBoardX = this.goBoard.offsetLeft;
    this.goBoardY = this.goBoard.offsetTop;

    this.init();
  }

  init() {
    //when clicking the board, a stone will be added to the board
    this.goBoard.addEventListener('mousedown', this.addGo, false);
  }

  gameScore(isPlayerOne) {
    // draw
    if (this.history.length === 13*13) {
      this.gameState = "Draw";
      this.gameOver = true;
      return;
    }
    // sort history by stone's color
    this.sortStone = [];
    if (this.history.length >= 5){
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].isBlackStone === isPlayerOne) {
          this.sortStone.push(this.history[i]);
        }
      }
      
      // sort history by x
      this.sortStone.sort((a, b) => {
        if (a.x > b.x) return 1;
        if (a.x < b.x) return -1;
        return 0;
      });
      
      // decide who is a winner
      for (let i = 0; i < this.sortStone.length; i++) {   
        let valueX = this.sortStone[i].x;
        let valueY = this.sortStone[i].y;
        let cntA = 1;
        let cntB = 1;
        let cntC = 1;
        for (let j = i + 1; j < this.sortStone.length; j++) {
          if (this.sortStone[j].y === valueY + this.stoneDiameter * cntA
            && this.sortStone[j].x === valueX + this.stoneDiameter * cntA) {
            // x, y increase
            cntA += 1
              
          } else if (this.sortStone[j].y === valueY - this.stoneDiameter * cntB
            && this.sortStone[j].x === valueX + this.stoneDiameter * cntB) {
            // x increases, y decreases
            cntB += 1;

          } else if (this.sortStone[j].y === valueY 
            && this.sortStone[j].x === valueX + this.stoneDiameter * cntC) {
            // x increases, y does not change
            cntC += 1;
          }

          if (cntA === 5 || cntB === 5 || cntC === 5) {
            this.gameOver = true;
            if (isPlayerOne === true) {
              this.gameState = "Black Stone Win!"
            } else {
              this.gameState = "White Stone Win!"
            }
          }
        }
      }

      if (this.gameOver === false) {
        // sort history by y
        this.sortStone.sort((a, b) => {
          if (a.y > b.y) return 1;
          if (a.y < b.y) return -1;
          return 0;
        });

        for (let i = 0; i < this.sortStone.length; i++) {   
          let valueX = this.sortStone[i].x;
          let valueY = this.sortStone[i].y;
          let cnt = 1;
          for (let j = i + 1; j < this.sortStone.length; j++) {
            if (this.sortStone[j].x === valueX) {
              // x does not change
              if (this.sortStone[j].y === valueY + this.stoneDiameter * cnt) {
                // y increases
                cnt += 1;
                if (cnt === 5) {
                  this.gameOver = true;
                  if (isPlayerOne === true) {
                    this.gameState = "Black Stone Win!"
                  } else {
                    this.gameState = "White Stone Win!"
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  addGo(event){
    // calculating exact mouse coordinates
    this.rect.x = event.pageX - this.goBoardX - 1;
    this.rect.y = event.pageY - this.goBoardY - 2;
    
    // calculating coordinates to put stones onto the proper places
    if (this.rect.x % this.stoneDiameter > this.stoneRadius) {
      this.rect.x = (this.rect.x - this.rect.x % this.stoneDiameter) + this.stoneDiameter;
    } else {
      this.rect.x -= this.rect.x % this.stoneDiameter;
    }

    if (this.rect.y % this.stoneDiameter > this.stoneRadius) {
      this.rect.y = (this.rect.y - this.rect.y % this.stoneDiameter) + this.stoneDiameter;
    } else {
      this.rect.y -= this.rect.y % this.stoneDiameter;
    }

    // put stones only if they are not on the edges
    if (this.gameOver === false) {
      if (this.rect.x > 0 && this.rect.x < 700
        && this.rect.y > 0 && this.rect.y < 700) {
        
        // not to put stones at the place where the stone is already placed
        this.placed = false;      
  
        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].x === this.rect.x && this.history[i].y === this.rect.y){
            this.placed = true;
          }
        }
  
        if (this.placed === true) {
          // the user clicked where the other stone is already placed
          console.log("don't overwrite");
  
        } else {
          // record game history
          this.history.push({x: this.rect.x, y: this.rect.y, isBlackStone: this.blackStone});
  
          // draw stones based on thier calculated coordinates
          this.context.beginPath();
          this.context.arc(this.rect.x, this.rect.y, this.stoneRadius, 0, 2 * Math.PI);
        
          // fill the color of stone:  black or white
          if (this.blackStone === true) {
            this.context.fillStyle = "black";
            this.blackStone = false;
          } else {
            this.context.fillStyle = "white";
            this.blackStone = true;
          }
          this.context.fill();
          this.context.stroke();

          this.gameScore(true); // Player One (Black Stone) Score
          if (this.gameOver === false) {
            this.gameScore(false); // Player Two (White Stone) Score
          }
        }
      } 
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <canvas id="goBoard" width="700" height="700" />
        </div>
      </div>
    );
  }
}

export default Game;