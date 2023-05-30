import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "./customComponent/customInput";
import { useActivityCreate } from "../assets/hooks/hooks";

export default function Modal({ callb }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [activityType, setActivityType] = useState("");
  const [nameError, setNameError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [descriptionError, setDescriptonError] = useState("");
  const [valid, setValid] = useState(true);
  const fetchActivityMutation = useActivityCreate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleActivityTypeChange = (e) => {
    setActivityType(e.target.value);
  };
  const handleDurationChange = (e) => {
    const inputValue = e.target.value;

    if (
      /^\d+$/.test(inputValue) &&
      inputValue >= 1 &&
      inputValue <= 60 &&
      !inputValue.includes("-")
    ) {
      setDuration(inputValue);
    } else {
      setDuration("");
    }
  };

  const onSuccessCb = async (data) => {
    try {
      // await storeToken(data?.token);

      setActivityType("");
      setDescription("");
      setDuration("");
      setName("");
      // <Link to="/Sidebar"></Link>;
      console.log("activity successfully created");
      callb(false);
      // navigation("/Sidebar");
    } catch (error) {
      console.log("activity", error);
    }
  };

  const onErrorCb = async (error) => {
    console.log(error);
  };
  const validateName = () => {
    if (name.length < 8) {
      setNameError("Enter a valid name");
    } else {
      setNameError("");
    }
  };
  const validateActivity = () => {
    if (description.length < 10 || isNaN(description)) {
      setDescriptonError("Description must be more than 10");
    } else {
      setDescriptonError("");
    }
  };
  const validateDuration = () => {
    if (isNaN(duration)) {
      setDurationError("Duration must be a valid number");
    } else {
      setDurationError("");
    }
  };

  const handelAddActivity = (e) => {
    e.preventDefault();

    validateName();
    validateActivity();
    validateDuration();

    if (!nameError && !descriptionError && !durationError) {
      const mutationArgs = {
        name,
        description,
        activityType,
        duration,
        onSuccessCb,
        onErrorCb,
      };
      fetchActivityMutation.mutate(mutationArgs);
    }
  };

  //props.ca
  //callb(false);
  return (
    <section
      className="
    justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-opacity-50	bg-black"
    >
      <div className="bg-green-400 bg-opacity-15 rounded-lg ">
        <div className="py-2 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Create Activity
          </h2>

          <form action="#">
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-2 dark:text-white">
              <CustomInput
                type="text"
                placeholder="Name"
                name="uname"
                heading="Name"
                handleChange={(text) => handleNameChange(text)}
              />

              <div className="sm:col-span-2">
                {nameError && <p className="error">{nameError}</p>}
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <b> Description</b>
                </label>
                <textarea
                  id="description"
                  rows="5"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  required
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>

              <div>
                <label
                  for="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <b> Activity type</b>
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  onChange={handleActivityTypeChange}
                  placeholder="Select"
                >
                  <option value="   " disabled></option>
                  <option value="Run" required>
                    Run
                  </option>
                  <option value="Walk" required>
                    Walk
                  </option>
                  <option value="Hike" required>
                    Hike
                  </option>
                  <option value="Swim" required>
                    Swim
                  </option>
                  <option value="Cycling" required>
                    Cycling
                  </option>
                </select>
              </div>

              <CustomInput
                type="number"
                placeholder="Duration"
                name="time_duration"
                heading="Duration"
                required
                handleChange={(text) => handleDurationChange(text)}
              />
            </div>

            <button
              type="add"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm	border-teal-900
           border-2 w-40 m-4 text-white  bg-teal-900 rounded-3xl font-medium "
              onClick={handelAddActivity}
            >
              Add Activity
            </button>

            <button
              onClick={() => callb(false)}
              type="add"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm	border-teal-900
           border-2 w-40 m-4 text-white  bg-teal-900 rounded-3xl font-medium "
            >
              Cancel
            </button>

            {/* <button onClick={()=>callb(false)}>Close</button> */}
          </form>
        </div>
      </div>
    </section>
  );
}
