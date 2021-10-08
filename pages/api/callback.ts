import type { Request, Response } from 'express';
import { OAuth2Strategy } from 'passport-google-oauth';
import passport from 'passport';
import getConfig from 'next/config';
import { google } from 'googleapis';

const { serverRuntimeConfig } = getConfig();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = serverRuntimeConfig;

passport.use(
  new OAuth2Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(32, profile);
    }
  )
);
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        console.log(1, result);
        return reject(result);
      }
      console.log(2);
      return resolve(result);
    });
  });
}

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
