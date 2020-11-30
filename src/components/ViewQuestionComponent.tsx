import * as React from "react";
import { useState } from "react";

import { Button, Pane, TextInput, Heading, Table } from "evergreen-ui";
import { Question } from "../store/types";

// Modifies a question
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
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
        </Table.Head>
        <Table.Body height={240}>
          {props.players.map((pl, ind) => (
            <Table.Row key={ind} isSelectable onSelect={() => setAnswerer(ind)}>
              <Table.TextCell>{pl}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <TextInput
        name="text-input-name"
        value={points}
        onChange={(e: any) => {
          setPoints(parseInt(e.target.value, 10));
        }}
      />
      <Button onClick={() => props.onClose(answerer, points)}>Close</Button>
    </Pane>
  );
};
