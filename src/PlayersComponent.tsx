import * as React from "react";
import { useState } from "react";

import { Button, Pane, TextInput } from "evergreen-ui";
import { Quiz } from "./model";

import { addPlayers, editPlayers } from "./index";
import { useHistory } from "react-router";

// Modifies the players list
export const PlayersComponent = (props: { quiz: Quiz; index: string }) => {
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
            ? editPlayers(parseInt(props.index, 10), players)
            : addPlayers(parseInt(props.index, 10), players);
          history.push(`/play/${props.index}`);
        }}
      >
        Play
      </Button>
    </Pane>
  );
};
