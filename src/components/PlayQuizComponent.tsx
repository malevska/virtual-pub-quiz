import * as React from "react";
import { Button, Pane, Pill } from "evergreen-ui";
import { Quiz, AppMethods } from "../store/types";
import { useState } from "react";
import { useHistory } from "react-router";
import { PlayersComponent } from "./PlayersComponent";
import { ViewQuestionComponent } from "./ViewQuestionComponent";

export const PlayQuizComponent = (props: {
  quiz: Quiz;
  qIndex: string;
  editPlayersMode: boolean;
  addPlayers: AppMethods["addPlayers"];
  editPlayers: AppMethods["editPlayers"];
}) => {
  const quiz = props.quiz;
  const history = useHistory();

  const [indexes, setIndexes] = useState<{
    catIndex: number;
    quesIndex: number;
  }>({ catIndex: -1, quesIndex: -1 });

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
                setIndexes({
                  quesIndex: quesInd,
                  catIndex: catInd,
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

  if (indexes.quesIndex !== -1)
    return (
      <ViewQuestionComponent
        question={
          props.quiz.categories[indexes.catIndex].questions[indexes.quesIndex]
        }
        catIndex={indexes.catIndex}
        quizIndex={parseInt(props.qIndex, 10)}
        questionIndex={indexes.quesIndex}
      />
    );

  return props.editPlayersMode || quiz.players.length === 0 ? (
    <PlayersComponent
      quiz={props.quiz}
      index={props.qIndex}
      addPlayers={props.addPlayers}
      editPlayers={props.editPlayers}
    />
  ) : (
    quizPane
  );
};
