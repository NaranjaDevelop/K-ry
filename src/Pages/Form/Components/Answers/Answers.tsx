import React from 'react';
import './Answers.css';
interface AnswerOptionProps {
    iconSrc: string;  //propiedad para el ícono 
    text: string;
    isSelected: boolean;
    Onselect: () => void;
}


//aqui debe haber un map de esta respuesta para que se muestren todas las opciones desde firebase
const AnswerOption: React.FC<AnswerOptionProps> = ({ text, Onselect, isSelected, iconSrc }) => {
    return (
        <div 
            className={`answer-option ${isSelected ? 'selected' : ''}`} 
            onClick={() => Onselect()}
        >
            <img src={iconSrc} alt="icon" />
            <p>{text}</p>
        </div>
    );
};

export default AnswerOption;
