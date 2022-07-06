import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";

export const FetchFromServer = async (what) => {
  try {
    const response = await axios.get(
      `${config.serverUrl}/get?collection=${what}`,
      {
        headers: getAuth,
      }
    );
    const data = await response.data;
    if (response.status === 200) return data;
    return { error: response.statusText };
  } catch (err) {
    return { error: String(err) };
  }
};

export const ExecuteQuery = async (what, options) => {
  try {
    const response = await axios.post(
      `${config.serverUrl}/${what}`,
      {
        ...options,
      },
      {
        headers: getAuth,
      }
    );
    const data = await response.data;
    if (data.error === undefined) return data;
    return { error: response.statusText };
  } catch (err) {
    return { error: String(err) };
  }
};
