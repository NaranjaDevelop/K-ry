import React from 'react';
import '../NavigationButtons/Navigation.css';
interface NavigationProps {
    Plusindex: () => void;
    Minusindex: () => void;
}

const NavigationButtons: React.FC<NavigationProps> = ({ Plusindex, Minusindex }) => {
    return (
        <div className='buttons-container'>
            <button className='back' onClick={Minusindex}>Restart</button>
            <button className='next' onClick={Plusindex}>Next</button>
        </div>
    );
};

export default NavigationButtons;
