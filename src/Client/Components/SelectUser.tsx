import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { blueGrey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";


// STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function SelectUser(props) {
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
    props.func(currentUser);
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

  // RENDER
  return (
    <div>
      <div style={styles.container}>
        <PersonIcon fontSize="medium" color="secondary" />
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
      </div>
    </div>
  );
}
