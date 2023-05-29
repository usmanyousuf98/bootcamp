import React, { useState } from "react";
import Modal from "../Modal";
import { useActivityDelete } from "../../assets/hooks/hooks";
import CustomEditModal from "../CustomEditModal";

export const CustomCards = ({
  id,
  title,
  description,
  activityType,
  duration,
  date,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEidtModal, setEditShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const deleteFn = useActivityDelete();

  const handleClickToOpen = () => {
    setOpen(true);
  };
  const handleToClose = () => {
    setOpen(false);
  };
  const onSuccessCb = async (data) => {
    try {
      // <Link to="/Sidebar"></Link>;
      console.log("delete: ", data);
    } catch (error) {
      console.log("delte : ", error);
    }
  };

  const onErrorCb = async (error) => {
    console.log("error : ", error.message);
  };
  const handleDelete = () => {
    //onDelete(id);
    console.log(" id ksksksk: ", id);
    const mutationArgs = {
      id,
      onSuccessCb,
      onErrorCb,
    };
    deleteFn.mutate(mutationArgs);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-300 m-6 grid ">
      <div className="px-4 pt-4">
        {/* <div className="bg-white rounded-lg shadow-md p-4"> */}
        <h2 className="card_title font-bold">name : {title}</h2>
        <p className="card_description font-bold">description: {description}</p>
        <p className="activity_type font-bold">activity: {activityType}</p>
        <p className="card_duration font-bold">duration: {duration} minutes</p>
        <p className="card_date font-bold">date: {date} </p>
      </div>

      <div className="px-4  flex justify-center pt-6 pb-2">
        <button
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="bg-teal-900 text-white px-4 py-2 rounded-md m-2"
          type="button"
          onClick={() => {
            setEditShowModal(true);
          }}
        >
          Edit
        </button>
        {showEidtModal ? (
          <>
            <CustomEditModal
              callb={setEditShowModal}
              title={title}
              id={id}
              description={description}
              duration={duration}
              activityType={activityType}
              date={date}
            />
          </>
        ) : null}
        {showModal ? (
          <>
            <Modal callb={setShowModal} />
          </>
        ) : null}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            class="bg-teal-900 text-white px-4 py-2 rounded-md m-2"
            type="button"
            onClick={handleClickToOpen}
          >
            Delete
          </button>
          <dialog
            class="bg-teal-900 text-white rounded-md items-center		 "
            open={open}
            onClose={handleToClose}
          >
            <h4 class="  pb-5 ">Do you want to delete this avtivity?</h4>

            <dialogactions className=" flex justify-center ">
              <button
                class="bg-white text-teal-900 px-4 py-2 rounded-md m-2"
                onClick={() => handleDelete()}
              >
                Yes
              </button>

              <button
                class="bg-white text-teal-900 px-4 py-2 rounded-md m-2"
                onClick={handleToClose}
                color="primary"
                autoFocus
              >
                No
              </button>
            </dialogactions>
          </dialog>
        </div>

        <div></div>
      </div>
    </div>
  );
};
export default CustomCards;
