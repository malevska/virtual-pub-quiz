import * as React from "react";
import { useState } from "react";

import { Button, Pane, TextInput, Heading, Radio } from "evergreen-ui";
import { Question } from "../store/types";

//Shows the question and the list of players that may answer it
export const ViewQuestionComponent = (props: {
  question: Question;
  players: string[];
  onClose: (answerer: number, points: number) => void;
}) => {
  const question = props.question;

  const [showAnswer, setShowAnswer] = useState<boolean>(true);
  const [points, setPoints] = useState<number>(question.points);
  const [answerer, setAnswerer] = useState<number>(-1);

  return (
    <Pane padding="20px">
      <Heading size={900} marginTop="default">
        {question.text}
      </Heading>
      <Button onClick={() => setShowAnswer(false)}>Show Answer</Button>
      <Heading hidden={showAnswer} size={900} marginTop="default">
        {question.answer}
      </Heading>

      <Pane role="players">
        {props.players.map((pl, ind) => {
          return (
            <Radio name="players" label={pl} onClick={() => setAnswerer(ind)} />
          );
        })}
      </Pane>

      <TextInput
        value={points}
        onChange={(e: any) => {
          setPoints(parseInt(e.target.value, 10));
        }}
      />
      <Button onClick={() => props.onClose(answerer, points)}>OK</Button>
    </Pane>
  );
};
