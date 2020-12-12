import * as React from "react";
import { useState, useContext } from "react";
import { Button, Pane, TextInput, Pill } from "evergreen-ui";
import { Category } from "../store/types";
import { EditQuestionComponent } from "./EditQuestionComponent";
import { MethodsContext } from "../store";
import { v4 as uuidv4 } from "uuid";

// Modifies a categry
export const EditCategoryComponent = ({
  category,
  catIndex,
  quizIndex,
}: {
  category: Category;
  catIndex: number;
  quizIndex: number;
}) => {
  const [categoryTitle, setCategoryTitle] = useState(category.title);
  const [dialogIsShown, setDialogIsShown] = useState<boolean>(false);
  const [qIndex, setQIndex] = useState<number>(-1);
  const [qmode, setQMode] = useState("add");
  const { editCategory, removeCategory, removeQuestion } = useContext(
    MethodsContext
  );

  return (
    <Pane padding="20px">
      <TextInput
        value={categoryTitle}
        onChange={(e: any) => {
          setCategoryTitle(e.target.value);
        }}
        onBlur={() => {
          editCategory(quizIndex, catIndex, categoryTitle);
        }}
      />
      <Button
        onClick={() => {
          removeCategory(quizIndex, catIndex);
        }}
      >
        Remove Category
      </Button>
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
          <Pane>
            <Pill
              key={uuidv4()}
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
            <Button
              onClick={() => {
                removeQuestion(quizIndex, catIndex, index);
              }}
            >
              Remove Question
            </Button>
          </Pane>
        ))}
      </Pane>

      {dialogIsShown ? (
        <EditQuestionComponent
          question={
            qmode === "add"
              ? {
                  text: "",
                  answer: "",
                  embedsType: "none",
                  embeds: "",
                  points: 0,
                }
              : category.questions[qIndex]
          }
          catIndex={catIndex}
          quizIndex={quizIndex}
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
