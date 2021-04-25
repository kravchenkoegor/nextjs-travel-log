import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE_NAME } from 'src/auth/tokenCookies';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(COOKIE_NAME, req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60,
      sameSite: true,
      path: '/'
    })
  );

  res.status(200).json({ success: true });
}
