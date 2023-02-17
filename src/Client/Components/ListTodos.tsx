import React, { useState, useEffect } from "react";
import AllComplete from "./Searches/AllComplete";
import AllTasks from "./Searches/AllTasks";
import ByTodo from "./Searches/ByTodo";
import ByUser from "./Searches/ByUser";
// DEFINE PROPS
interface Props {
  type: any;
  id: any;
  isComplete: any;
}
//@ts-ignore
const ListTodos: React.FC<Props> = ({ type, id, isComplete }) => {
  // DEFINE type AND ID - START WITH ALL
  const [toSearch, setToSearch] = useState("all");

  // SET type AND ID WHEN ACTIONED
  useEffect(() => {
    // LOGIC TO FILTER SEARCH
    if (id === "users") {
      setToSearch("all");
    }
    if (id === "todos") {
      setToSearch("all");
    } else if (type === "all" && id === "all" && isComplete === false) {
      setToSearch("all");
    } else if (type === "all" && id === "all" && isComplete === true) {
      setToSearch("all-completed");
    } else if (type === "user" && id !== "users" && isComplete === false) {
      setToSearch("by-user");
    } else if (type === "user" && id === "users" && isComplete === false) {
      setToSearch("all");
    } else if (type === "todo" && id !== "todos" && isComplete === false) {
      setToSearch("by-todo");
    } else if (type === "todo" && id === "todos" && isComplete === false) {
      setToSearch("all");
    }
  }, [type, id, isComplete, toSearch]);

  // RENDER SEARCH FROM PARAMS
  const renderPage = () => {
    if (toSearch === "all") {
      return <AllTasks />;
    } else if (toSearch === "by-user") {
      return <ByUser id={id} />;
    } else if (toSearch === "by-todo") {
      return <ByTodo id={id} />;
    } else if (toSearch === "todo-completed") {
      return <AllComplete />;
    }
  };

  return <> {renderPage()} </>;
};

export default ListTodos;
