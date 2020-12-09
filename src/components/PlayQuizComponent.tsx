import * as React from "react";
import {
  Button,
  Pane,
  Pill,
  Table,
  Link,
  Heading,
  majorScale,
  minorScale,
} from "evergreen-ui";
import { Quiz, Category } from "../store/types";
import { useState, useContext } from "react";
import { PlayersComponent } from "./PlayersComponent";
import { ViewQuestionComponent } from "./ViewQuestionComponent";
import { MethodsContext } from "../store";

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
    <Pane
      padding={majorScale(1)}
      background="#F2F1F3"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      flex="1 0 auto"
    >
      <Pane width="100%" display="flex" flexDirection="row" flex="1 0 auto">
        <Heading
          is="h1"
          width="70%"
          marginTop={majorScale(11)}
          marginBottom={majorScale(5)}
          marginLeft={majorScale(6)}
          size={900}
          textTransform="uppercase"
          fontSize="xxx-large"
          fontWeight="bold"
        >
          Pub quiz board
        </Heading>
        <Table width="30%" padding={majorScale(2)} marginRight={majorScale(6)}>
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
      </Pane>

      <Pane
        marginLeft={majorScale(6)}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
        flex="1 0 auto"
      >
        {quiz.categories.map((cat, catInd) => (
          <Pane
            key={catInd}
            padding={majorScale(1)}
            margin={majorScale(2)}
            //  width={majorScale(30)}
            width="15%"
            background="white"
            borderRadius={minorScale(3)}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading
              size={600}
              marginTop={majorScale(1)}
              marginBottom={majorScale(2)}
              fontWeight="bold"
              display="flex"
              textAlign="center"
              verticalAlign="middle"
              flex="1 0 auto"
              wordBreak="break-word"
              wordWrap="break-word"
            >
              {cat.title}
            </Heading>
            {cat.questions.map((ques, quesInd) => (
              <Pill
                key={quesInd}
                margin={majorScale(1)}
                padding={majorScale(1)}
                isInteractive={true}
                width={majorScale(20)}
                height={majorScale(7)}
                background="#999999"
                isSolid
                fontSize="x-large"
                display="flex"
                alignItems="center"
                justifyContent="center"
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
      </Pane>

      <Pane>
        <Link margin={majorScale(2)} onClick={() => setShowPlayersScreen(true)}>
          Edit Players
        </Link>
        <Link margin={majorScale(2)} href="/">
          Back to All Quizzes
        </Link>
      </Pane>
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
