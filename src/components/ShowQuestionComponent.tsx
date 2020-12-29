import * as React from "react";
import { useState } from "react";
import {
  Button,
  Pane,
  TextInput,
  Heading,
  Radio,
  majorScale,
  minorScale,
  Dialog,
} from "evergreen-ui";
import { Question } from "../store/types";
import ReactPlayer from "react-player";
import { v4 as uuidv4 } from "uuid";

//Shows the question and the list of players that may answer it
export const ShowQuestionComponent = ({
  question,
  players,
  onClose,
}: {
  question: Question;
  players: string[];
  onClose: (answerer: number, points: number) => void;
}) => {
  const [points, setPoints] = useState<number>(question.points);
  const [answerer, setAnswerer] = useState<number>(-1);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

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

        <Button margin={majorScale(4)} onClick={() => setShowAnswer(true)}>
          Show Answer
        </Button>

        <Dialog
          isShown={showAnswer}
          title="Answer"
          width="50%"
          shouldCloseOnOverlayClick={true}
          hasFooter={false}
          onCloseComplete={() => {
            setShowAnswer(false);
          }}
        >
          <Heading size={900} margin={majorScale(4)}>
            {question.text}
          </Heading>
          <Heading size={900} margin={majorScale(4)}>
            {question.answer}
          </Heading>
        </Dialog>
      </Pane>

      <Pane
        marginLeft={majorScale(11)}
        marginRight={majorScale(11)}
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
        <Pane
          role="players"
          marginRight={majorScale(1)}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          {players.map((pl, ind) => {
            return (
              <Radio
                marginRight={majorScale(1)}
                key={uuidv4()}
                name="players"
                label={pl}
                onClick={() => setAnswerer(ind)}
                size={16}
              />
            );
          })}
        </Pane>
        <Pane>
          <TextInput
            margin={minorScale(1)}
            width="50px"
            defaultValue={points}
            onBlur={(e: any) => {
              setPoints(parseInt(e.target.value, 10));
            }}
          />
          <Button
            margin={minorScale(1)}
            width="50px"
            onClick={() => onClose(answerer, points)}
          >
            OK
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};
