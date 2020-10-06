import axios from "axios";

export default ({ create_date }): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = process.env.PORT_URL;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PORT_TOKEN || ""}`,
        },
      };
      const data = { create_date };
      const res = await axios.post(url, data, config);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
