import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";

import { Button, Pane, TextInput, Pill } from "evergreen-ui";
import { Category } from "./model";

import { QuestionComponent } from "./QuestionComponent";
import { changeCategoryTitle } from "./index";

// Modifies a categry
export const CategoryComponent = (props: {
  category: Category;
  catIndex: number;
  quizIndex: number;
}) => {
  const category = props.category;
  const [categoryTitle, setCategoryTitle] = useState(category.title);
  const [dialogIsShown, setDialogIsShown] = useState<boolean>(false);
  const [qIndex, setQIndex] = useState<number>(-1);
  const [qmode, setQMode] = useState("add");

  return (
    <Pane padding="20px">
      <TextInput
        value={categoryTitle}
        onChange={(e: any) => {
          setCategoryTitle(e.target.value);
        }}
        onBlur={() => {
          changeCategoryTitle(props.quizIndex, props.catIndex, categoryTitle);
        }}
      />
      <Button
        onClick={() => {
          setDialogIsShown(true);
          setQMode("add");
        }}
      >
        Add New Question
      </Button>
      <Pane>
        {category.questions.map((q, index) => (
          <Pill
            key={index}
            display="inline-flex"
            margin={"5px"}
            isInteractive={true}
            color="green"
            isSolid
            onClick={() => {
              setQIndex(index);
              setQMode("edit");
              setDialogIsShown(true);
            }}
          >
            {q.points}
          </Pill>
        ))}
      </Pane>

      {dialogIsShown ? (
        <QuestionComponent
          question={
            qmode === "add"
              ? { text: "", answer: "", embeds: "", points: 0 }
              : props.category.questions[qIndex]
          }
          catIndex={props.catIndex}
          quizIndex={props.quizIndex}
          questionIndex={qIndex}
          mode={qmode}
          dialog={true}
          onClose={() => {
            setDialogIsShown(false);
          }}
        />
      ) : null}
    </Pane>
  );
};
