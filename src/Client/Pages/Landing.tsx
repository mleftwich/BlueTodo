import React from "react";
import Link from "@mui/material/Link";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Button from "@mui/material/Button";

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
    padding: "20pt",
    width: "100%",
  },
};

export default function Landing() {
  return (
    <div style={styles.container}>
      <header className="App-header">
        <div style={styles.box}>
          <PersonIcon fontSize="large" color="primary" />
          <ListAltIcon fontSize="large" color="primary" />
          <DoneOutlineIcon fontSize="large" color="primary" />
          <h3>Task 2 - Simple React Todo App</h3>
          <p>
            Start{" "}
            <Link href="/main" underline="none">
              <Button variant="contained">
                <b>here</b>
              </Button>
            </Link>
          </p>
        </div>
      </header>
    </div>
  );
}
