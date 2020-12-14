import * as React from "react";
import { useState, useContext } from "react";
import { Button, Pane, TextInput, Pill } from "evergreen-ui";
import { Category, Question } from "../store/types";
import { EditQuestionComponent } from "./EditQuestionComponent";
import { MethodsContext } from "../store";

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
  const {
    editCategory,
    removeCategory,
    addQuestion,
    editQuestion,
    removeQuestion,
  } = useContext(MethodsContext);

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
        }}
      >
        Add New Question
      </Button>
      <Pane>
        {category.questions.map((q, index) => (
          <Pane>
            <Pill
              key={q.id}
              display="inline-flex"
              margin={"5px"}
              isInteractive={true}
              color="green"
              isSolid
              onClick={() => {
                setQIndex(index);
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
          question={qIndex === -1 ? null : category.questions[qIndex]}
          dialog={true}
          onClose={(q?: Question) => {
            if (q) {
              q.id
                ? editQuestion(quizIndex, catIndex, qIndex, q)
                : addQuestion(quizIndex, catIndex, q);
            }
            setDialogIsShown(false);
            setQIndex(-1);
          }}
        />
      ) : null}
    </Pane>
  );
};
