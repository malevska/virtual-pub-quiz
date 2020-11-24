import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";

import { Button, Pane, TextInput } from "evergreen-ui";

import { PlayQuizComponent } from "./components/PlayQuizComponent";
import { QuizComponent } from "./components/QuizComponent";

import { Quiz, AppMethods } from "./store/types";
import { useQuizzes } from "./store/index";

const db: Quiz[] = [];

const QuizList = ({
  quizzes,
  methods,
}: {
  quizzes: Quiz[];
  methods: AppMethods;
}) => {
  const history = useHistory();
  const [newQuizTitle, setNewQuizTitle] = useState("");

  //add a new Quiz to the list and clear the input field
  const onClickHandler = () => {
    methods.addQuiz(newQuizTitle);
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
      {quizzes.map((q, index) => (
        <h2 key={index}>
          {q.title} ({q.isPlaying ? "P" : "/"}) -
          <Button margin="5px" onClick={() => history.push(`/quiz/${index}`)}>
            Edit
          </Button>
          <Button
            margin="5px"
            onClick={() => {
              history.push(`/play/${index}`);
              methods.startQuiz(index);
            }}
          >
            Play
          </Button>
          <Button margin="5px" onClick={() => methods.resetQuiz(index)}>
            Reset
          </Button>
          <Button margin="5px" onClick={() => methods.removeQuiz(index)}>
            Remove
          </Button>
        </h2>
      ))}
    </Pane>
  );
};

const QuizRoute = ({
  quizzes,
  methods,
}: {
  quizzes: Quiz[];
  methods: AppMethods;
}) => {
  let { index } = useParams<{ index: string }>();

  return (
    <QuizComponent
      quiz={quizzes[index]}
      index={index}
      addCategory={methods.addCategory}
      changeQuizTitle={methods.changeQuizTitle}
      changeCategoryTitle={methods.changeCategoryTitle}
      addQuestion={methods.addQuestion}
      editQuestion={methods.editQuestion}
    />
  );
};

const PlayQuizRoute = ({
  quizzes,
  methods,
}: {
  quizzes: Quiz[];
  methods: AppMethods;
}) => {
  let { index } = useParams<{ index: string }>();
  return (
    <PlayQuizComponent
      quiz={quizzes[index]}
      qIndex={index}
      editPlayersMode={false}
      addPlayers={methods.addPlayers}
      editPlayers={methods.editPlayers}
    />
  );
};

const QuizPlayersRoute = ({
  quizzes,
  methods,
}: {
  quizzes: Quiz[];
  methods: AppMethods;
}) => {
  let { index } = useParams<{ index: string }>();
  return (
    <PlayQuizComponent
      quiz={quizzes[index]}
      qIndex={index}
      editPlayersMode={true}
      addPlayers={methods.addPlayers}
      editPlayers={methods.editPlayers}
    />
  );
};

const App = () => {
  const [quizzes, methods] = useQuizzes(db);

  return (
    <Router>
      <Switch>
        <Route path="/about">NOT IMPLEMENTED</Route>
        <Route
          path="/quiz/:index"
          children={<QuizRoute quizzes={quizzes} methods={methods} />}
        />
        <Route
          path="/play/:index"
          children={<PlayQuizRoute quizzes={quizzes} methods={methods} />}
        />
        <Route
          path="/players/:index"
          children={<QuizPlayersRoute quizzes={quizzes} methods={methods} />}
        />
        <Route path="/">
          <QuizList quizzes={quizzes} methods={methods} />
        </Route>
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("app"));
