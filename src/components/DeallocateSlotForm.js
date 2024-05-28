import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../app.constants";

const DeallocateSlotForm = ({ parkingLot }) => {
  const [formData, setFormData] = useState({
    floorNumber: "1",
    slotSize: "Small",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deallocateSlot();
  };

  const deallocateSlot = async () => {
    let slotNumber = `Floor ${formData.floorNumber} Slot ${
      formData.slotSize.split("")[0]
    }`;

    const data = await axios.post(apiURL + "deallocateSlot/" + parkingLot._id, {
      slotNumber,
    });
    if (data.data.status === 200) {
      toast.success(data.data.message);
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
            Floor:
          </label>
          <select
            className="mt-1 block w-full px-2 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            name="floorNumber"
            value={formData.floorNumber}
            onChange={handleChange}
          >
            {parkingLot.floors.map((floor) => (
              <option key={floor._id} value={floor.floorNumber}>
                {floor.floorNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="relative text-left m-3">
          <label className="block text-sm font-medium text-gray-700">
            Slot Size:
          </label>
          <select
            className="mt-1 block w-full px-2 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            name="slotSize"
            value={formData.slotSize}
            onChange={handleChange}
          >
            {options.map((opt, index) => (
              <option key={opt + index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
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

export default DeallocateSlotForm;
