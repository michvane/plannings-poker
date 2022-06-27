import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from 'utils/socket/user';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.end().status(200);

  const rooms = getUsers().map((user) => user.room);
  const filteredRooms = rooms.filter(
    (item, index) => rooms.indexOf(item) === index,
  );

  return res.status(200).json({ rooms: filteredRooms });
};

export default handler;
