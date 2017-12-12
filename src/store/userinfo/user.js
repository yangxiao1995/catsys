/*import { loginByEmail, logout, getInfo } from 'api/login';*/
import Cookies from 'js-cookie';

const user = {
  state: {
    userName: Cookies.get('X-Ivanka-userName'),
    status:'',
    token:Cookies.get('X-Ivanka-Token'),
  },
  actions: {
    // 邮箱登录
    LoginByEmail(token) {

      Cookies.set('X-Ivanka-userName',token);
      user.state.userName= Cookies.get('X-Ivanka-userName')
    },
    //token
    LoginToken(token) {
      Cookies.set('X-Ivanka-Token',token);
      user.state.token= Cookies.get('X-Ivanka-Token')
    },

    // 前端 登出
    FedLogOut() {
        Cookies.remove('X-Ivanka-Token');
        user.state.token=''
    }
  }
};

export default user;
