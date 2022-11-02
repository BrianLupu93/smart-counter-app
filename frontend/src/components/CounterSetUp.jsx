import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  const [counters, setCounters] = useState([]);
  const [displayCounters, setDisplayCounters] = useState([]);

  const timezones = ["Europe/Rome", "Asia/Tokyo", "America/Toronto"];

  const { register, reset } = useForm();

  useEffect(() => {
    const localCity = dayjs.tz.guess();
    const localTime = dayjs().tz(localCity).format("DD-MM-YYYY,HH:mm:ss");
    setLocalCity(localCity);

    setToday(localTime);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToday(dayjs().tz(localCity).format("DD-MM-YYYY,HH:mm:ss"));

      if (counters.length > 0) {
        const holdDurations = [];
        counters.map((counter) => {
          const duration = dayjs.duration(counter.diff(startStart));

          holdDurations.push(duration.$d);
          return holdDurations;
        });
        return setDisplayCounters(holdDurations);
      }
    }, 1000);
  }, [today]);

  console.log(displayCounters);
  const endEnd = dayjs()
    .set("date", end.endDate?.substring(8, 10))
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
    .set("second", today?.substring(17, 19));

  const startCount = (e) => {
    e.preventDefault();
    setCounters([...counters, endEnd]);
    setEnd({});
    reset();
  };

  return (
    <>
      <div>
        <form className="setup-form">
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
              {...register("endDate")}
              id="endDate"
              type="date"
              onChange={(e) => setEnd({ ...end, endDate: e.target.value })}
            ></input>
            <label htmlFor="endTime">Event Time: </label>
            <input
              {...register("endTime")}
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
        </form>
        <div className="display-counter">
          <div className="counter">
            {displayCounters?.map((counter, i) => {
              return (
                <div key={i} className="counter-row">
                  <div className="counter-interface">
                    <code className="space one">{counter.years}</code>
                    <code className="space two">{counter.months}</code>
                    <code className="space three">{counter.days}</code>
                    <code className="space four">{counter.hours}</code>
                    <code className="space five">{counter.minutes}</code>
                    <code className="space six">{counter.seconds}</code>
                  </div>
                  <div className="counter-legenda">
                    <code className="space-legenda one">
                      {counter.years === 1 || counter.years === 0
                        ? "YEAR"
                        : "YEARS"}
                    </code>
                    <code className="space-legenda two">
                      {counter.months === 1 || counter.months === 0
                        ? "MONTH"
                        : "MONTHS"}
                    </code>
                    <code className="space-legenda three">
                      {counter.days === 1 || counter.days === 0
                        ? "DAY"
                        : "DAYS"}
                    </code>
                    <code className="space-legenda four">
                      {counter.hours === 1 || counter.hours === 0
                        ? "HOUR"
                        : "HOURS"}
                    </code>
                    <code className="space-legenda five">
                      {counter.minutes === 1 || counter.minutes === 0
                        ? "MINUTE"
                        : "MINUTES"}
                    </code>
                    <code className="space-legenda six">
                      {counter.seconds === 1 || counter.seconds === 0
                        ? "SECOND"
                        : "SECONDS"}
                    </code>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CounterSetUp;
