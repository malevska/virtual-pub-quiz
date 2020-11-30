import * as React from "react";
import { Button, Pane, Pill, Table } from "evergreen-ui";
import { Quiz, AppMethods } from "../store/types";
import { useState } from "react";
import { PlayersComponent } from "./PlayersComponent";
import { ViewQuestionComponent } from "./ViewQuestionComponent";

export const PlayQuizComponent = (props: {
  quiz: Quiz;
  qIndex: string;
  setPlayers: AppMethods["setPlayers"];
}) => {
  const quiz = props.quiz;
  const [showPlayersScreen, setShowPlayersScreen] = useState<boolean>(false);

  const [indexes, setIndexes] = useState<{
    catIndex: number;
    quesIndex: number;
  }>({ catIndex: -1, quesIndex: -1 });

  //const calculateScore = (q: Quiz, index: number, points: number) => {};

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
      <Button margin="5px" onClick={() => setShowPlayersScreen(true)}>
        Edit Players
      </Button>

      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Score</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {quiz.players.map((pl, ind) => (
            <Table.Row key={ind}>
              <Table.TextCell>{pl}</Table.TextCell>
              <Table.TextCell>{5}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );

  if (indexes.quesIndex !== -1)
    return (
      <ViewQuestionComponent
        question={
          props.quiz.categories[indexes.catIndex].questions[indexes.quesIndex]
        }
        players={quiz.players}
        onClose={(answerer: number, points: number) => {
          //calculate
          setIndexes({ quesIndex: -1, catIndex: -1 });
        }}
      />
    );

  return showPlayersScreen || quiz.players.length === 0 ? (
    <PlayersComponent
      quiz={quiz}
      onFinish={(playersList) => {
        props.setPlayers(parseInt(props.qIndex, 10), playersList);
        setShowPlayersScreen(false);
      }}
    />
  ) : (
    quizPane
  );
};
