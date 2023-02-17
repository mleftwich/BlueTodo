import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import NewIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import Select from "react-select";

const [open, setOpen] = useState(false);

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

export default function AddTodo() {
  // SET USER STATE
  const [users, setUsers] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState(null);

  // HANDLE CHANGES
  const handleUserChange = (user) => {
    setCurrentUser(user.value);
  };

  // MOUNT CHANGES
  useEffect(() => {
    setCurrentUser(currentUser);
    //send current user to main
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
    name: "",
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
              <h2>Add Todo</h2>

              <div style={styles.container}>
                <NewIcon color="primary" />
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
                <Input
                  id="todo"
                  value={formValues.name}
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
              <Button variant="contained" sx={{ margin: "5pt" }}>
                <b>Save</b>
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  };
}
