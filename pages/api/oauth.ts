import getConfig from 'next/config';
import { google } from 'googleapis';

const { serverRuntimeConfig } = getConfig();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  APP_ORIGIN_LOCAL,
  APP_ORIGIN,
} = serverRuntimeConfig;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${process.env.NODE_ENV === 'production' ? APP_ORIGIN : APP_ORIGIN_LOCAL}/api/callback`
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/youtubepartner',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,
});
/*
export default passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtubepartner',
  ],
});
*/
export default async function Oauth(req, res) {
  console.log(req);
  res.redirect(url);
}
