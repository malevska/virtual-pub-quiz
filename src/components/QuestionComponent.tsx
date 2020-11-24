import * as React from "react";
import { useState } from "react";

import { Button, Pane, TextInput, Textarea, Dialog } from "evergreen-ui";
import { Question, AppMethods } from "../store/types";

// Modifies a question
export const QuestionComponent = (props: {
  question: Question;
  questionIndex: number;
  catIndex: number;
  quizIndex: number;
  mode: string;
  dialog: boolean;
  onClose?: () => void;
  addQuiestion: AppMethods["addQuestion"];
  editQuestion: AppMethods["editQuestion"];
}) => {
  const question = props.question;

  const [questionText, setQuestionText] = useState(question.text);
  const [answer, setAnswer] = useState(question.answer);
  const [embeds, setEmbeds] = useState(question.embeds);
  const [points, setPoints] = useState(question.points);

  const pane = (
    <Pane padding="20px">
      <Textarea
        value={questionText}
        placeholder="Question text"
        onChange={(e: any) => setQuestionText(e.target.value)}
      />
      <Textarea
        value={answer}
        placeholder="Answer"
        onChange={(e: any) => setAnswer(e.target.value)}
      />
      <Textarea
        value={embeds}
        placeholder="Link"
        onChange={(e: any) => setEmbeds(e.target.value)}
      />
      <TextInput
        type={"number"}
        value={points}
        onChange={(e: any) => {
          setPoints(e.target.value);
        }}
      />
    </Pane>
  );

  return props.dialog ? (
    <Dialog
      isShown={true}
      title="Question"
      width={"800px"}
      shouldCloseOnOverlayClick={false}
      onCloseComplete={() => {
        props.onClose();
        props.mode === "add"
          ? props.addQuiestion(props.quizIndex, props.catIndex, {
              text: questionText,
              answer: answer,
              embeds: embeds,
              points: points,
            })
          : props.editQuestion(
              props.quizIndex,
              props.catIndex,
              props.questionIndex,
              {
                text: questionText,
                answer: answer,
                embeds: embeds,
                points: points,
              }
            );
      }}
    >
      {pane}
    </Dialog>
  ) : (
    pane
  );
};
