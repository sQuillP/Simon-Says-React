import React, {useState, useEffect} from 'react';
import '../CSS/Square.css';



// Change the color of the square when simon selects it.

const Square = ({id, updatePlayerSelection, currentTurn, selectedSquare, signalNext, toggleSquare})=> {

    const [appliedClasses,updateAppliedClasses] = useState('square');
    const [classChange, updateClassChange] = useState(false);

    const playerMouseDown = () => {
        if(currentTurn === 'player')
        {
            updateAppliedClasses('square toggled');
            updatePlayerSelection(id);
        }
    }

    const playerMouseUp = () => {
            updateAppliedClasses('square');
    }

    useEffect(()=>{
        console.log('square was toggled')
        if(id === selectedSquare)
        {
            console.log(id,selectedSquare);
            const timeout = setTimeout(()=>{
                updateAppliedClasses('square toggled');
                updateClassChange(!classChange);
            },300);
            return ()=> {clearTimeout(timeout)};
        }
        
    },[toggleSquare]);

    useEffect(()=> { 

        const timeout = setTimeout(()=> {
            updateAppliedClasses('square');
            signalNext();
        },300);
        return ()=> {clearTimeout(timeout)};
    },[classChange]);
    




    return (
        <div 
            className = {appliedClasses}
            onMouseDown = {()=>playerMouseDown()}
            onMouseUp = {()=>playerMouseUp()}
        >
        </div>
    );


}



export default Square;