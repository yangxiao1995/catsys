<template>
  <div>
    <div class="main_header">
        <div class="logo-title">
         收寄一体机作业平台
        </div>
      <div class="hearder-func">
        <span class="m-r-sm text-muted welcome-message">欢迎,{{userinfo}}&nbsp;</span><!--<i class="fa fa-caret-down fa-3x"></i>-->
        <a data-toggle="modal" data-target=".bs-example-modal-sm">
          [退出]
        </a>
      </div>
    </div>
    <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="mySmallModalLabel">提示框</h4>
          </div>
          <div class="modal-body">
            您确定要退出登录么<br><br>
            <a  class="btn btn-success" data-dismiss="modal" @click="back">确定</a>
            <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters} from 'vuex'
  import store from '.././store/userinfo/user'
  export default {
    data(){
      return{
        userinfo:store.state.userName
      }
    },
    name: 'header',
    computed: mapGetters({
      username: 'username',
      password: 'password'
    }),
    methods: {
      back(){
        var self=this;
          store.actions.FedLogOut();
        self.$router.push({path: '/login'});
      }
    }
  }
</script>

<style scoped>
  .modal-body {
    font-size: 18px;
  }
</style>
