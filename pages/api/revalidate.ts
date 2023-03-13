import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, resp: NextApiResponse) => {
  const key = req.query.key as string;
  const path = req.query.path as string;

  if(!key || key !== process.env.REVALIDATION_TOKEN) {
    resp.status(400).send({
      success: false,
      message: 'Invalid token'
    })
    return;
  }

  try {
    await resp.revalidate(path);

    resp.status(200).send({
      success: true
    })

  } catch (err) {
    console.log(err)
    resp.status(500).send({
      success: false,
      message: `Error revalidating`
    })
    return;
  }
}

export default handler;