import React, {useState, useEffect} from 'react';
import '../CSS/Square.css';




// Change the color of the square when simon selects it.

const Square = ({id, selectedSquare, signalNext, squareToggled, playerSelection,playerToggle})=> {
    
    const [classes,updateClasses] = useState('square')
    const [classChange,updateClassChange] = useState(false);

    /*Code for the Simon's selection*/
    useEffect(()=> {
        if(selectedSquare === id)
        {
            const timeoutID = setTimeout(()=> {
                updateClassChange(!classChange);
            },300);
            return ()=> {clearTimeout(timeoutID);}
        }
    },[squareToggled]);
    

    useEffect(()=>{
        if(selectedSquare === id)
        {
            const timeout = setTimeout(()=>{
                updateClasses('square');
                signalNext();
            },300);
            return ()=>{
                clearTimeout(timeout);
            }
        }
    },[classChange]);


    return (
        <div 
            className = {classes}>
        </div>
    );


}



export default Square;