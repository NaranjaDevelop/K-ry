import Header from './Components/FormHeader/FormHeader';
import Question from './Components/Questions/Questions';
import NavigationButtons from './Components/NavigationButtons/Navigation';
import './Form.css';
import { useForm } from '../../Hooks/FormHooks';
import AnswerOption from './Components/Answers/Answers';

import CheckboxAnswerOption from './Components/Checkbox/Checkbox';
import logo from '../../assets/K-RY.png'



const Form: React.FC = () => {
  const { generalIndex, questionIndex, questions, optionss, handleNext, handlePrevious, handleselectedAnswer, selectedAnswer, goback } = useForm();

  return (
    <div>
      
      <Header goback={goback}  />
      <Question 
        currentNumber={"pregunta " + (generalIndex + 1)}
        text={questions.length > 0 ? questions[questionIndex].pregunta : ""}
        instruction={"Select an answer"}
        imageSrc={logo} 
        questionIndicator="/path/to/indicator.png"
      />

      <div className="answers">

        { optionss.map((option: any, index: number) => (
            <AnswerOption
              Onselect={() => handleselectedAnswer(index)}
              isSelected={selectedAnswer === index}
              key={index}
              text={option.texto}
              iconSrc={option.icon}
            />
          ))
        }
      </div>

      <NavigationButtons Plusindex={handleNext} Minusindex={handlePrevious} />
    </div>
  );
};

export default Form;

