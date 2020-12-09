import * as React from "react";
import { useState } from "react";
import { Button, Pane, TextInput, Heading, Radio } from "evergreen-ui";
import { Question } from "../store/types";
import ReactPlayer from "react-player";
import { QuestionComponent } from "./QuestionComponent";

//Shows the question and the list of players that may answer it
export const ViewQuestionComponent = ({
  question,
  players,
  onClose,
}: {
  question: Question;
  players: string[];
  onClose: (answerer: number, points: number) => void;
}) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(true);
  const [points, setPoints] = useState<number>(question.points);
  const [answerer, setAnswerer] = useState<number>(-1);

  return (
    <Pane padding="20px">
      <Heading size={900} marginTop="default">
        {question.text}
      </Heading>
      {question.embedsType === "none" ? null : question.embedsType ===
        "photo" ? (
        <img src={question.embeds}></img>
      ) : (
        <ReactPlayer url={question.embeds} />
      )}
      <Button onClick={() => setShowAnswer(false)}>Show Answer</Button>
      <Heading hidden={showAnswer} size={900} marginTop="default">
        {question.answer}
      </Heading>
      <Pane role="players">
        {players.map((pl, ind) => {
          return (
            <Radio
              key={ind}
              name="players"
              label={pl}
              onClick={() => setAnswerer(ind)}
            />
          );
        })}
      </Pane>
      <TextInput
        defaultValue={points}
        onBlur={(e: any) => {
          setPoints(parseInt(e.target.value, 10));
        }}
      />
      <Button onClick={() => onClose(answerer, points)}>OK</Button>
    </Pane>
  );
};
