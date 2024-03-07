export interface Question {
  index: number;
  pregunta: string;
  opciones_respuestas: string[];
  respuesta_correcta: number;
  UserSelectAnswer?:number;
  isCorrectUserAnswer?:boolean;

};