# GOMOKU in React JS (IN PROGRESS)

This is a traditional Gomoku game(five-in-a-row) played by 2 players. 


## Tutorial: GOMOKU in React JS

### Setup for the tutorial (reference: https://reactjs.org/tutorial/tutorial.html)

<details><summary>CLICK TO SEE THE DETAILS</summary>
<p>
  
1. Make sure you have a recent version of Node.js installed.
2. Install Create React App to make a new project. In terminal, `npx create-react-app my-app`
3. Delete all files in the `src/` folder of the new project. (Note: Don't delete the entire src folder, just the original source files inside it).

4. `cd my-app`
5. `cd src`
6. If you are using Mac or Linux: `rm -f *` / Or, if you're on Windows: `del *`
8. Then, switch back to the project folder: `cd ..`
9. Add three files named `index.css`, `index.js`, `Game.js` in the `src/` folder.

10. Add these lines to the top of `index.js` in the `src/` folder:

```
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import './index.css';
```

11. Now if you run `npm start` in the project folder and open `http://localhost:3000` in the browser, you should see an empty gomoku field.

</p>
</details>

### Starter Code
<details><summary>CLICK TO SEE THE DETAILS</summary>
<p>

1. Add these lines to `index.js` in the `src/` folder:

```
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
```

2. Add these lines to the top of `Game.js` in the `src/` folder:

```
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

```
body {
  font: 35px "Century Gothic", Futura, sans-serif;
  margin: 35px;
  text-align: center;
  background-color: goldenrod;
  background-image: linear-gradient(rgb(238, 250, 2),goldenrod);
}

/* gomoku board */
.game {
  display: flex;
  flex-direction: column;
  padding: 60px 0;
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
```
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
  }
```

2. Then `Game.js` structures should be like this:

```
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

```
this.init = this.init.bind(this);
this.addGo = this.addGo.bind(this);
```

2. Add these lines to `componentDidMount(){...}` in `class Game extends React.Component{...}` in the `Game.js` in the `src/` folder:

```
this.rect = {};
this.goBoardX = this.goBoard.offsetLeft;
this.goBoardY = this.goBoard.offsetTop;

this.init();
```

3. Add these lines to `class Game extends React.Component{...}` in the `Game.js` in the `src/` folder:

```
init() {
  this.goBoard.addEventListener('mousedown', this.addGo, false);
}
```

4. Add these lines to `class Game extends React.Component{...}` in the `Game.js` in the `src/` folder:

```
addGo(event){
  // calculating exact mouse coordinates
  this.rect.x = event.pageX - this.goBoardX - 1.2;
  this.rect.y = event.pageY - this.goBoardY - 2;
  console.log(this.rect.x, this.rect.y);
}
```
</p>
</details>

(In Progress...)
