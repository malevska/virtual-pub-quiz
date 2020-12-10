import * as React from "react";
import { useState } from "react";
import {
  Button,
  Pane,
  TextInput,
  Heading,
  Radio,
  majorScale,
} from "evergreen-ui";
import { Question } from "../store/types";
import ReactPlayer from "react-player";

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
    <Pane
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flex="1 0 auto"
      height="100%"
      marginBottom="0"
    >
      <Pane
        margin={majorScale(11)}
        padding={majorScale(3)}
        flexWrap="wrap"
        flex="1 0 auto"
        background="white"
        width="70%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderRadius={majorScale(1)}
      >
        <Heading
          size={900}
          marginTop={majorScale(8)}
          marginBottom={majorScale(4)}
          color="#363336"
        >
          {question.text}
        </Heading>

        {question.embedsType === "none" ? null : question.embedsType ===
          "photo" ? (
          <img src={question.embeds} />
        ) : (
          <ReactPlayer url={question.embeds} />
        )}

        <Button margin={majorScale(4)} onClick={() => setShowAnswer(false)}>
          Show Answer
        </Button>

        <Heading hidden={showAnswer} size={900} margin={majorScale(4)}>
          {question.answer}
        </Heading>
      </Pane>

      <Pane>
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

          <TextInput
            defaultValue={points}
            onBlur={(e: any) => {
              setPoints(parseInt(e.target.value, 10));
            }}
          />
          <Button onClick={() => onClose(answerer, points)}>OK</Button>
        </Pane>
      </Pane>
    </Pane>
  );
};
