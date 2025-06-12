import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dataform from '../utils/Formsdata'

export const useForm = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [optionvalue, setOptionvalue] = useState<any>({});
    const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null);
    const [generalIndex, setGeneralIndex] = useState<number>(0);

    const navigate = useNavigate();

    useEffect(() => {
        setQuestions(dataform.formulario);
        setOptionvalue({});
    }, []);

    const optionss = questions.length > 0 ? questions[questionIndex].opciones : [];

    const handleNext = () => {
        if (questionIndex === questions.length - 1) {
            navigate("/home", { state: { optionvalue } });
            return;
        } else {
            const selectedAnswervalue = selectedAnswer;
            if (selectedAnswervalue === null) {
                return;
            }
            const nextquestion = Array.isArray(selectedAnswervalue)
                ? questionIndex + 1
                : optionss[selectedAnswervalue]?.next ?? questionIndex + 1;
            setQuestionIndex(nextquestion);
            setGeneralIndex(generalIndex + 1);
            setSelectedAnswer(null);
        }
    };

    const goback = () => {
        navigate("/Dashboard");
    };

    const handlePrevious = () => {
        setGeneralIndex(0);
        setQuestionIndex(0);
        setSelectedAnswer(null);
        setOptionvalue({});
    };

    const handleselectedAnswer = (index: number) => {
        // Selección única
        setSelectedAnswer(index);
        const selectedOption = optionss[index];
        const merged = { ...optionvalue };
        Object.keys(selectedOption).forEach(key => {
            merged[key] = selectedOption[key];
        });
        setOptionvalue(merged);
    };

    return {
        questions,
        questionIndex,
        optionss,
        selectedAnswer,
        optionvalue,
        handleNext,
        goback,
        handlePrevious,
        handleselectedAnswer,
        generalIndex,
    };
};