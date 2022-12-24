import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState(() => {
    const saved = localStorage.getItem("todo");
    if (saved) {
      const initialValue = JSON.parse(saved);
      console.log(initialValue);
      return initialValue;
    } else {
      return [];
    }
  });

  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function getValue(e) {
    setText(e.target.value);
  }

  function addTodo() {
    setTodo([
      ...todo,
      {
        id: todo.length,
        text: text,
        status: "",
      },
    ]);
    setText("");
  }

  function handleCheck(e, index) {
    const newStatus = [...todo];
    console.log(newStatus);
    const status = e.target.checked;
    newStatus[index].status = status;
    console.log(newStatus);
    setTodo(newStatus);
    setStatus("");
  }

  function handleEdit(todo) {
    setEdit(true);
    setCurrentTodo({ ...todo });
    console.log(currentTodo);
  }

  function handleUpdateTodo(index, updateTodo) {
    console.log(index);
    console.log(updateTodo);
    const updateTodoItem = todo.map((item) => {
      return item.id === index ? updateTodo : item;
    });
    setEdit(false);
    setTodo(updateTodoItem);
  }

  function handleDelete(index) {
    const deleteTodo = todo.filter((todo, key) => {
      return key !== index;
    });
    setTodo(deleteTodo);
    console.log(todo);
  }

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="header">Todo List</h1>
        {edit ? (
          <div>
            <h2>Edit Todo</h2>
            <label htmlFor="editTodo">EditTodo</label>
            <input
              type="text"
              name="editTodo"
              placeholder="Edit ToDo"
              value={currentTodo.text}
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                handleUpdateTodo(currentTodo.id, currentTodo);
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancle
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              className="inputText"
              value={text}
              onChange={(event) => {
                getValue(event);
              }}
            />
            <button
              onClick={() => {
                addTodo();
              }}
            >
              Add
            </button>
          </div>
        )}

        {todo.map((item, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={item.status}
                // defaultChecked={item.status}
                value={status}
                onChange={(e) => {
                  handleCheck(e, index);
                }}
              ></input>
              {/* <h1>No.. {item.id}</h1> */}
              <h1>
                {item.text}
                <button
                  onClick={() => {
                    handleEdit(item);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  X
                </button>
              </h1>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
