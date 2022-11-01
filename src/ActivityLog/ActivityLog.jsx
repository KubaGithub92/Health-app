import React from "react";

export default function ActivityLog({ activities }) {
  // if (activities) {
  //   activities.map((activity) => {
  //     console.log(activity.type);
  //   });
  // }

  return (
    <>
      <div className="activity-log">
        <h2>Activities</h2>
        {activities
          ? activities.map((activity) => {
              return <div>{activity.date}</div>;
            })
          : "loading..."}
      </div>
    </>
  );
}
