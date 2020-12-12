import * as React from "react";
import { useState, useContext } from "react";
import { Pane, TextInput, Textarea, Dialog, RadioGroup } from "evergreen-ui";
import { Question } from "../store/types";
import { MethodsContext } from "../store";

// Modifies a question
export const EditQuestionComponent = ({
  question,
  questionIndex,
  catIndex,
  quizIndex,
  mode,
  dialog,
  onClose,
}: {
  question: Question;
  questionIndex: number;
  catIndex: number;
  quizIndex: number;
  mode: string;
  dialog: boolean;
  onClose?: () => void;
}) => {
  const [questionText, setQuestionText] = useState(question.text);
  const [answer, setAnswer] = useState(question.answer);
  const [embedsType, setEmbedsType] = useState(question.embedsType);
  const [embeds, setEmbeds] = useState(question.embeds);
  const [points, setPoints] = useState<number>(question.points);

  const { addQuestion, editQuestion } = useContext(MethodsContext);

  const options: any = [
    { label: "None", value: "none" },
    { label: "Photo", value: "photo" },
    { label: "Video", value: "video" },
  ];

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
      <RadioGroup
        label=""
        value={embedsType}
        options={options}
        onChange={(e: any) => setEmbedsType(e.target.value)}
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
          setPoints(parseInt(e.target.value, 10));
        }}
      />
    </Pane>
  );

  return dialog ? (
    <Dialog
      isShown={true}
      title="Question"
      width={"800px"}
      shouldCloseOnOverlayClick={false}
      onCloseComplete={() => {
        onClose();
        mode === "add"
          ? addQuestion(quizIndex, catIndex, {
              text: questionText,
              answer: answer,
              embedsType: embedsType,
              embeds: embeds,
              points: points,
            })
          : editQuestion(quizIndex, catIndex, questionIndex, {
              text: questionText,
              answer: answer,
              embedsType: embedsType,
              embeds: embeds,
              points: points,
            });
      }}
    >
      {pane}
    </Dialog>
  ) : (
    pane
  );
};
