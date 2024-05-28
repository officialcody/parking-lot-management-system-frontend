import React, { useState } from "react";

const DeallocateSlotForm = ({ parkingLot }) => {
  const [formData, setFormData] = useState({
    floorNumber: "",
    slotSize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted successfully", formData);
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
            onChange={handleChange}
          >
            {parkingLot.floors.map((floor) => (
              <option key={floor._id}>{floor.floorNumber}</option>
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
