import { yf } from '../../../util/yahoo-fantasy';
import { serialize } from 'cookie';

export default (req, res) => {
  yf.authCallback(req, (err, { access_token, refresh_token }) => {
    if (err) {
      return res.status(400).json({ err });
    }

    // console.log("PERSIST ACCESS TOKEN", access_token);
    // console.log("PERSIST REFRESH TOKEN", refresh_token);

    res.setHeader('Set-Cookie', [
      serialize('accessToken', access_token, { path: '/', httpOnly: true }),
      serialize('refreshToken', refresh_token, {
        path: '/',
        httpOnly: true
      })
    ]);

    // return res.json({
    //   access_token: access_token,
    //   refresh_token: refresh_token
    // });
    return res.redirect('/');
  });
};
