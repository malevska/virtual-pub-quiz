import * as React from "react";
import {
  Pane,
  Pill,
  Table,
  Heading,
  majorScale,
  minorScale,
  Dialog,
} from "evergreen-ui";
import { Quiz, Category } from "../store/types";
import { useState, useContext } from "react";
import { EditPlayersComponent } from "./EditPlayersComponent";
import { ShowQuestionComponent } from "./ShowQuestionComponent";
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
  const [showScoreBoard, setShowScoreBoard] = useState<boolean>(false);
  const { setPlayers, editQuestion } = useContext(MethodsContext);

  const [activeQues, setActiveQues] = useState<{
    catIndex: number;
    quesIndex: number;
  }>(null);

  const quizPane = (
    <Pane
      padding={majorScale(1)}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      flex="1 0 auto"
    >
      <Pane width="100%" display="flex" flexDirection="row" flex="1 0 auto">
        <Dialog
          isShown={showScoreBoard}
          title="Score board"
          width="30%"
          shouldCloseOnOverlayClick={false}
          hasFooter={false}
          onCloseComplete={() => {
            setShowScoreBoard(false);
          }}
        >
          <Pane width="100%">
            <Table>
              <Table.Head
                fontWeight="bold"
                fontSize="xx-large"
                background="white"
              >
                <Table.TextHeaderCell textProps={{ size: 600 }}>
                  Name
                </Table.TextHeaderCell>
                <Table.TextHeaderCell textProps={{ size: 600 }}>
                  Score
                </Table.TextHeaderCell>
              </Table.Head>
              <Table.Body height="100%">
                {quiz.players.map((pl, ind) => (
                  <Table.Row key={pl} borderBottom="0px">
                    {/* Players are just strings, so you can use that as an ID */}
                    <Table.TextCell textProps={{ size: 500 }}>
                      {pl}
                    </Table.TextCell>
                    <Table.TextCell textProps={{ size: 500 }}>
                      {calculateScore(ind, quiz.categories)}
                    </Table.TextCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Pane>
        </Dialog>
        <Heading
          is="h1"
          width="80%"
          marginTop={majorScale(11)}
          marginBottom={majorScale(5)}
          marginLeft={majorScale(7)}
          size={900}
          textTransform="uppercase"
          fontSize="xxx-large"
          fontWeight="bold"
        >
          Pub quiz board
        </Heading>
        <Pill
          marginTop={majorScale(11)}
          marginBottom={majorScale(5)}
          marginRight={majorScale(7)}
          padding={majorScale(1)}
          isInteractive={true}
          width="18%"
          height={majorScale(7)}
          background="#999999"
          isSolid
          fontSize="1.5vw"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setShowScoreBoard(true)}
        >
          Score board
        </Pill>
      </Pane>

      <Pane
        display="flex"
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
        flex="1 0 auto"
      >
        {quiz.categories.map((cat, catInd) => (
          <Pane
            key={cat.id}
            padding={majorScale(1)}
            margin="1%"
            width="17%"
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
            {cat.questions.slice().map((ques, quesInd) => (
              <Pill
                key={ques.id}
                margin={majorScale(1)}
                padding={majorScale(1)}
                isInteractive={true}
                width="70%"
                height={majorScale(7)}
                background="#999999"
                opacity={ques.answererIndex >= 0 ? "0.3" : "1"}
                isSolid={true}
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

      <Pane display="flex">
        <Heading is="h3" margin={majorScale(1)}>
          <Link to="#" onClick={() => setShowPlayersScreen(true)}>
            Edit Players
          </Link>
        </Heading>
        <Heading is="h3" margin={majorScale(1)}>
          <Link to="/">Back to All Quizzes</Link>
        </Heading>
      </Pane>
    </Pane>
  );

  if (activeQues)
    return (
      <ShowQuestionComponent
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
    <EditPlayersComponent
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
