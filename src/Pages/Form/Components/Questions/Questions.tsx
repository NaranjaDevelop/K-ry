import React from 'react';
import '../Questions/Question.css';


interface QuestionProps {
  currentNumber: any;  // Ejemplo: "1 of 6"
  text: string;  // El texto de la pregunta
  instruction: string;  // Instrucción, por ejemplo "Select one option"
  imageSrc: string;  // URL o ruta de la imagen en la esquina superior derecha
  questionIndicator: string;  // Ruta de imagen o ícono para el indicador de pregunta
}

const Question: React.FC<QuestionProps> = ({ currentNumber, text, instruction }) => {
    return (
        <div className="question-container">
            <div className="question-indicator">
                <p className="question-number">{currentNumber} de 6</p>
            </div>
            <div className="question-text">
                <h2>{text}</h2>
                <p className="question-instruction">{instruction}</p>    
            </div>
        </div>
    );
};

export default Question;
