import React, { useState, useEffect, useReducer } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import FlakyIcon from "@mui/icons-material/Flaky";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/HighlightOff";
import NewIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { blueGrey } from "@mui/material/colors";
import Select from "react-select";
import Input from "@mui/material/Input";
// COMPONENTS
import SelectUser from "../Components/SelectUser";
import SelectTodos from "../Components/SelectTodos";
import ListTodos from "../Components/ListTodos";

// STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5pt",
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

interface Props {
  tag?: keyof JSX.IntrinsicElements;
}

export default function Main(props) {
  // STATE
  const [addTodo, setAddTodo] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(false);
  // GET SEARCH FROM CHILDREN
  const [searchId, setSearchId] = useState("");
  const [searchType, setSearchType] = useState("");

  const userSearch = (id) => {
    setSearchType("user");
    setSearchId(id);
  };
  const todoSearch = (id) => {
    setSearchType("todo");
    setSearchId(id);
  };

  useEffect(() => {
    setSearchId(searchId);
    setSearchType(searchType);
  }, [searchId, searchType]);

  // SETUP ISCOMPLETE CHECK
  const [isComplete, setIsComplete] = useState(false);
  const Checkbox = ({ children, ...props }: JSX.IntrinsicElements["input"]) => (
    <label style={{ marginRight: "1em" }}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );

  // HANDLE USER CHANGE
  const handleUserChange = (user) => {
    setCurrentUser(user.value);
  };

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);

  // DECLARE USERS ARRAY
  const userInfo = Array();
  // GET ALL USERS MAP TO SELECT
  async function fetchUsers() {
    const fetch = await axios.get("/api/users");
    let result = fetch.data.users;
    userInfo.push({ value: "users", label: "-------" });
    result.map((user) => {
      return userInfo.push({ value: user.id, label: user.firstName });
    });
    setUsers(userInfo);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  // MODAL EVENT HANDLERS
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // FORM HANDLER
  const defaultValues = {
    name: currentUser,
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  };

  // CREATE TODO FUNCTION
  const [response, setResponse] = useState<any[]>([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const createTodo = async () => {
    const request = await axios.post("/api/todo/create", {
      name: formValues.name,
      userId: currentUser,
      isComplete: false,
    });
    forceUpdate();
    setNote(true);
  };

  setTimeout(() => {
    setNote(false);
  }, 10000);

  // MESSAGE FOR SUCCESSFUL CREATION BECAUSE DATA DOESNT PERSIST ON RELOAD
  function displayNote() {
    return (
      <div style={styles.container}>
        <DoneOutlineIcon fontSize="small" color="primary" />
        <p>Task added!</p>
      </div>
    );
  }

  // MODAL COMPONENT
  const addModal = () => {
    return (
      <div style={styles.container}>
        <Modal open={open} onClose={handleClose} hideBackdrop={true}>
          <Box style={styles.edit}>
            <div className="modal">
              <IconButton color="primary" onClick={() => handleClose()}>
                <DeleteIcon />
              </IconButton>
              <h2>Add Todo</h2>
              {note && displayNote()}
              <div style={styles.container}>
                <NewIcon color="primary" />

                <Input
                  id="name"
                  value={formValues.name}
                  name="name"
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
              <div style={styles.container}>
                <PersonIcon fontSize="large" color="primary" />
                <Select
                  options={users}
                  className="uSelect"
                  name="users"
                  placeholder="Users"
                  onChange={handleUserChange}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: blueGrey[100],
                      borderColor: blueGrey[800],
                      boxShadow: "none",
                    }),
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ margin: "5pt" }}
                  onClick={() => createTodo()}
                >
                  <b>Save</b>
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  };

  // RENDER MAIN PAGE
  return (
    <div style={styles.container}>
      <header className="App-center">
        <div style={styles.box}>
          <div style={styles.container}>
            <ListAltIcon fontSize="large" color="primary" />
            <PersonIcon fontSize="large" color="primary" />
            <DoneOutlineIcon fontSize="large" color="primary" />
            <Button
              variant="contained"
              sx={{ marginLeft: "auto" }}
              onClick={() => handleOpen()}
            >
              <b>Add Todo</b>
            </Button>
          </div>

          <div style={styles.container}>
            <SelectUser func={userSearch} id={searchId} />
            <SelectTodos func={todoSearch} id={searchId} />

            <FlakyIcon fontSize="medium" color="secondary" />
            <Checkbox
              checked={isComplete}
              onChange={() => setIsComplete((state) => !state)}
              className="checkbox"
            ></Checkbox>
          </div>
          {open && addModal()}

          <ListTodos type={searchType} id={searchId} isComplete={isComplete} />
        </div>
      </header>
    </div>
  );
}
