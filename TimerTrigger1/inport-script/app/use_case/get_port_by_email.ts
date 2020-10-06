import axios from "axios";

export default ({ email }): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = process.env.PORT_URL;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PORT_TOKEN || ""}`,
        },
      };
      const data = { email };
      const res = await axios.post(url, data, config);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
