import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const InputForm = ({ setEnds, ends }) => {
  const [end, setEnd] = useState({});

  const { register, reset } = useForm();

  const saveInput = (e) => {
    e.preventDefault();
    setEnds([...ends, end]);
    setEnd({});
    reset();
  };

  return (
    <>
      <form>
        <div className="user-inputs">
          <label htmlFor="eventName">Event Name: </label>
          <input
            {...register("eventName")}
            id="eventName"
            type="text"
            onChange={(e) => setEnd({ ...end, eventName: e.target.value })}
          ></input>
          <label htmlFor="endDate">Event Date: </label>
          <input
            {...register("endDate")}
            id="endDate"
            type="date"
            onChange={(e) => setEnd({ ...end, date: e.target.value })}
          ></input>
          <label htmlFor="endTime">Event Time: </label>
          <input
            {...register("endTime")}
            id="endTime"
            type="time"
            onChange={(e) => setEnd({ ...end, time: e.target.value })}
          ></input>
          <button
            type="submit"
            onClick={(e) => {
              saveInput(e);
            }}
          >
            <code>ADD Counter</code>
          </button>
        </div>
      </form>
    </>
  );
};

export default InputForm;
