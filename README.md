# GOMOKU in React JS

This is a personal project: Traditional Gomoku game(five-in-a-row) played by 2 players. 

![gomoku-react](https://github.com/positive235/gomoku-react/blob/master/img-readme/gomokureact.png?raw=true)

## Where to try

https://positive235.github.io/gomoku-react/

## How to run

```bash
cd gomoku-react
cd gomoku
npm i
npm start
```

## How to try (Writing in Progress)	

### Setup for the tutorial	

<details><summary>CLICK TO SEE THE DETAILS</summary>	
<p>	
(reference: https://reactjs.org/tutorial/tutorial.html)	

1. Make sure you have a recent version of Node.js installed.	
2. Install Create React App to make a new project. In terminal, 
```bash
npx create-react-app my-app
```

3. Delete all files in the `src/` folder of the new project. (**`Note: Don't delete the entire src folder, just the original source files inside it`**).	

4. In terminal, 

```bash
cd my-app	
cd src
```

5. If you are using Mac or Linux: 
```bash
rm -f *
```

   Or, if you're on Windows: 
```bash
del *
```

6. Then, switch back to the project folder. In Terminal, 
```bash
cd ..
```

7. Add three files named `index.css`, `index.js`, `Game.js` in the `src/` folder.	

8. Add these lines to the top of `index.js` in the `src/` folder:	

```js
import React from 'react';	
import ReactDOM from 'react-dom';	
import Game from './Game';	
import './index.css';	
```

9. Now if you run `npm start` in the project folder and open `http://localhost:3000` in the browser, you should see an empty gomoku field.	

</p>	
</details>	

### Starter Code

<details><summary>CLICK TO SEE THE DETAILS</summary>	
<p>	

1. Add these lines to `index.js` in the `src/` folder:	

```js	
ReactDOM.render(	
  <Game />,	
  document.getElementById('root')	
);	
```	

2. Add these lines to the top of `Game.js` in the `src/` folder:	

```js	
import React from 'react';	
class Game extends React.Component {	
  constructor(props) {	
        super(props);	
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
```	

3. Add these lines to the top of `index.css` in the `src/` folder:	

```css	
body {
  font: 35px "Century Gothic", Futura, sans-serif;
  margin: 30px 0;
  text-align: center;
  background-color: rgb(218, 179, 79);
}

/* game status text*/
.status-txt {
  color: black;
  font-weight: bold;
  margin-bottom: 30px;
}

/* gomoku board */
.game {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.game-board {
  margin: 0 auto;
}

/* gomoku board to play */
#goBoard {
  border: 2px solid black;
}
```	
</p>	
</details>	

### Making a Board - (draw lines on the board)	

<details><summary>CLICK TO SEE THE DETAILS</summary>	
<p>	

`componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.	

(Reference: https://reactjs.org/docs/react-component.html#componentdidmount)	

1. Add these lines to `Game.js` in the `src/` folder:	

```js	
  componentDidMount() {	
    var goBoard = document.getElementById('goBoard');	
    var context = goBoard.getContext('2d');	
    
    // draw multiple lines for go board	
    for (let i = 0; i < 15; i++) {	
      context.moveTo(0, 50 * i);	
      context.lineTo(700, 50 * i);	
      context.moveTo(50 * i, 0);	
      context.lineTo(50 * i, 700);	
    }	
    context.stroke();	
  }	
```	

2. Then `Game.js` structures should be like this:	

```js	
class Game extends React.Component {	
  constructor(props) {...}	
  componentDidMount() {...}	
  render() {...}	
}	
```	
</p>	
</details>	

### Getting current mouse coordinates when the user clicks

<details><summary>CLICK TO SEE THE DETAILS</summary>	
<p>	

1. Add these lines to `constructor(props){...}` in `class Game extends React.Component {...}` in the `Game.js` in the `src/` folder:	

```js	
// functions
this.init = this.init.bind(this);	
this.addGo = this.addGo.bind(this);	
```	

2. Add these lines to `componentDidMount(){...}` in `class Game extends React.Component{...}` in the `Game.js` in the `src/` folder:	

```js	
// for mouse coordinate
this.rect = {};
this.goBoardX = goBoard.offsetLeft;
this.goBoardY = goBoard.offsetTop;

this.init();	
```	

3. Add these lines to `class Game extends React.Component{...}` in the `Game.js` in the `src/` folder:	

```js	
init() {
  var goBoard = document.getElementById('goBoard');
  
  //when clicking the board, a stone will be added to the board
  goBoard.addEventListener('mousedown', this.addGo, false);
}	
```	

4. Add these lines to `class Game extends React.Component{...}` in the `Game.js` in the `src/` folder:	

```js	
addGo(event){	
  // calculating exact mouse coordinates
  this.rect.x = event.pageX - this.goBoardX - 1;
  this.rect.y = event.pageY - this.goBoardY - 2;
}	
```

5. Then `Game.js` in the `src/` folder should be like this:

```js
import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);	
    this.addGo = this.addGo.bind(this);
  }

  componentDidMount() {	
    var goBoard = document.getElementById('goBoard');	
    var context = goBoard.getContext('2d');	
    
    // draw multiple lines for go board	
    for (let i = 0; i < 15; i++) {	
      context.moveTo(0, 50 * i);	
      context.lineTo(700, 50 * i);	
      context.moveTo(50 * i, 0);	
      context.lineTo(50 * i, 700);	
    }	
    context.stroke();
    
    // for mouse coordinate
    this.rect = {};
    this.goBoardX = goBoard.offsetLeft;
    this.goBoardY = goBoard.offsetTop;

    this.init();
  }	

  init() {
    var goBoard = document.getElementById('goBoard');
    
    //when clicking the board, a stone will be added to the board
    goBoard.addEventListener('mousedown', this.addGo, false);
  }	

  addGo(event){	
    // calculating exact mouse coordinates
    this.rect.x = event.pageX - this.goBoardX - 1;
    this.rect.y = event.pageY - this.goBoardY - 2;
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
```
</p></details>

### Create black stones on the board when the user clicks the board

<details><summary>CLICK TO SEE THE DETAILS</summary>	
<p>	
  
1. Set the radius of the stone to 25(you can change). So its diameter is 50(you can change). Add these lines in `constructor(props){...}` in the `Game.js` in the `src/` folder:

```js
// the radius of stone
this.stoneRadius = 25;
// the diameter of stone
this.stoneDiameter = this.stoneRadius * 2;
```

2. Add these lines to `addGo(event){...}` in the `Game.js` in the `src/` folder:

```js
var goBoard = document.getElementById('goBoard');
var context = goBoard.getContext('2d');
          
// draw stones based on thier calculated coordinates
context.beginPath();
context.arc(this.rect.x, this.rect.y, this.stoneRadius, 0, 2 * Math.PI);

context.fillStyle = "black";
context.fill();
context.stroke();
```

3. Now you can see black stones on the board when you click the board.
</p></details>

### Switch stone's color (black -> white, OR white -> black) on each click

<details><summary>CLICK TO SEE THE DETAILS</summary>	
<p>
  
1. Gomoku starts with a black stone. (If you want to start with a white stone, set `false` instead of `true`) Add these lines to `constructor(props){...}` in the `Game.js` in the `src/` folder:

```js
this.state = {
  blackStone: true    
};
```

2. Delete these lines in `addGo(event){...}` in the `Game.js` in the `src/` folder:

```js
context.fillStyle = "black";
context.fill();
context.stroke();
```

3. Add these lines to `addGo(event){...}` in the `Game.js` in the `src/` folder:

```js
// fill the color of stone:  black or white
if (this.state.blackStone === true) {
  context.fillStyle = "black";
  context.fill();
  context.stroke();
  this.setState({
    blackStone: false
  });
} else {
  context.fillStyle = "white";
  context.fill();
  context.stroke();
  this.setState({
    blackStone: true
  });
}
```

</p></details>
