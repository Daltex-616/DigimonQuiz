import { useQuestionsStore } from "../store/question"

export const useQuestionData= ()=>{
    const questions = useQuestionsStore(state => state.questions)
    let correctas = 0
    let incorrectas = 0
    let unaswered = 0

    questions.forEach(question =>{
        const {UserSelectAnswer,respuesta_correcta} = question
        if(UserSelectAnswer == null) unaswered++
        else if(UserSelectAnswer == respuesta_correcta) correctas++
        else incorrectas++
    })
    return{correctas,incorrectas,unaswered}
}