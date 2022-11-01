import "./App.scss";
import ActivityLog from "./ActivityLog/ActivityLog";
import Form from "./Form/Form";
import React, { useEffect, useState } from "react";

function App() {
  const [activities, setActivies] = useState([]);

  const loadActivities = async () => {
    const response = await fetch(
      "https://test-api.codingbootcamp.cz/api/f01429a7/health/activities"
    );
    const activitiesData = await response.json();
    // console.log(activitiesData);
    setActivies(activitiesData);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Health App</h1>
        <div className="App__content">
          <Form />
          <ActivityLog activities={activities} />
        </div>
      </div>
    </>
  );
}

export default App;
