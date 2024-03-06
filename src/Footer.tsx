import { useQuestionData } from "./hooks/useQuestionData"
import { Button } from "@mui/material"
import { useQuestionsStore } from "./store/question"



export const Footer =()=>{
   const {correctas,incorrectas,unaswered} = useQuestionData()
   const reset = useQuestionsStore(state => state.reset)
    return(
        <footer style={{marginTop:"16px"}}>
            <strong>{`✅ ${correctas} correctas - ❌ ${incorrectas} incorrectas - ❓ ${unaswered} sin responder`}</strong>
            <div style={{margin: "16px"}}>
                <Button variant="outlined" color="error" onClick={() => reset()}>Reset</Button>

            </div>
        </footer>
    )
}