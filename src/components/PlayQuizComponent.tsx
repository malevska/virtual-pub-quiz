import * as React from "react";

import { Button, Pane, Pill } from "evergreen-ui";
import { Quiz, AppMethods } from "../store/types";

import { useHistory } from "react-router";
import { PlayersComponent } from "./PlayersComponent";

export const PlayQuizComponent = (props: {
  quiz: Quiz;
  index: string;
  editPlayersMode: boolean;
  addPlayers: AppMethods["addPlayers"];
  editPlayers: AppMethods["editPlayers"];
}) => {
  const quiz = props.quiz;
  const history = useHistory();

  const quizPane = (
    <Pane padding="20px">
      {quiz.categories.map((cat, index) => (
        <Pane key={index}>
          <h2>{cat.title}</h2>
          {cat.questions.map((ques, i) => (
            <Pill key={i} margin="5px" isInteractive={true}>
              {ques.points}
            </Pill>
          ))}
        </Pane>
      ))}
      <Button
        margin="5px"
        onClick={() => history.push(`/players/${props.index}`)}
      >
        Edit Players
      </Button>
    </Pane>
  );

  if (props.editPlayersMode) {
    return (
      <PlayersComponent
        quiz={props.quiz}
        index={props.index}
        addPlayers={props.addPlayers}
        editPlayers={props.editPlayers}
      />
    );
  }

  return quiz.players.length > 0 && quiz.isPlaying ? (
    quizPane
  ) : (
    <PlayersComponent
      quiz={props.quiz}
      index={props.index}
      addPlayers={props.addPlayers}
      editPlayers={props.editPlayers}
    />
  );
};
