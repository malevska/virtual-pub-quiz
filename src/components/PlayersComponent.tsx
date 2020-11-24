import * as React from "react";
import { useState } from "react";
import { Button, Pane, TextInput } from "evergreen-ui";
import { Quiz, AppMethods } from "../store/types";
import { PlayQuizComponent } from "./PlayQuizComponent";

// Modifies the players list
export const PlayersComponent = (props: {
  quiz: Quiz;
  index: string;
  setPlayers: AppMethods["setPlayers"];
  onClose: () => void;
}) => {
  const quiz = props.quiz;
  const [newPlayerName, setNewPlayerName] = useState("");
  const [playersList, setPlayersList] = useState<string[]>(props.quiz.players);

  const onClickHandler = () => {
    setPlayersList([...playersList, newPlayerName]);
    setNewPlayerName("");
  };

  return (
    <Pane padding="20px">
      <h1>{quiz.title} - Players</h1>

      <Pane>
        <TextInput
          placeholder="Player"
          value={newPlayerName}
          onChange={(e: any) => setNewPlayerName(e.target.value)}
        />
        <Button onClick={onClickHandler}>Add Player</Button>
        <Pane>
          {playersList.map((p, ind) => (
            <TextInput
              key={ind}
              defaultValue={p}
              onBlur={(e: any) => (playersList[ind] = e.target.value)}
            />
          ))}
        </Pane>
      </Pane>

      <Button
        onClick={() => {
          props.setPlayers(parseInt(props.index, 10), playersList);
          props.onClose();
        }}
      >
        Play
      </Button>
    </Pane>
  );
};
