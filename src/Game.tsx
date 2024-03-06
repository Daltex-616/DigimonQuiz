import {
  IconButton,
  Stack,
  Card,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";
import { Footer } from "./Footer";
import { useQuestionsStore } from "./store/question";
import { type Question as QuestionType } from "./types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { UserSelectAnswer, respuesta_correcta } = info;
  if (UserSelectAnswer == null) return "transparent";
  if (index !== respuesta_correcta && index !== UserSelectAnswer) return "transparent";
  if (index === respuesta_correcta) return "green";
  if (index === UserSelectAnswer) return "red";
  
  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnwser = useQuestionsStore((state) => state.selectAnwser);

  const createHandleClick = (anwserIndex: number) => () => {
    selectAnwser(info.id, anwserIndex);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}
      >
        <Typography variant="h5">{info.pregunta}</Typography>

        <List sx={{ bgcolor: "#333", marginTop: 4 }} disablePadding>
          {info.opciones_respuestas.map((respuestas, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.UserSelectAnswer != null}
                onClick={createHandleClick(index)}
                sx={{ backgroundColor: getBackgroundColor(info, index) }}
              >
                <ListItemText primary={respuestas} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};
export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state)=> state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore((state)=>state.goPreviousQuestion)
  const questionInfo = questions[currentQuestion];
  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion ===0 }>
          <ArrowBackIosNew/>
        </IconButton>
        {currentQuestion +1 } / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length -1 }>
          <ArrowForwardIos/>
        </IconButton>

      </Stack>
      <Question info={questionInfo} />
      <Footer/>
    </>
  );
};
