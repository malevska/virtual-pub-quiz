import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { Button, Pane, TextInput } from "evergreen-ui";
import { PlayQuizComponent } from "./components/PlayQuizComponent";
import { EditQuizComponent } from "./components/EditQuizComponent";
import { Quiz } from "./store/types";
import { useQuizzes, MethodsContext } from "./store/index";
import { v4 as uuid } from "uuid";

const db: Quiz[] = [
  {
    id: uuid(),
    title: "TestQuiz",
    players: ["Pero", "Mile"],
    categories: [
      {
        id: uuid(),
        title: "H4 Random",
        questions: [
          {
            id: uuid(),
            text: "Banana",
            answer: "Yellow",
            embedsType: "none",
            embeds: "",
            points: 5,
          },
          {
            id: uuid(),
            text: "Apple",
            answer: "Red",
            embedsType: "none",
            embeds: "",
            points: 4,
          },
          {
            id: uuid(),
            text: "Grapes",
            answer: "Purple",
            embedsType: "none",
            embeds: "",
            points: 3,
          },
        ],
      },
      {
        id: uuid(),
        title: "European geography",
        questions: [
          {
            id: uuid(),
            text: "Lemon",
            answer: "Yellow",
            embedsType: "none",
            embeds: "",
            points: 5,
          },
          {
            id: uuid(),
            text: "Kiwi",
            answer: "Green",
            embedsType: "none",
            embeds: "",
            points: 4,
          },
          {
            id: uuid(),
            text: "Orange",
            answer: "Orange",
            embedsType: "none",
            embeds: "",
            points: 3,
          },
        ],
      },
    ],
    isPlaying: true,
  },
];

const QuizList = ({ quizzes }: { quizzes: Quiz[] }) => {
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const methods = React.useContext(MethodsContext);

  return (
    <Pane padding="20px">
      <TextInput
        placeholder="Quiz title"
        value={newQuizTitle}
        onChange={(e: any) => setNewQuizTitle(e.target.value)}
      />

      <Button
        appearance="primary"
        onClick={() => {
          methods.addQuiz(newQuizTitle);
          setNewQuizTitle("");
        }}
      >
        Add New Quiz
      </Button>

      <h1>All Quizzes</h1>
      {quizzes.map((q, index) => (
        <h2 key={q.id}>
          {q.title} ({q.isPlaying ? "P" : "/"}) -
          <Link to={`/edit/${index}`}>Edit</Link>
          <Link
            to={`/play/${index}`}
            onClick={() => {
              methods.startQuiz(index, true);
            }}
          >
            Play
          </Link>
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
  return <EditQuizComponent quiz={quizzes[index]} qIndex={index} />;
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
            path="/edit/:index"
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
