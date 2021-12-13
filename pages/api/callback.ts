import getConfig from 'next/config';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import * as lib from '../../node/lib';

const prisma = new PrismaClient();

const { serverRuntimeConfig } = getConfig();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  APP_ORIGIN,
  APP_ORIGIN_LOCAL,
} = serverRuntimeConfig;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${process.env.NODE_ENV === 'production' ? APP_ORIGIN : APP_ORIGIN_LOCAL}/api/callback`
);

export default async function callback(req, res) {
  const { query } = req;
  const { code } = query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const userinfo = await oauth2.userinfo.get();
  if (!userinfo.data) {
    return res.status(502);
  }
  const { data } = userinfo;
  console.log(userinfo.data, 'res');
  let findRes;
  try {
    findRes = await prisma.user.findFirst({
      where: {
        email: userinfo.data.email,
      },
    });
  } catch (e) {
    console.error('Error get user PAC38', e);
    return res.status(500);
  }
  let createRes;
  if (findRes === null) {
    try {
      createRes = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          verifiedEmail: data.verified_email,
          googleId: data.id,
          role: 'guest',
          picture: data.picture,
          locale: data.locale,
        },
      });
    } catch (e) {
      console.error('Error create user PAC38', e);
      return res.status(500);
    }
  } else {
    try {
      createRes = await prisma.user.update({
        where: {
          id: findRes.id,
        },
        data: {
          name: data.name,
          email: data.email,
          verifiedEmail: data.verified_email,
          googleId: data.id,
          role: findRes.role,
          picture: data.picture,
          updated_at: new Date(),
          locale: data.locale,
        },
      });
    } catch (e) {
      console.error('Error create user PAC38', e);
      return res.status(500);
    }
  }
  const token = lib.getParsedToken(createRes);

  res.status(200).json({ query, tokens });
}
