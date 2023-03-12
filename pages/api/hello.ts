// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async(
  req: NextApiRequest,
  resp: NextApiResponse
) => {
  const siteInfo = {
    name: 'Vaishnav Chandurkar',
    job: 'Software Engineer @PeerlistHQ',
    site: 'https://vaishnavs.vercel.app',
    social: {
      peerlist: 'https://peerlist.io/vaishnavs',
      twitter: 'https://twitter.com/vaishnavs0'
    },
    sayHello: 'https://peerlist/inbox'
  }
  resp.status(200).send(siteInfo);
}

export default handler;
