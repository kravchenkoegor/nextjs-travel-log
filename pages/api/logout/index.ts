import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE_NAME } from 'src/auth/tokenCookies';

export default function logout(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: true,
      path: '/'
    })
  );

  res.status(200).json({ success: true });
}
