import * as React from "react";
import { useState, useContext } from "react";

import { Button, Pane, TextInput } from "evergreen-ui";

import { Quiz } from "../store/types";

import { CategoryComponent } from "./CategoryComponent";
import { MethodsContext } from "../store";

// Modifies a quiz
export const QuizComponent = (props: { quiz: Quiz; index: string }) => {
  const quiz = props.quiz;

  const [quizTitle, setNewQuizTitle] = useState(quiz.title);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const methods = useContext(MethodsContext);

  const onClickHandler = () => {
    methods.addCategory(parseInt(props.index, 10), newCategoryTitle);
    setNewCategoryTitle("");
  };

  return (
    <Pane padding="20px">
      <TextInput
        value={quizTitle}
        onChange={(e: any) => {
          setNewQuizTitle(e.target.value);
        }}
        onBlur={() => {
          methods.replaceQuiz(parseInt(props.index, 10), {
            ...quiz,
            title: quizTitle,
          });
        }}
      />
      <Pane>
        <TextInput
          placeholder="Category Title"
          value={newCategoryTitle}
          onChange={(e: any) => setNewCategoryTitle(e.target.value)}
        />
        <Button onClick={onClickHandler}>Add New Category</Button>
        <h1>All Categories</h1>

        {quiz.categories.map((cat, index) => (
          <CategoryComponent
            key={index}
            category={cat}
            catIndex={index}
            quizIndex={parseInt(props.index, 10)}
            editCategory={methods.editCategory}
            addQuestion={methods.addQuestion}
            editQuestion={methods.editQuestion}
          />
        ))}

        {/* <a href="/">Back to Quizzes</a> */}
      </Pane>
    </Pane>
  );
};
