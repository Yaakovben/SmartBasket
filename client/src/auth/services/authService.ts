import axios from "axios";

export const loginService = async (userName: string, password: string) => {
  try {
    const res = await axios.post("http://localhost:1020/login", {
      userName,
      password,
    });
    return res.data;
  } catch (err: any) {
    throw new Error("שגיאה בשרת");
  }
};
export const registerService = async (userName: string, password: string) => {
  try {
    const res = await axios.post("http://localhost:1020/register", {
      userName,
      password,
    });
    return res.data;
  } catch (err: any) {
    throw new Error("שגיאה בשרת");
  }
};
