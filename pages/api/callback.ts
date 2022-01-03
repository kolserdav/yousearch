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
  let createRes: User & {
    Token: {
      id: number;
    }[];
  };
  try {
    createRes = await prisma.user.findFirst({
      where: {
        email: userinfo.data.email,
      },
      include: {
        Token: {
          select: {
            id: true,
          },
        },
      },
    });
  } catch (e) {
    console.error('Error get user PAC38', e);
    return res.status(500);
  }
  if (createRes === null) {
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
        include: {
          Token: {
            select: {
              id: true,
            },
          },
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
          id: createRes.id,
        },
        data: {
          name: data.name,
          email: data.email,
          verifiedEmail: data.verified_email,
          googleId: data.id,
          role: createRes.role,
          picture: data.picture,
          updated_at: new Date(),
          locale: data.locale,
        },
        include: {
          Token: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (e) {
      console.error('Error create user PAC38', e);
      return res.status(500);
    }
  }
  if (createRes.Token[0]) {
    await prisma.token.update({
      where: {
        id: createRes.Token[0].id,
      },
      data: {
        idToken: tokens.id_token,
        access: tokens.access_token,
        expityDate: tokens.expiry_date,
        scope: tokens.scope,
        type: tokens.token_type,
        userId: createRes.id,
      },
    });
  } else {
    try {
      await prisma.user.update({
        where: {
          id: createRes.id,
        },
        data: {
          Token: {
            create: {
              idToken: tokens.id_token,
              access: tokens.access_token,
              expityDate: tokens.expiry_date,
              scope: tokens.scope,
              type: tokens.token_type,
            },
          },
          updated_at: new Date(),
        },
      });
    } catch (e) {
      console.error('Error create token PAC139', e);
      return res.status(500);
    }
  }
  const token = lib.getParsedToken(createRes.id);
  res.redirect(`/?token=${token}`);
}
