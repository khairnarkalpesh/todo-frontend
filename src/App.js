import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import "./App.css";
import LoginSignUp from "./components/User/LoginSignUp.js";
import Todo from "./components/Todo/Todo.js";
import { loadUser } from "./actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions.js";

function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());

    WebFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chlanka"],
      },
    });
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginSignUp />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/todo" element={< Todo/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
