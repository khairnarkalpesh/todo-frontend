import { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import UserOptions from "../layout/Header/UserOptions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

function Todo() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    getTodo();
  });

  const getTodo = () => {
    const options = {
      user: user._id,
    };

    console.log(options);

    axios
      .post("/api/v1/get-todo", { options })
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  };
  const addUpdateTodo = () => {
    const options = {
      text: text,
      user: user._id,
    };

    if (isUpdating === "") {
      axios
        .post("/api/v1/save-todo", { options })
        .then((res) => {
          console.log(res.data);
          setText("");
        })
        .catch((err) => console.log(err));
      getTodo();
      toast.success("Task Added");
    } else {
      axios
        .post("/api/v1/update-todo", {
          _id: isUpdating,
          text,
        })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
          getTodo();
          toast.success("Task Updated");
        })
        .catch((err) => console.log(err));
    }
  };

  const updateStatus = (id, stat) => {
    axios
      .post("/api/v1/update-status", {
        _id: id,
        status: stat,
      })
      .then((res) => {
        console.log(res.data);
        setText("");
        setUpdating("");
        getTodo();
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = (_id) => {
    axios
      .post("/api/v1/delete-todo", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    toast.success("Task Deleted");
  };

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  };

  return (
    <div className="Todo">
      <UserOptions user={user} />
      <div className="container">
        <h1>My To-Do List</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add Task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <div className="add" onClick={addUpdateTodo}>
            {isUpdating ? <CheckIcon /> : <AddCircleIcon />}
          </div>
        </div>

        <div className="heading">
          <h4>Pending</h4>
        </div>
        <div className="list">
          {todo.map(
            (item) =>
              item.status !== "Completed" && (
                <div className="item">
                  <div>
                    <input
                      onClick={() => updateStatus(item._id, "Completed")}
                      type="checkbox"
                      className="checkbox"
                    />
                  </div>
                  <div className="text"> {item.text}</div>
                  <div className="icons">
                    <DeleteIcon onClick={() => deleteTodo(item._id)} />
                    <EditIcon onClick={() => updateTodo(item._id, item.text)} />
                  </div>
                </div>
              )
          )}
        </div>

        <div className="heading">
          <h4>Completed</h4>
        </div>
        <div className="list">
          {todo.map(
            (item) =>
              item.status === "Completed" && (
                <div className="item-completed">
                  <div>
                    <input
                      onClick={() => updateStatus(item._id, "Pending")}
                      type="checkbox"
                      className="checkbox"
                      checked
                    />
                  </div>
                  <div className="text">
                    <strike>{item.text}</strike>
                  </div>
                  <div className="icons">
                    <DeleteIcon onClick={() => deleteTodo(item._id)} />
                  </div>
                </div>
              )
          )}
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </div>
  );
}

export default Todo;
