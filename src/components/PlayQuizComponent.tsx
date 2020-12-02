import * as React from "react";
import { Button, Pane, Pill, Table } from "evergreen-ui";
import { Quiz, Category } from "../store/types";
import { useState, useContext } from "react";
import { PlayersComponent } from "./PlayersComponent";
import { ViewQuestionComponent } from "./ViewQuestionComponent";
import { MethodsContext } from "../store";
import { Link } from "react-router-dom";

// const calculateScore = (playerIndex: number, categories: Category[]) => {
//   const allQuestions = categories.map((cat) => cat.questions);
//   const flatAllQuestions = allQuestions.reduce(
//     (acc, qList) => acc.concat(qList),
//     []
//   );
//   const myQuestions = flatAllQuestions.filter(
//     (q) => q.answererIndex === playerIndex
//   );
//   const myPoints = myQuestions.map((q) => q.points);
//   return myPoints.reduce((a, b) => a + b, 0);
// };

const calculateScore = (pIndex: number, cats: Category[]) =>
  cats
    .flatMap((cat) => cat.questions)
    .filter((q) => q.answererIndex === pIndex && q.awardedPoints)
    .map((q) => q.awardedPoints)
    .reduce((a, b) => a + b, 0);

export const PlayQuizComponent = ({
  quiz,
  qIndex,
}: {
  quiz: Quiz;
  qIndex: string;
}) => {
  const [showPlayersScreen, setShowPlayersScreen] = useState<boolean>(false);
  const { setPlayers, editQuestion } = useContext(MethodsContext);

  const [activeQues, setActiveQues] = useState<{
    catIndex: number;
    quesIndex: number;
  }>(null);

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
                setActiveQues({
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
              <Table.TextCell>
                {calculateScore(ind, quiz.categories)}
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Link to="/">Back to All Quizzes</Link>
    </Pane>
  );

  if (activeQues)
    return (
      <ViewQuestionComponent
        question={
          quiz.categories[activeQues.catIndex].questions[activeQues.quesIndex]
        }
        players={quiz.players}
        onClose={(answerer: number, points: number) => {
          editQuestion(
            parseInt(qIndex, 10),
            activeQues.catIndex,
            activeQues.quesIndex,
            quiz.categories[activeQues.catIndex].questions[
              activeQues.quesIndex
            ],
            answerer,
            points
          );
          setActiveQues(null);
        }}
      />
    );

  return showPlayersScreen || quiz.players.length === 0 ? (
    <PlayersComponent
      quiz={quiz}
      onFinish={(playersList) => {
        setPlayers(parseInt(qIndex, 10), playersList);
        setShowPlayersScreen(false);
      }}
    />
  ) : (
    quizPane
  );
};
