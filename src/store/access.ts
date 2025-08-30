import { atomWithStorage } from 'jotai/utils';

const key_prefix = 'jia-focusTimer';

enum LOCAL_STORAGE_KEY {
  AuthToken = `${key_prefix}_auth-token`,
  Remember = `${key_prefix}_remember`,
  Fingerprint = `${key_prefix}_fingerprint`,
  Retry = `${key_prefix}_retry`,
  UserInfo = `${key_prefix}_userInfo`,
}

/**Local storage: Auth-Token */
const authTokenAtom = atomWithStorage<string | null>(
  LOCAL_STORAGE_KEY.AuthToken,
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.AuthToken) as string)
);
/**Local storage: 記住帳號密碼 */
const rememberAtom = atomWithStorage<Record<string, string> | null>(
  LOCAL_STORAGE_KEY.Remember,
  null
);

export { LOCAL_STORAGE_KEY, authTokenAtom, rememberAtom };
