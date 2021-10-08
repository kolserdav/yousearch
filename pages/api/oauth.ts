import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
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
      return done(0, {
        accessToken,
        refreshToken,
        profile,
      });
    }
  )
);

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/callback'
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/youtubepartner',
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
  res.redirect(url);
}
