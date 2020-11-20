import * as React from "react";
import { useState } from "react";

import { Button, Pane, TextInput } from "evergreen-ui";
import { Quiz, AppMethods } from "../store/types";

import { useHistory } from "react-router";

// Modifies the players list
export const PlayersComponent = (props: {
  quiz: Quiz;
  index: string;
  addPlayers: AppMethods["addPlayers"];
  editPlayers: AppMethods["editPlayers"];
}) => {
  const quiz = props.quiz;
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>(props.quiz.players);
  const history = useHistory();

  const onClickHandler = () => {
    setPlayers([...players, newPlayerName]);
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
          {players.map((p, ind) => (
            <TextInput
              key={ind}
              defaultValue={p}
              onBlur={(e: any) => (players[ind] = e.target.value)}
            />
          ))}
        </Pane>
      </Pane>

      <Button
        onClick={() => {
          props.quiz.players.length > 0
            ? props.editPlayers(parseInt(props.index, 10), players)
            : props.addPlayers(parseInt(props.index, 10), players);
          history.push(`/play/${props.index}`);
        }}
      >
        Play
      </Button>
    </Pane>
  );
};
