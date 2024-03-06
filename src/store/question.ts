import {create} from "zustand"
import { type Question } from "../types"
import confetti from "canvas-confetti"
import { persist } from "zustand/middleware"

interface State{
    questions: Question[],
    currentQuestion:number,
    fetchQuestion:(limit:number)=>Promise <void>
    selectAnwser: (questionId: number, anwserIndex:number)=> void
    goNextQuestion :() => void
    goPreviousQuestion:()=> void
    reset : () =>void
}

export const useQuestionsStore = create<State>()(persist((set,get)=>{
    return{
        questions: [],
        currentQuestion:0,
        fetchQuestion: async (limit:number)=>{
            const res =await fetch("http://localhost:3000/preguntas_respuestas")
            const json = await res.json()

            const questions = json.sort(() => Math.random()-0.5).slice(0,limit)
            set({questions})
        },
        selectAnwser:(questionId:number, anwserIndex:number) =>{
            const {questions}= get()
            const newQuestions = structuredClone(questions) 
            const questionIndex = newQuestions.findIndex(q => q.id ===questionId)
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer = questionInfo.respuesta_correcta === anwserIndex
            if(isCorrectUserAnswer) confetti()
            newQuestions[questionIndex] = {
                ...questionInfo ,
                isCorrectUserAnswer,
                UserSelectAnswer:anwserIndex
            }
            set ({questions: newQuestions})

        },
        goNextQuestion: () => {
            const {currentQuestion, questions} = get()
            const nextQuestion = currentQuestion +1 
            if(nextQuestion < questions.length){
                set({currentQuestion:nextQuestion})
            }
        },
        goPreviousQuestion : () =>{
            const {currentQuestion} = get()
            const previousQuestion = currentQuestion -1

            if (previousQuestion >= 0){
                set({currentQuestion:previousQuestion})
            }
        },
        reset : () =>{
            set({currentQuestion: 0, questions: []})
        }
    }
} , {name:"questions"}
))