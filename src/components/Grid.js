import React, {useEffect, useState} from 'react';
import Square from './Square';
import '../CSS/Grid.css';


let playerSelection = [];
let simonSelection = [];
let simonCounter = 0;


const Grid = ()=> {


    let squares = [];
    const [selectedSquare, updateSelectedSquare] = useState(100);
    const [toggleSquare, updateToggledSquare] = useState(false);
    const [currentTurn, updateCurrentTurn] = useState('');
    const [messageDisplay, updateMessageDisplay] = useState('');
    

    const startGame = ()=>{
        simonCounter = 0;
        updateCurrentTurn('simon');
        updateMessageDisplay("Simon's turn");
        playerSelection = [];
        simonSelection = [Math.floor(Math.random()*9)];
    }


    const signalNext = ()=> {
        if(currentTurn === 'simon')
        {
            if(simonCounter<simonSelection.length){
                updateSelectedSquare(simonSelection[simonCounter]);
                updateToggledSquare(!toggleSquare);
                simonCounter++;
            }
            else
            {
                simonCounter = 0;
                playerSelection = [];
                updateCurrentTurn('player');
                updateMessageDisplay('Your turn');
            }
        }
    }


    useEffect(()=>{
        signalNext();
    },[currentTurn]);


    const updatePlayerSelection = (id)=>{
        playerSelection.push(id);
        if(playerSelection.length === simonSelection.length)
        {
            for(let i = 0; i<playerSelection.length; i++)
            {
                if(simonSelection[i]!=playerSelection[i])
                {
                    updateMessageDisplay('You lose!');
                    updateCurrentTurn('');
                    return;
                }
            }
            updateCurrentTurn('simon');
            updateMessageDisplay("Simon's turn")
            simonSelection.push(Math.floor(Math.random()*9));
            simonCounter = 0;
            signalNext();
        }
    }

    
    for(let i = 0; i<9; i++) 
    {
        squares.push(
            <Square 
                    key={i}
                    id={i} 
                    currentTurn ={currentTurn}
                    updatePlayerSelection ={updatePlayerSelection}
                    signalNext = {signalNext}
                    selectedSquare = {selectedSquare}
                    toggleSquare = {toggleSquare}
            />
        )
    }


    return (
        <div className ='grid-container'>
            <h1>Test your memory!</h1>
            <h2>{simonSelection.length ===0?'':'level '+simonSelection.length}</h2>
            <div className ='row'>
                {squares.map((x,i)=>i<3?x:null)}
            </div>
            <div className = 'row'>
                {squares.map((x,i)=>i>=3&&i<6?x:null)}
            </div>
            <div className = 'row'>
                {squares.map((x,i)=>i>=6?x:null)}
            </div>
            <div id ='button'>
                <p id ='display-turn'>
                    {messageDisplay}
                </p>
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