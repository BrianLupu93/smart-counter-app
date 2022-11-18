import React from "react";
import { useState } from "react";
import Today from "./Today";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { useEffect } from "react";
import TimezoneSelector from "./TimezoneSelector";
import InputForm from "./InputForm";
import Counter from "./Counter";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

const CounterHome = () => {
  // GLOBAL APP STATE

  const [timezone, setTimezone] = useState();
  const [ends, setEnds] = useState([]);

  const timezones = [
    `${dayjs.tz.guess()}`,
    "Europe/Rome",
    "Asia/Tokyo",
    "America/Toronto",
  ];

  // EFFECTS

  useEffect(() => {
    setTimezone(`${dayjs.tz.guess()}`);
  }, []);

  return (
    <>
      <div>
        <Today timezone={timezone} />
        <TimezoneSelector timezones={timezones} setTimezone={setTimezone} />
        <InputForm setEnds={setEnds} ends={ends} timezone={timezone} />
        <div className="display-counter">
          {ends.length > 0 &&
            ends.map((end, i) => {
              return <Counter key={i} end={end} timezone={timezone} />;
            })}
        </div>
      </div>
    </>
  );
};

export default CounterHome;
