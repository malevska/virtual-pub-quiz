import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";

import { Button, Pane, TextInput } from "evergreen-ui";
import { Question } from "./store/types";
import { PlayQuizComponent } from "./components/PlayQuizComponent";
import { QuizComponent } from "./components/QuizComponent";

const db = {
  quizzes: [
    {
      title: "Test Quiz",
      isPlaying: false,
      players: [],
      categories: [
        {
          title: "Cat 1",
          questions: [
            { text: "", answer: "", embeds: "", points: 1 },
            { text: "", answer: "", embeds: "", points: 2 },
          ],
        },
        {
          title: "Cat 2",
          questions: [
            { text: "", answer: "", embeds: "", points: 1 },
            { text: "", answer: "", embeds: "", points: 2 },
          ],
        },
      ],
    },
  ],
};

//add new quiz to the list of quizzes
const addQuiz = (title: string) => {
  db.quizzes.push({
    title,
    isPlaying: false,
    players: [],
    categories: [],
  });
  debugger;
  render(<App />, document.getElementById("app"));
};

const removeQuiz = (index: number) => {
  db.quizzes.splice(index, 1);
  render(<App />, document.getElementById("app"));
};

const resetQuiz = (index: number) => {
  db.quizzes[index].isPlaying = false;
  render(<App />, document.getElementById("app"));
};

const startQuiz = (index: number) => {
  db.quizzes[index].isPlaying = true;
  render(<App />, document.getElementById("app"));
};

export const addCategory = (quizIndex: number, catTitle: string) => {
  db.quizzes[quizIndex].categories.push({
    title: catTitle,
    questions: [],
  });
  render(<App />, document.getElementById("app"));
};

export const addQuestion = (
  quizIndex: number,
  catIndex: number,
  q: Question
) => {
  db.quizzes[quizIndex].categories[catIndex].questions.push({
    text: q.text,
    answer: q.answer,
    embeds: q.embeds,
    points: q.points,
  });
  render(<App />, document.getElementById("app"));
};

export const editQuestion = (
  quizIndex: number,
  catIndex: number,
  questionIndex: number,
  newQuestionParameters: Question
) => {
  db.quizzes[quizIndex].categories[catIndex].questions[questionIndex].text =
    newQuestionParameters.text;
  db.quizzes[quizIndex].categories[catIndex].questions[questionIndex].answer =
    newQuestionParameters.answer;
  db.quizzes[quizIndex].categories[catIndex].questions[questionIndex].embeds =
    newQuestionParameters.embeds;
  db.quizzes[quizIndex].categories[catIndex].questions[questionIndex].points =
    newQuestionParameters.points;

  render(<App />, document.getElementById("app"));
};

export const changeQuizTitle = (quizIndex: number, title: string) => {
  db.quizzes[quizIndex].title = title;
  render(<App />, document.getElementById("app"));
};

export const changeCategoryTitle = (
  quizIndex: number,
  catIndex: number,
  title: string
) => {
  db.quizzes[quizIndex].categories[catIndex].title = title;
  render(<App />, document.getElementById("app"));
};

export const addPlayers = (quizIndex: number, playersList: string[]) => {
  playersList.map((player) => db.quizzes[quizIndex].players.push(player));
  render(<App />, document.getElementById("app"));
};

export const editPlayers = (quizIndex: number, playersList: string[]) => {
  db.quizzes[quizIndex].players = [];
  playersList.map((player) => db.quizzes[quizIndex].players.push(player));
  render(<App />, document.getElementById("app"));
};

export const changePlayerName = (
  quizIndex: number,
  playerIndex: number,
  player: string
) => {
  db.quizzes[quizIndex].players[playerIndex] = player;
  render(<App />, document.getElementById("app"));
};

const QuizList = () => {
  const history = useHistory();
  const [newQuizTitle, setNewQuizTitle] = useState("");

  const onClickHandler = () => {
    addQuiz(newQuizTitle);
    setNewQuizTitle("");
  };

  return (
    <Pane padding="20px">
      <TextInput
        placeholder="Quiz title"
        value={newQuizTitle}
        onChange={(e: any) => setNewQuizTitle(e.target.value)}
      />

      <Button appearance="primary" onClick={onClickHandler}>
        Add New Quiz
      </Button>

      <h1>All Quizzes</h1>
      {db.quizzes.map((q, index) => (
        <h2 key={index}>
          {q.title} ({q.isPlaying ? "P" : "/"}) -
          <Button margin="5px" onClick={() => history.push(`/quiz/${index}`)}>
            Edit
          </Button>
          <Button
            margin="5px"
            onClick={() => {
              history.push(`/play/${index}`);
              startQuiz(index);
            }}
          >
            Play
          </Button>
          <Button margin="5px" onClick={() => resetQuiz(index)}>
            Reset
          </Button>
          <Button margin="5px" onClick={() => removeQuiz(index)}>
            Remove
          </Button>
        </h2>
      ))}
    </Pane>
  );
};

const QuizRoute = () => {
  let { index } = useParams<{ index: string }>();
  return <QuizComponent quiz={db.quizzes[index]} index={index} />;
};

const PlayQuizRoute = () => {
  let { index } = useParams<{ index: string }>();
  return (
    <PlayQuizComponent
      quiz={db.quizzes[index]}
      index={index}
      editPlayersMode={false}
    />
  );
};

const QuizPlayersRoute = () => {
  let { index } = useParams<{ index: string }>();
  return (
    <PlayQuizComponent
      quiz={db.quizzes[index]}
      index={index}
      editPlayersMode={true}
    />
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about">NOT IMPLEMENTED</Route>
        <Route path="/quiz/:index" children={<QuizRoute />} />
        <Route path="/play/:index" children={<PlayQuizRoute />} />
        <Route path="/players/:index" children={<QuizPlayersRoute />} />
        <Route path="/">
          <QuizList />
        </Route>
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("app"));
