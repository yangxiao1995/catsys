/*import { loginByEmail, logout, getInfo } from 'api/login';*/
import Cookies from 'js-cookie';

const user = {
  state: {
    userName: Cookies.get('X-Ivanka-userName'),
    status:'',
    token:Cookies.get('X-Ivanka-Token'),
    icon:Cookies.get('X-Ivanka-icon'),
    user:Cookies.get('X-Ivanka-user'),
  },
  actions: {
    // 邮箱登录
    LoginByEmail(token) {

      Cookies.set('X-Ivanka-userName',token);
      user.state.userName= Cookies.get('X-Ivanka-userName')
    },
    LoginByIcon(icon) {

      Cookies.set('X-Ivanka-icon',icon);
      user.state.icon= Cookies.get('X-Ivanka-icon')
    },
     LoginByUser(users) {

      Cookies.set('X-Ivanka-user',users);
      user.state.user= Cookies.get('X-Ivanka-user')
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
