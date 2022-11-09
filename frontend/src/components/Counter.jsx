import React, { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { useEffect } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

const Counter = ({ timezone, end }) => {
  const [counter, setCounter] = useState();
  const [complete, setComplete] = useState(false);

  const localTimeAndDate = dayjs().tz(timezone).format("DD-MM-YYYY,HH:mm:ss");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (complete) {
        clearTimeout(timeout);
      } else {
        startCounter();
      }
    }, 1000);
  }, [counter]);

  const start = dayjs()
    .set("date", localTimeAndDate?.substring(0, 2))
    .set("month", localTimeAndDate?.substring(3, 5) - 1)
    .set("year", localTimeAndDate?.substring(6, 10))
    .set("hour", localTimeAndDate?.substring(11, 13))
    .set("minute", localTimeAndDate?.substring(14, 16))
    .set("second", localTimeAndDate?.substring(17, 19));

  const endData = dayjs()
    .set("date", end.date?.substring(8, 10))
    .set("month", end.date?.substring(5, 7) - 1)
    .set("year", end.date?.substring(0, 4))
    .set("hour", end.time?.substring(0, 2))
    .set("minute", end.time?.substring(3, 5))
    .set("second", "00");

  const startCounter = () => {
    const duration = dayjs.duration(endData.diff(start));
    setCounter(duration.$d);
    if (duration.$d.seconds === 0) {
      if (duration.$d.minutes === 0) {
        if (duration.$d.hours === 0) {
          if (duration.$d.days === 0) {
            if (duration.$d.months === 0) {
              if (duration.$d.years === 0) {
                setComplete(true);
              }
            }
          }
        }
      }
    }
  };

  return (
    <>
      <div className="counter">
        <div className={complete ? "complete" : "counter-row-all"}>
          <div className="counter-details">
            <h3>
              <code className="event-name-color">{end.eventName}</code>
            </h3>
            <code>
              Date: {end.date} Time: {end.time}
            </code>
          </div>
          {counter && (
            <div>
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
                  {counter.days === 1 || counter.days === 0 ? "DAY" : "DAYS"}
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
          )}
        </div>
      </div>
    </>
  );
};

export default Counter;
