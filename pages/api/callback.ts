import type { Request, Response } from 'express';
import getConfig from 'next/config';
import { google } from 'googleapis';

const { serverRuntimeConfig } = getConfig();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = serverRuntimeConfig;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/callback'
);

export default async function callback(req, res) {
  const { query } = req;
  const { code } = query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  console.log(tokens);
  res.status(200).json({ query, tokens });
}
