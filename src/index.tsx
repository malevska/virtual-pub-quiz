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
import { useQuizzes, MethodsContext } from "./store/index";

const db: Quiz[] = [
  {
    title: "TestQuiz",
    players: ["Pero", "Mile"],
    categories: [],
    isPlaying: true,
  },
];

const QuizList = ({ quizzes }: { quizzes: Quiz[] }) => {
  const history = useHistory();
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const methods = React.useContext(MethodsContext);

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
              methods.startQuiz(index, true);
            }}
          >
            Play
          </Button>
          <Button margin="5px" onClick={() => methods.startQuiz(index, false)}>
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

const QuizRoute = ({ quizzes }: { quizzes: Quiz[] }) => {
  let { index } = useParams<{ index: string }>();
  return <QuizComponent quiz={quizzes[index]} index={index} />;
};

const PlayQuizRoute = ({ quizzes }: { quizzes: Quiz[] }) => {
  let { index } = useParams<{ index: string }>();
  return <PlayQuizComponent quiz={quizzes[index]} qIndex={index} />;
};

/**
 * This is the root component that renders everything
 */
const App = () => {
  const [quizzes, methods] = useQuizzes(db);

  return (
    <MethodsContext.Provider value={methods}>
      <Router>
        <Switch>
          <Route path="/about">NOT IMPLEMENTED</Route>
          <Route
            path="/quiz/:index"
            children={<QuizRoute quizzes={quizzes} />}
          />
          <Route
            path="/play/:index"
            children={<PlayQuizRoute quizzes={quizzes} />}
          />
          <Route path="/">
            <QuizList quizzes={quizzes} />
          </Route>
        </Switch>
      </Router>
    </MethodsContext.Provider>
  );
};

render(<App />, document.getElementById("app"));
