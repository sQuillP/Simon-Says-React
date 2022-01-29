import React, {useEffect, useState} from 'react';
import Square from './Square';
import '../CSS/Grid.css';


let pattern = [1,4,5,8,3,4,4];
let simonCounter = 0;
let isRunning = false;
let currentTurn = 'Simon';

let playerIndex = 0;

const Grid = ()=> {
    let squaresArr = [];

    /* Simon code*/
    const [selectedSquare, updateSelectedSquare] = useState(-1);
    const [squareToggled, updateSquareToggled] = useState(false);

    
    const signalNext = () =>
    {   if(isRunning)
        {
            if(simonCounter < pattern.length)
            {
                updateSelectedSquare(pattern[simonCounter]);
                updateSquareToggled(!squareToggled);
                simonCounter++;
            }
            else
            {
                simonCounter = 0;
                currentTurn = 'Player';
                isRunning = false;
            }
        }
    }
    /*-------------------------------------------- */

    /* Player code */
    const [playerSelection,updatePlayerSelection] = useState(null);
    const [playerToggle, updatePlayerToggle] = useState(true);
    /*
        when someone clicks the player square, 
        there should be a current index that displays
    */

    // Start the game
    const startGame = ()=> {
        isRunning = !isRunning;
        signalNext();
    }

    const handleMouseDown = (val)=>{
        updatePlayerSelection(val);
        updatePlayerToggle(!playerToggle);
        playerIndex++;
    }

    const handleMouseUp = ()=> {
        
    }

    const handleClick = ()=> {}
    
    for(let i = 0; i<9; i++)
    {
        squaresArr.push(
        <Square id={i} selectedSquare = {selectedSquare} signalNext = {signalNext}
            squareToggled ={squareToggled}
            playerSelection = {playerSelection}
            playerToggle = {playerToggle}
            onMouseDown = {()=>handleClick(i)}
            onMouseUp = {()=>{handleMouseUp()}}
            />

            );
    }


    return (
        <div className ='grid-container'>
            <div className ='row'>
                {squaresArr.map((x,i)=>{
                    if(i<3)
                        return x;
                })}
            </div>
            <div className = 'row'>
            {squaresArr.map((x,i)=>{
                    if(i>=3&&i<6)
                        return x;
                })}
            </div>
            <div className = 'row'>
            {squaresArr.map((x,i)=>{
                    if(i>=6)
                        return x;
                })}
            </div>
            <div id ='button'>
                <button 
                    id='start-stop'
                    onClick = {startGame}
                >
                    Begin!
                </button>
            </div>
        </div>
    );
}

export default Grid;