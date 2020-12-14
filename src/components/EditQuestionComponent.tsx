import * as React from "react";
import { useState, useContext } from "react";
import { Pane, TextInput, Textarea, Dialog, RadioGroup } from "evergreen-ui";
import { EmbedsType, Question } from "../store/types";

// Modifies a question
export const EditQuestionComponent = ({
  question,
  dialog,
  onClose,
}: {
  question: Question;
  dialog: boolean;
  onClose?: (q?: Question) => void;
}) => {
  const [questionText, setQuestionText] = useState(
    question ? question.text : ""
  );
  const [answer, setAnswer] = useState(question ? question.answer : "");
  const [embedsType, setEmbedsType] = useState<EmbedsType>(
    question ? question.embedsType : "none"
  );
  const [embeds, setEmbeds] = useState(question ? question.embeds : "");
  const [points, setPoints] = useState<number>(question ? question.points : 0);

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
      onConfirm={() => {
        const newQuestion = {
          id: question ? question.id : null,
          text: questionText,
          answer: answer,
          embedsType: embedsType,
          embeds: embeds,
          points: points,
        };
        onClose(newQuestion);
      }}
      onCancel={() => {
        onClose();
      }}
    >
      {pane}
    </Dialog>
  ) : (
    pane
  );
};
