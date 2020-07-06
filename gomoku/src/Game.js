import React from 'react';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.addGo = this.addGo.bind(this);
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
    this.rect.x = event.pageX - this.goBoardX - 1.2;
    this.rect.y = event.pageY - this.goBoardY - 2;

    // draw stones based on current mouse position
    this.context.beginPath();
    this.context.arc(this.rect.x, this.rect.y, 25, 0, 2 * Math.PI);

    // fill the color of stone
    if (this.blackStone == true) {
      this.context.fillStyle = "black";
      this.blackStone = false;
    } else {
      this.context.fillStyle = "white";
      this.blackStone = true;
    }
    
    this.context.fill();
    this.context.stroke();
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