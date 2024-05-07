import axios from "axios";
const rootAPI = import.meta.env.VITE_APP_ROOTAPI;
const userEP = rootAPI + "/users";
const tranEP = rootAPI + "/transactions";

const getUserId = () => {
  const userStr = localStorage.getItem("user");
  const userObj = userStr ? JSON.parse(userStr) : null;
  return userObj?._id ?? null;
};

export const postNewUser = async (userObj) => {
  try {
    const { data } = await axios.post(userEP, userObj);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const userLogin = async (loginInfo) => {
  try {
    const { data } = await axios.post(userEP + "/login", loginInfo);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postNewTrans = async (transObj) => {
  try {
    const userId = getUserId();
    // !userId && throw new Error("User id doesnot exist! login  and try again")
    if (!userId) {
      return {
        status: "error",
        message: "user id not found, login and try again",
      };
    }
    const { data } = await axios.post(tranEP, transObj, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchTrans = async (userId) => {
  try {
    const userId = getUserId();
    // !userId && throw new Error("User id doesnot exist! login  and try again")
    if (!userId) {
      return {
        status: "error",
        message: "user id not found, login and try again",
      };
    }
    const { data } = await axios.get(tranEP, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTrans = async (ids) => {
  try {
    const { data } = await axios.delete(tranEP, { data: { ids } });
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
