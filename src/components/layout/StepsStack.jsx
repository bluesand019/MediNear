import React from "react";

const StepsStack = () => {
  return (
    <div className="section">
      <p>How MediNear works</p>
      <p>Three steps to the right care</p>
      <div className="steps">
        <div>
          <p>Step 1</p>
          <h4>Search a service or doctor</h4>
          <p>
            Type what you need — blood test, MRI, or a cardiologist — and your
            location is detected automatically.
          </p>
        </div>
        <div>
          <p>Step 2</p>
          <h4>Compare options instantly</h4>
          <p>
            Results are sorted by distance, rating, and price. See available
            time slots without calling anyone.
          </p>
        </div>
        <div>
          <p>Step 3</p>
          <h4>Book your appointment</h4>
          <p>
            Select a time slot and confirm your booking in seconds. Get a
            confirmation and reminder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepsStack;
