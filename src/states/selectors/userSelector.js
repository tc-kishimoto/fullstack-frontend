import { selector } from 'recoil';
import { userState } from '../atoms/userAtom'

const isLoginState = selector({
  key: 'isLogin',
  get: ({get}) => {
    const user = get(userState)
    if(!user) {
      return false;
    }
    if(Object.keys(user).length) {
      return true;
    }
    return false;
  },

})

export { isLoginState }