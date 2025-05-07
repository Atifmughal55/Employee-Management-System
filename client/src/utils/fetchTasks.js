import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";
import AxiosToastError from "./AxiosToastError";

const fetchTasks = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.getMyTask,
    });
    return response.data;
  } catch (error) {
    AxiosToastError(error);
  }
};

export default fetchTasks;
