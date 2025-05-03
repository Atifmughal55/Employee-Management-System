import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const UserProfileAvatarEdit = ({ close }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });

      const { data: responseData } = response;
      dispatch(
        updateAvatar(`${responseData.data.profilePicture}?t=${Date.now()}`)
      );
    } catch (e) {
      AxiosToastError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button
          onClick={close}
          className="text-neutral-700 w-fit block ml-auto"
        >
          <IoClose />
        </button>
        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm ">
          {user.profilePicture ? (
            <img
              src={`${user.profilePicture}?t=${Date.now()}`}
              alt={user.firstName.split("")[0]}
              className="w-full h-full object-cover"
            />
          ) : user.firstName ? (
            <span className="text-blue-600 text-3xl font-semibold">
              {user.firstName[0].toUpperCase()}
            </span>
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="uploadProfile">
            <div className="cursor-pointer  border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3">
              {loading ? "Loading..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden "
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
