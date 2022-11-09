import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const InputForm = ({ setEnds, ends }) => {
  const [end, setEnd] = useState({});

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const saveInput = () => {
    setEnds([...ends, end]);
    setEnd({});
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveInput)}>
        <div className="user-inputs">
          <div className="event-name">
            <div>
              <label className="label-input" htmlFor="eventName">
                Event Name:
              </label>
              <input
                {...register("eventName", {
                  required: {
                    value: true,
                    message: "The event name is Required!",
                  },
                })}
                id="eventName"
                type="text"
                onChange={(e) =>
                  setEnd({ ...end, eventName: e.target.value.toUpperCase() })
                }
              />
            </div>
            <div>
              {errors.eventName && (
                <code className="error">{errors.eventName.message}</code>
              )}
            </div>
          </div>

          <div className="event-date">
            <div>
              {" "}
              <label className="label-input" htmlFor="endDate">
                Event Date:
              </label>
              <input
                {...register("endDate", {
                  required: {
                    value: true,
                    message: "The event date is Required!",
                  },
                })}
                id="endDate"
                type="date"
                onChange={(e) => setEnd({ ...end, date: e.target.value })}
              />
            </div>
            <div>
              {" "}
              {errors.endDate && (
                <code className="error">{errors.endDate.message}</code>
              )}
            </div>
          </div>

          <div className="event-time">
            <div>
              {" "}
              <label className="label-input" htmlFor="endTime">
                Event Time:{" "}
              </label>
              <input
                {...register("endTime", {
                  required: {
                    value: true,
                    message: "The event time is Required!",
                  },
                })}
                id="endTime"
                type="time"
                onChange={(e) => setEnd({ ...end, time: e.target.value })}
              />
            </div>
            <div>
              {errors.endTime && (
                <code className="error">{errors.endTime.message}</code>
              )}
            </div>
          </div>

          <button className="start-btn" type="submit">
            <code>START</code>
          </button>
        </div>
      </form>
    </>
  );
};

export default InputForm;
