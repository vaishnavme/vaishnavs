import userServices from "@/lib/user-services";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, resp: NextApiResponse) => {
  const { data } = req.body;

  try {
    if (!data.email || !data.password) {
      return resp.status(400).send({
        success: false,
        message: "Invalid request",
      });
    }

    const loginData = await userServices.login({
      email: data.email,
      password: data.password,
    });

    resp.send({
      success: true,
      loginData,
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: "Serve is sleeping!!",
    });
  }
};

export default handler;
