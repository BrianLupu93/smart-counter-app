import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

const CounterSetUp = () => {
  const [today, setToday] = useState();
  const [localCity, setLocalCity] = useState();
  const [end, setEnd] = useState({});
  const [duration, setDuration] = useState();
  const [counters, setCounters] = useState([]);

  const timezones = ["Europe/Rome", "Asia/Tokyo", "America/Toronto"];

  useEffect(() => {
    const localCity = dayjs.tz.guess();
    const localTime = dayjs().tz(localCity).format("DD-MM-YYYY,HH:mm:ss");
    setLocalCity(localCity);

    setToday(localTime);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToday(dayjs().tz(localCity).format("DD-MM-YYYY,HH:mm:ss"));
    }, 1000);
  }, [today]);

  useEffect(() => {
    setTimeout(() => {
      counters.map((counter) => {
        return setDuration(counter.end.diff(counter.start));
      });
    }, 1000);
  }, [counters]);

  const endEnd = dayjs()
    .set("date", end.endDate?.substring(8, 9))
    .set("month", end.endDate?.substring(5, 7) - 1)
    .set("year", end.endDate?.substring(0, 4))
    .set("hour", end.endTime?.substring(0, 2))
    .set("minute", end.endTime?.substring(3, 5))
    .set("second", "00");

  const startStart = dayjs()
    .set("date", today?.substring(0, 2))
    .set("month", today?.substring(3, 5) - 1)
    .set("year", today?.substring(6, 10))
    .set("hour", today?.substring(11, 13))
    .set("minute", today?.substring(14, 16))
    .set("second", today?.substring(17, 18));

  const startCount = (e) => {
    e.preventDefault();
    if (end.endDate && end.endTime) {
      setCounters([...counters, { end: endEnd, start: startStart }]);
    }
  };

  console.log(counters);

  return (
    <>
      <div>
        <div className="setup-form">
          <div>
            <div className="display-time">
              <code>{today?.split(",")[0]}</code>
              <h2>{localCity}</h2>
              <code>{today?.split(",")[1]}</code>
            </div>
          </div>

          <div className="select-city">
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

          <div className="user-inputs">
            <label htmlFor="endDate">Event Date: </label>
            <input
              id="endDate"
              type="date"
              onChange={(e) => setEnd({ ...end, endDate: e.target.value })}
            ></input>
            <label htmlFor="endTime">Event Time: </label>
            <input
              id="endTime"
              type="time"
              onChange={(e) => setEnd({ ...end, endTime: e.target.value })}
            ></input>
            <button
              type="submit"
              onClick={(e) => {
                startCount(e);
              }}
            >
              <code>Start</code>
            </button>
          </div>
        </div>
        <div className="display-counter">
          <div className="counter">
            <p>Y: {duration?.$d.years}</p>
            <p>M: {duration?.$d.months}</p>
            <p>D: {duration?.$d.days}</p>
            <p>H: {duration?.$d.hours}</p>
            <p>M: {duration?.$d.minutes}</p>
            <p>S: {duration?.$d.seconds}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounterSetUp;
