import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../app.constants";

const ParkingLotForm = ({ fetchParkingSpaces }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    floors: 3,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Atleast 3 Characters Required";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    } else if (formData.address.length < 8) {
      errors.address = "Atleast 8 Characters Required";
    }

    if (formData.floors < 3) {
      errors.floors = "The minimum floors number is 3";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(() => {
      let obj = { ...errors };
      delete obj[name];
      return obj;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      await createParkinglot();
      fetchParkingSpaces();
    }
  };

  const createParkinglot = async () => {
    let payload = {
      name: formData.name,
      address: formData.address,
    };
    if (parseInt(formData.floors) > 3) {
      payload.floors = parseInt(formData.floors);
    }
    const data = await axios.post(apiURL + "createParkingLot", payload);
    if (data.data.status === 200) {
      toast.success(data.data.message);
      toast.success(
        data.data.parkingLotDetails.name +
          " was created with " +
          data.data.parkingLotDetails.floors.length +
          " floors."
      );
    } else if (data.data.status === 400) {
      toast.error(data.data.message);
    } else {
      toast.info("Something went wrong");
    }
  };

  return (
    <Modal
      buttonText={"Create Parking Lot"}
      modalTitle={"Create Parking Lot"}
      submitButtonText={"Submit"}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            className="px-3 py-3 my-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="address"
            className="px-3 py-3 my-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="floors"
            className="px-3 py-3 my-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            value={formData.floors}
            onChange={handleChange}
          />
          {errors.floors && (
            <p className="text-sm text-red-500">{errors.floors}</p>
          )}
        </div>

        <button
          className="bg-indigo-500 text-white my-4 float-end active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ParkingLotForm;
