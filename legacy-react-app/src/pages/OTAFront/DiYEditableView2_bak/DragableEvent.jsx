import React from "react";

const DragableEvent = ({ eventName, id, start, end, location, comments  }) => {
  return (
   
      <div
        className="fc-event bg-blue-500 text-white w-fit px-3 py-1 border cursor-pointer"
        title={eventName}
        id={id}
        start={start}
        end={end}
        location={location}
        comments={comments}
      >
        <strong>{eventName}</strong>
      </div>
  
  );
};

export default DragableEvent;
