
import { Container, Stack, Typography } from "@mui/material";
import { Game } from "./Game";
import "./App.css";
import digimonLogo from "/digimon.png"
import {Start} from "./Start"
import { useQuestionsStore } from "./store/question";

function App() {
  const questions = useQuestionsStore(state => state.questions)
  return (
    <>
      <Container maxWidth="sm">
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <img src={digimonLogo} alt="aaaa" style={{ width: '100px', height: 'auto' }} />
          <Typography variant="h2" component="h1">
           Digimon quiz!!!
          </Typography>
        </Stack>
        {questions.length === 0 && <Start/>}
        {questions.length > 0 && <Game/>}
      </Container>
    </>
  );
}

export default App;
