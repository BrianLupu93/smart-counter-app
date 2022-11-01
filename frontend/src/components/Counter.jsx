import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const Counter = () => {
  const [today, setToday] = useState();
  const [localCity, setLocalCity] = useState();

  const timezones = ["Europe/Rome", "Asia/Tokyo", "America/Toronto"];

  useEffect(() => {
    const localCity = dayjs.tz.guess();
    const localTime = dayjs().format("DD.MM.YYYY____HH:mm:ss");
    setLocalCity(localCity);

    setToday(localTime);
  }, []);

  useEffect(() => {
    const newToday = dayjs().tz(localCity).format("DD.MM.YYYY____HH:mm:ss");
    setToday(newToday);
  }, [localCity]);

  return (
    <>
      <div>
        <div>
          <div>
            <h2>{localCity}</h2>
            <h2>{today}</h2>
          </div>
          <select
            name="cityName"
            onChange={(e) => setLocalCity(e.target.value)}
          >
            <option key={0} value={dayjs.tz.guess()}>
              {dayjs.tz.guess()}
            </option>
            {timezones.map((timezone, i) => {
              return (
                <option value={timezone} key={i + 1}>
                  {timezone}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default Counter;
