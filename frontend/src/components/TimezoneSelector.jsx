import React from "react";

const TimezoneSelector = ({ timezones, setTimezone }) => {
  return (
    <>
      <div className="select-city">
        <select name="cityName" onChange={(e) => setTimezone(e.target.value)}>
          {timezones.map((timezone, i) => {
            return (
              <option value={timezone} key={i}>
                {timezone}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default TimezoneSelector;
