import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { blueGrey } from "@mui/material/colors";
import ListAltIcon from "@mui/icons-material/ListAlt";
// STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default function SelectTodos(props) {
  // SET TODO STATE
  const [currentTodo, setCurrentTodo] = useState(null);
  const [todos, setTodos] = useState<any>([]);

  // HANDLE CHANGES
  const handleTodoChange = (todo) => {
    setCurrentTodo(todo.value);
  };

  // MOUNT CHANGES
  useEffect(() => {
    setCurrentTodo(currentTodo);
    //send current user to main
    props.func(currentTodo);
  }, [currentTodo]);

  // DECLARE TODO ARRAY
  const todoInfo = Array();

  // GET ALL TODOS MAP TO SELECT
  async function fetchTodos() {
    const fetch = await axios.get("/api/todos");
    let result = fetch.data.todos;
    todoInfo.push({ value: "todos", label: "All Tasks" });
    result.map((todo) => {
      return todoInfo.push({ value: todo.id, label: todo.name });
    });
    setTodos(todoInfo);
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  // RENDER
  return (
    <div>
      <div style={styles.container}>
        <ListAltIcon fontSize="medium" color="secondary" />
        <Select
          options={todos}
          className="tSelect"
          name="todos"
          placeholder="Tasks"
          onChange={handleTodoChange}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: blueGrey[100],
              borderColor: blueGrey[800],
              boxShadow: "none",
            }),
          }}
        />
      </div>
    </div>
  );
}
