import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const Counter = () => {
  const now = dayjs();
  const local = now();

  console.log(timezone);

  return (
    <>
      <div>Counter</div>
    </>
  );
};

export default Counter;
