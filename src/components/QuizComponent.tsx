import * as React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Pane, TextInput } from "evergreen-ui";
import { Quiz } from "../store/types";
import { CategoryComponent } from "./CategoryComponent";
import { MethodsContext } from "../store";

// Modifies a quiz
export const QuizComponent = ({
  quiz,
  qIndex,
}: {
  quiz: Quiz;
  qIndex: string;
}) => {
  const [quizTitle, setNewQuizTitle] = useState(quiz.title);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const methods = useContext(MethodsContext);

  return (
    <Pane padding="20px">
      <TextInput
        value={quizTitle}
        onChange={(e: any) => {
          setNewQuizTitle(e.target.value);
        }}
        onBlur={() => {
          methods.replaceQuiz(parseInt(qIndex, 10), {
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
        <Button
          onClick={() => {
            methods.addCategory(parseInt(qIndex, 10), newCategoryTitle);
            setNewCategoryTitle("");
          }}
        >
          Add New Category
        </Button>
        <h1>All Categories</h1>

        {quiz.categories.map((cat, index) => (
          <CategoryComponent
            key={index}
            category={cat}
            catIndex={index}
            quizIndex={parseInt(qIndex, 10)}
          />
        ))}

        <Link to="/">Back to All Quizzes</Link>
      </Pane>
    </Pane>
  );
};
