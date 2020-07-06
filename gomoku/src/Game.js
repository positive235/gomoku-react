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
        console.log("don't overwrite");
      } else {
        // record game history
        this.history.push({x: this.rect.x, y: this.rect.y});

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