import { ApiUser } from '../interfaces';
import { get } from 'https';
import { USERS_API } from '../config';

export const fetchUser = (): Promise<ApiUser> =>
  new Promise((resolve, reject) =>
    get(USERS_API as string, (res) => {
      let data = '';

      res.on('data', (chunk) => (data += chunk));

      res.on('end', () => {
        try {
          const { results } = JSON.parse(data);
          resolve(...results);
        } catch (e) {
          reject(e);
        }
      });
    })
      .on('error', (e) => reject(e))
      .end()
  );
