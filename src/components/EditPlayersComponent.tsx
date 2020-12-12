import * as React from "react";
import { useState } from "react";
import { Button, Pane, TextInput } from "evergreen-ui";
import { Quiz } from "../store/types";
import { v4 as uuidv4 } from "uuid";

// Modifies the players list
export const EditPlayersComponent = ({
  quiz,
  onFinish,
}: {
  quiz: Quiz;
  onFinish: (players: string[]) => void;
}) => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [playersList, setPlayersList] = useState<string[]>(quiz.players);

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
              key={uuidv4()}
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
          onFinish(playersList);
        }}
      >
        Play
      </Button>
    </Pane>
  );
};
