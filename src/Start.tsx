import { Button } from "@mui/material"
import {useQuestionsStore} from "./store/question"

const LIMIT_QUESTION = 15
export const Start=() =>{
    const fetchQuestion =useQuestionsStore(state => state.fetchQuestion) 

    const handleClick =() =>{
        fetchQuestion(LIMIT_QUESTION)
    }
    return (
        <Button onClick={handleClick} variant="contained">
            !Empezar!
        </Button>
        )
}