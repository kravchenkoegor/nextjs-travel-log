import * as admin from 'firebase-admin';
import { NextApiRequest } from 'next';
import { COOKIE_NAME } from '../tokenCookies';

async function verifyIdToken(token: string) {
  const {
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID
  } = process.env;
  const firebasePrivateKey: string = FIREBASE_PRIVATE_KEY ?? '';

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n')
      })
    });
  }

  return admin.auth().verifyIdToken(token).catch();
}

export async function loadIdToken(req: NextApiRequest): Promise<string | null> {
  if (!req.cookies[COOKIE_NAME]) {
    return null;
  }

  const decodedToken = await verifyIdToken(req.cookies[COOKIE_NAME]);
  if (!decodedToken) {
    return null;
  }

  return decodedToken.uid;
}
