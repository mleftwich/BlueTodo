import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import OldIcon from "@mui/icons-material/AutoDelete";
import NewIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
// STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "rgb(0, 0, 0, 0.2)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    width: "100%",
    margin: "5pt",
  },
  list: {
    width: "100%",
  },
  label: {
    color: blueGrey[400],
    fontFamily: "monospace",
    fontSize: "12pt",
    fontWeight: "bold",
    paddingLeft: "5pt",
    paddingRight: "5pt",
  },
  edit: {
    backgroundColor: blueGrey[900],
    color: "white",
    borderRadius: "10px",
    width: "50%",
    fontWeight: "light",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    textAlign: "center",
  },
};

export default function AllTasks() {
  // GET ALL TASKS
  const [todoArray, setTodoArray] = useState<any[]>([]);
  const fetch = async () => {
    const request = await axios.get("/api/todos/complete");
    let todos = request.data.todos;
    setTodoArray(todos);
  };
  useEffect(() => {
    fetch();
  }, []);

  // DELETE TASK
  const deleteTask = async (id) => {
    const request = await axios.delete(`/api/todo/${id}/delete`);
    fetch();
  };

  // MODAL STATE
  const [currentId, setCurrentId] = useState();
  const [todoName, setTodoName] = useState();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState();

  // MODAL EVENT HANDLERS
  const handleOpen = (id, todo) => {
    setOpen(true);
    setCurrentId(id);
    setTodoName(todo);
  };
  useEffect(() => {
    setCurrentId(currentId);
    setTodoName(todoName);
  }, [currentId, todoName]);
  const handleClose = () => setOpen(false);

  // FORM HANDLER
  const defaultValues = {
    name: todoName,
    todo: todoName,
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // EDIT TASK
  const editTask = async (name) => {
    const request = await axios.patch(`/api/todo/${currentId}/edit`, {
      name: name,
    });
    handleClose();
    fetch();
  };

  // MODAL COMPONENT
  const editModal = () => {
    return (
      <div style={styles.container}>
        <Modal open={open} onClose={handleClose} hideBackdrop={true}>
          <Box style={styles.edit}>
            <div className="modal">
              <IconButton color="primary" onClick={() => handleClose()}>
                <DeleteIcon />
              </IconButton>
              <h2>Edit Todo</h2>
              <OldIcon color="primary" />
              {todoName}
              <div style={styles.container}>
                <NewIcon color="primary" />
                <Input
                  id="todo"
                  value={formValues.todo}
                  name="todo"
                  type="text"
                  multiline={true}
                  fullWidth={true}
                  onChange={handleInputChange}
                  inputProps={{
                    style: {
                      color: "white",
                      width: "100%",
                      fontFamily: "monospace",
                      fontWeight: "light",
                    },
                  }}
                />
              </div>
              <Button
                variant="contained"
                sx={{ margin: "5pt" }}
                onClick={() => editTask(formValues.todo)}
              >
                <b>Save</b>
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.list}>
        {todoArray &&
          todoArray.map((todo) => (
            <div key={todo.id} style={styles.container}>
              <div style={styles.box}>
                <div style={styles.container}>
                  <p style={styles.label}>Name:</p>
                  <p>{todo.name} /</p>
                  <p style={styles.label}>User:</p>
                  <p>
                    <b>{todo.user} /</b>
                  </p>
                  <p style={styles.label}>Complete?</p>
                  <p>{todo.isComplete.toString()}</p>

                  <IconButton
                    color="primary"
                    onClick={() => deleteTask(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(todo.id, todo.name)}
                  >
                    <EditIcon />
                  </IconButton>
                </div>

                {editModal()}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
