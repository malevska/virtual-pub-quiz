import * as React from "react";
import { useState } from "react";

import { Button, Pane, TextInput } from "evergreen-ui";

import { Quiz, AppMethods } from "../store/types";

import { CategoryComponent } from "./CategoryComponent";

// Modifies a quiz
export const QuizComponent = (props: {
  quiz: Quiz;
  index: string;
  addCategory: AppMethods["addCategory"];
  changeQuizTitle: AppMethods["changeQuizTitle"];
  changeCategoryTitle: AppMethods["changeCategoryTitle"];
  addQuestion: AppMethods["addQuestion"];
  editQuestion: AppMethods["editQuestion"];
}) => {
  const quiz = props.quiz;

  const [quizTitle, setNewQuizTitle] = useState(quiz.title);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const onClickHandler = () => {
    props.addCategory(parseInt(props.index, 10), newCategoryTitle);
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
          props.changeQuizTitle(parseInt(props.index, 10), quizTitle);
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
            changeCategoryTitle={props.changeCategoryTitle}
            addQuestion={props.addQuestion}
            editQuestion={props.editQuestion}
          />
        ))}

        {/* <a href="/">Back to Quizzes</a> */}
      </Pane>
    </Pane>
  );
};
