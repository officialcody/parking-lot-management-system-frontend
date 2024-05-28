import React from "react";
import Modal from "./Modal";
import AllocateSlotForm from "./AllocateSlotForm";
import DeallocateSlotForm from "./DeallocateSlotForm";

const ShowParkingLots = ({ parkingLots }) => {
  return (
    <>
      {parkingLots &&
        parkingLots.map((parkingLot) => (
          <div
            key={parkingLot._id}
            className="flex flex-col p-6 mb-10 mt-3 border-2 rounded-lg border-gray-600 lg:items-start items-center"
          >
            <div className="flex-grow">
              <div className="text-gray-900 text-lg title-font p-2">
                <span className="font-bold">Name: </span>
                {parkingLot.name}
              </div>
              <div className="text-gray-900 text-lg title-font p-2">
                <span className="font-bold">Address: </span>
                {parkingLot.address}
              </div>
              <Modal
                buttonText={"Allocate Slot"}
                modalTitle={"Allocate Slot to Car"}
                submitButtonText={"Submit"}
              >
                <AllocateSlotForm parkingLotId={parkingLot._id} />
              </Modal>
              <Modal
                buttonText={"Deallocate Slot"}
                modalTitle={"Deallocate Slot to Car"}
                submitButtonText={"Submit"}
              >
                <DeallocateSlotForm parkingLot={parkingLot} />
              </Modal>
            </div>
          </div>
        ))}
    </>
  );
};

export default ShowParkingLots;
