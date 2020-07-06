# GOMOKU in React JS (IN PROGRESS)

This is a traditional Gomoku game(five-in-a-row) played by 2 players. 

```
Gomoku from wiki: Gomoku, also called Five in a Row, is an abstract strategy board game. Players alternate turns placing a stone of their color on an empty section. The winner is the first player to form an unbroken chain of five stones horizontally, vertically, or diagonally. (Reference: https://en.wikipedia.org/wiki/Gomoku)
```

## Tutorial: GOMOKU in React JS

### Start (reference: https://reactjs.org/tutorial/tutorial.html)

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


(In Progress...)