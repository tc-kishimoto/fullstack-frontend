import { atom } from 'recoil';

const userState = atom({
  key: 'user',
  default: {},
});

export { userState };