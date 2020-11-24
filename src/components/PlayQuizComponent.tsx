import * as React from "react";
import { Button, Pane, Pill } from "evergreen-ui";
import { Quiz, Question } from "../store/types";
import { useState } from "react";
import { useHistory } from "react-router";
import { PlayersComponent } from "./PlayersComponent";
import { ViewQuestionComponent } from "./ViewQuestionComponent";

export const PlayQuizComponent = (props: {
  quiz: Quiz;
  qIndex: string;
  editPlayersMode: boolean;
}) => {
  const quiz = props.quiz;
  const history = useHistory();

  const [questionData, setQuestionData] = useState<{
    questIndex: number;
    catIndex: number;
    question: Question;
  }>({
    questIndex: -1,
    catIndex: -1,
    question: null,
  });

  const quizPane = (
    <Pane padding="20px">
      {quiz.categories.map((cat, catInd) => (
        <Pane key={catInd}>
          <h2>{cat.title}</h2>
          {cat.questions.map((ques, quesInd) => (
            <Pill
              key={quesInd}
              margin="5px"
              isInteractive={true}
              onClick={() => {
                setQuestionData({
                  questIndex: quesInd,
                  catIndex: catInd,
                  question: ques,
                });
              }}
            >
              {ques.points}
            </Pill>
          ))}
        </Pane>
      ))}
      <Button
        margin="5px"
        onClick={() => history.push(`/players/${props.qIndex}`)}
      >
        Edit Players
      </Button>
    </Pane>
  );

  if (props.editPlayersMode) {
    return <PlayersComponent quiz={props.quiz} index={props.qIndex} />;
  }

  if (questionData.questIndex !== -1)
    return (
      <ViewQuestionComponent
        question={questionData.question}
        catIndex={questionData.catIndex}
        quizIndex={parseInt(props.qIndex, 10)}
        questionIndex={questionData.questIndex}
      />
    );

  return quiz.players.length > 0 && quiz.isPlaying ? (
    quizPane
  ) : (
    <PlayersComponent quiz={props.quiz} index={props.qIndex} />
  );
};
