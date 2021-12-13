import getConfig from 'next/config';
import { google } from 'googleapis';
import axios from 'axios';

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
  console.log(userinfo.data, 'res');
  res.status(200).json({ query, tokens });
}
