import Header from './Components/FormHeader/FormHeader';
import Question from './Components/Questions/Questions';
import NavigationButtons from './Components/NavigationButtons/Navigation';
import './Form.css';
import { useForm } from '../../Hooks/FormHooks';
import AnswerOption from './Components/Answers/Answers';

import CheckboxAnswerOption from './Components/Checkbox/Checkbox';




const Form: React.FC = () => {
  const { generalIndex, questionIndex, questions, optionss, handleNext, handlePrevious, handleselectedAnswer, selectedAnswer, goback } = useForm();

  return (
    <div>
      
      <Header goback={goback}  />
      <Question 
        currentNumber={"Question " + (generalIndex + 0)}
        text={questions.length > 0 ? questions[questionIndex].pregunta : ""}
        instruction={"Select an answer"}
        imageSrc="" 
        questionIndicator="/path/to/indicator.png"
      />

      <div className="answers">

        {questions[questionIndex]?.id === 9 ? (
          <div className="checkbox-container"> 
            {optionss.map((option: any, index: number) => (
              <CheckboxAnswerOption
                key={index}
                text={option.texto}
                isSelected={Array.isArray(selectedAnswer) && selectedAnswer.includes(index)}
                onChange={() => handleselectedAnswer(index)} 
              />
            ))}
          </div>
        ) : questionIndex < 11 ? (
          optionss.map((option: any, index: number) => (
            <AnswerOption
              Onselect={() => handleselectedAnswer(index)}
              isSelected={selectedAnswer === index}
              key={index}
              text={option.texto}
              iconSrc={option.icon}
            />
          ))
        ) : (
          <input type="text" className='text-imput' placeholder='Type your other concerns here' />
        )}
      </div>

      <NavigationButtons Plusindex={handleNext} Minusindex={handlePrevious} />
    </div>
  );
};

export default Form;

