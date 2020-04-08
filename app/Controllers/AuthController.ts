import { Request, Response } from 'express';
import AuthService from '../Services/AuthService';
import BaseError from '../errors/BaseError';
// TODO: use https instead of http
import qs from 'querystring';
import http from 'http';

const authService = new AuthService();

function tokenAuth(bodyData) {
  return new Promise((resolve, reject) => {
    const oauthRequest = http.request({
      method: 'POST',
      host: 'localhost',
      port: Number(process.env.PORT),
      path: '/api/v1/auth/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic ' +  Buffer.from(bodyData.username + ':' + bodyData.password).toString('base64')
      },
    });

    let chunks = '';

    oauthRequest.on('response', (res) => {
      res.on('data', (chunk) => {
        chunks += chunk;
      });

      res.on('end', () => {
        const body = chunks.toString();
        const bodyObj = JSON.parse(body);

        if (Object.values(bodyObj).length !== 0) {
          resolve(bodyObj);
        } else {
          resolve({ 'access_token': null });
        }
      })
    });

    const postData = qs.stringify({
      'username': bodyData.username,
      'password': bodyData.password,
      'grant_type': bodyData.grant_type,
      'client_id': bodyData.client_id,
      'client_secret': bodyData.client_secret,
      'scope': bodyData.scope
    });

    oauthRequest.write(postData);

    oauthRequest.end();
  });
}

export const login = async (req: Request, res: Response) => {
  const bodyData = {
    grant_type: 'password',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    username: req.body.username,
    password: req.body.password,
    scope: '*'
  };
  const result = await tokenAuth(bodyData).then(res => res);
  // res.statusCode = result.statusCode;
  return res.json({ status: 'ok?', data: result });
};

export const register = async (req: Request, res: Response, next: Function) => {
  const { email } = req.body;
  try {
    const user = await authService.isUserExists(email);
    if (user) {
      return next(new BaseError({ message: 'Вы не можете использовать этот e-mail' }));
    }
    const result = await authService.register(req.body);
    return res.send({ success: !!result });
  } catch (e) {
    return next(new BaseError({}));
  }
};

export const logout = async (req: Request, res: Response) => {

};
