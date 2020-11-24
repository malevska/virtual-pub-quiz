import * as React from "react";
import { useState } from "react";

import { Button, Pane, TextInput, Textarea, Heading } from "evergreen-ui";
import { Question } from "../store/types";
import { addQuestion, editQuestion } from "../index";

// Modifies a question
export const ViewQuestionComponent = (props: {
  question: Question;
  questionIndex: number;
  catIndex: number;
  quizIndex: number;
}) => {
  const question = props.question;

  const [showAnswer, setShowAnswer] = useState<boolean>(true);
  const [points, setPoints] = useState(question.points);

  return (
    <Pane padding="20px">
      <Heading size={900} marginTop="default">
        {question.text}
      </Heading>
      <Button onClick={() => setShowAnswer(false)}>Show Answer</Button>
      <Heading hidden={showAnswer} size={900} marginTop="default">
        {question.answer}
      </Heading>
    </Pane>
  );
};
