import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../app.constants";
import { toast } from "react-toastify";

const AllocateSlotForm = ({ parkingLotId }) => {
  const [formData, setFormData] = useState({
    carSize: "Small",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formData.carSize) {
      errors.carSize = "Car size is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      allocateSlot();
    }
  };

  const allocateSlot = async () => {
    const data = await axios.post(apiURL + "allocateSlot/" + parkingLotId, {
      ...formData,
    });
    if (data.data.status === 200) {
      toast.success(data.data.message);
      toast.success(data.data.slotNumber);
    } else if (data.data.status === 400) {
      toast.error(data.data.message);
    } else {
      toast.info("Something went wrong");
    }
  };

  const options = ["Small", "Medium", "Large", "XLarge"];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative text-left m-3">
          <label className="block text-sm font-medium text-gray-700">
            Car Size:
          </label>
          <select
            className="mt-1 block w-full px-2 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            name="carSize"
            value={formData.carSize}
            onChange={handleChange}
          >
            {options.map((opt, index) => (
              <option key={opt + index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.carSize && <p style={{ color: "red" }}>{errors.carSize}</p>}
        </div>

        <button
          className="bg-indigo-500 text-white my-4 float-end active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AllocateSlotForm;
