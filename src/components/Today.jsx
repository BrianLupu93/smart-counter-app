import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Today = ({ timezone }) => {
  const [today, setToday] = useState({});

  const localTimeAndDate = dayjs().tz(timezone);

  useEffect(() => {
    setToday({
      date: dayjs(localTimeAndDate).format("DD MMMM YYYY"),
      time: dayjs(localTimeAndDate).format("HH:mm:ss"),
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToday({
        date: dayjs(localTimeAndDate).format("DD MMMM YYYY"),
        time: dayjs(localTimeAndDate).format("HH:mm:ss"),
      });
    }, 1000);
  }, [today]);

  return (
    <>
      <div className="display-time">
        <code>{today.date}</code>
        <code>{today.time}</code>
      </div>
    </>
  );
};

export default Today;
