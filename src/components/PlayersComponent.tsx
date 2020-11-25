import * as React from "react";
import { useState } from "react";
import { Button, Pane, TextInput } from "evergreen-ui";
import { Quiz, AppMethods } from "../store/types";
import { PlayQuizComponent } from "./PlayQuizComponent";

// Modifies the players list
export const PlayersComponent = (props: {
  quiz: Quiz;
  index: string;
  onFinish: (players: string[]) => void;
}) => {
  const quiz = props.quiz;
  const [newPlayerName, setNewPlayerName] = useState("");
  const [playersList, setPlayersList] = useState<string[]>(props.quiz.players);

  return (
    <Pane padding="20px">
      <h1>{quiz.title} - Players</h1>

      <Pane>
        <TextInput
          placeholder="Player"
          value={newPlayerName}
          onChange={(e: any) => setNewPlayerName(e.target.value)}
        />
        <Button
          onClick={() => {
            setPlayersList([...playersList, newPlayerName]);
            setNewPlayerName("");
          }}
        >
          Add Player
        </Button>
        <Pane>
          {playersList.map((p, ind) => (
            <TextInput
              key={ind}
              defaultValue={p}
              onBlur={(e: any) =>
                setPlayersList([
                  ...playersList.slice(0, ind),
                  e.target.value,
                  ...playersList.slice(ind + 1),
                ])
              }
            />
          ))}
        </Pane>
      </Pane>

      <Button
        onClick={() => {
          props.onFinish(playersList);
        }}
      >
        Play
      </Button>
    </Pane>
  );
};
