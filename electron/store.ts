import { safeStorage } from 'electron';
import * as Store from 'electron-store';

const store = new Store<Record<string, string>>();

export default {
  setPassword: (key: string, password: string) => {
    const buffer = safeStorage.encryptString(password);
    store.set(key, buffer.toString('latin1'));
  },
  getPassword: (key: string) => {
    return safeStorage.decryptString(
      Buffer.from(store.get(key) ?? '', 'latin1')
    );
  },
  deletePassword: (key: string) => {
    store.delete(key);
  },
  getCredentials: (): Array<{ account: string; password: string }> => {
    return Object.entries(store.store).reduce(
      (credentials, [account, buffer]) => {
        return [
          ...credentials,
          {
            account,
            password: safeStorage.decryptString(Buffer.from(buffer, 'latin1'))
          }
        ];
      },
      [] as Array<{ account: string; password: string }>
    );
  }
};
