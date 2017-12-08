<template>
  <div>
    <div class="contain-title">
      <h1> >用户管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
            <p>登录名：</p><input class="user-input" type="text" name="fullName" v-model="listQuery.loginName" value="">
            <p>用户编号：</p><input class="user-input" type="text" name="fullName" v-model="listQuery.userCode" value="">
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search" @click="loadData">
            <div></div>查询<div></div>
          </button>
          <button type="button" class="btn btn-primary text-add" @click="handleCreate">
            <div></div>+ 添加<div></div>
          </button>
        </div>
      </div>

        <el-table
          :data="tableData.rows"
          border
          tooltip-effect="dark"
          element-loading-text="拼命加载中"
        >
          <el-table-column
            align="center"
            type="selection">
          </el-table-column>
          <el-table-column label="序号" align="center" width="100">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="loginName"
            label="登录名"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userType"
            label="用户类型"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.userType | usertypeFilter}}
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮件"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="mobile"
            label="手机"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="userOrg"
            label="用户组织机构"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userCode"
            label="用户代码"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center"   width="400">
            <template slot-scope="scope">
              <el-button
                class="el-button-delete"
                size="small"
                type="default"
                @click="handleReset(scope.row.id,scope.row.userName)">重置密码
              </el-button>
              <el-button
                class="el-button-edit"
                size="small"
                type="danger"
                @click="handleEdit(scope.row)"><img src="../../static/img/table/edit.png" alt="">&nbsp;修改
              </el-button>
              <el-button
                class="el-button-delete"
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)"><img src="../../static/img/table/delete.png" alt="">&nbsp;删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

        <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="120px"
                 style='width: 400px; margin-left:50px;'>
          <input type="hidden" v-model="uid">
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="temp.loginName"></el-input>
          </el-form-item>

          <el-form-item label="用户名" prop="userName">
            <el-input style="margin-top:8px;" v-model="temp.userName"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <input type="radio" v-model="temp.state" value="-1" name="state">停用
            <input type="radio" v-model="temp.state" value="0" name="state">失效
            <input type="radio" v-model="temp.state" value="1" name="state">有效
          </el-form-item>


          <el-form-item label="用户代码" prop="userCode">
            <el-input style="margin-top:8px;" v-model="temp.userCode"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="userType">
            <el-input style="margin-top:8px;" v-model="temp.userType"></el-input>
          </el-form-item>
          <el-form-item label="用户组织机构" prop="userOrg">
            <el-input style="margin-top:8px;" v-model="temp.userOrg"></el-input>
          </el-form-item>

          <el-form-item label="电子邮件" prop="email">
            <el-input style="margin-top:8px;" v-model="temp.email"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <el-input style="margin-top:8px;"  v-model="temp.mobile"></el-input>
          </el-form-item>

          <el-form-item v-show="dialogStatus == 'create'" label="用户密码" prop="password">
            <el-input style="margin-top:8px;" type="password" v-model="temp.password"></el-input>
          </el-form-item>
          <el-form-item v-show="dialogStatus == 'create'" label="确认密码" prop="rePassword">
            <el-input style="margin-top:8px;" type="password" v-model="temp.rePassword"></el-input>
          </el-form-item>

          <el-button v-if="dialogStatus=='create'" class="btn-primary" type="primary" :disabled="boolAdd" @click="create(temp)">确 定</el-button>
          <el-button v-else type="primary" @click="update">确 定</el-button>
          <el-button @click="cancel(temp)" class="btn-white">取 消</el-button>
        </el-form>
      </el-dialog>
    </div>

    <div class="text-paging">
      <div class="page-text">
        共{{this.total}}条记录，{{this.pageNumber}}/{{getPageSize}}
      </div>
      <div class="page-text">
        <el-pagination layout=" pager,jumper"
                       background
                       @current-change="handleCurrentChange"
                       :page-size="pageSize"
                       :total="total"
                       :current-page.sync="currentPage1"
                       @size-change="handleSizeChange"
                       style="float:right;">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<style scoped>
  .title-text-left p{
    margin-left: 15px;
  }
  .user-input{
    height:50px;
    width: 160px;;
    margin-left: 5px;
  }
</style>
<script>
  import {user,userpost,userput,userdelete} from "../api/getlist"
  var socket;
  var sendFlag=0;
  var zpFormat;
  var idNum;
  export default {
    data () {
      var uname = (rule, value, callback) => {

        setTimeout(() => {
          if ((/[\u4e00-\u9fa5]+/).test(value)) {
          callback(new Error('只能输入英文字母、数字和字符'));
        } else {
          callback();
        }
      }, 1000);
      };
      var phone = (rule, value, callback) => {

        setTimeout(() => {
          if (!(/^1[34578]\d{9}$/).test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          callback();
        }
      }, 1000);
      };
      var email = (rule, value, callback) => {

        setTimeout(() => {
          if ((/[\u4e00-\u9fa5]+/).test(value)) {
          callback(new Error('只能输入字母、数字和字符'));
        }
        var reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!reg.test(value)){
          callback(new Error('输入的邮箱格式不正确'));
        } else {
          callback();
        }
      }, 1000);
      };
      var password = (rule, value, callback) => {

        setTimeout(() => {
          if ((/[\u4e00-\u9fa5]+/).test(value)) {
          callback(new Error('只能输入字母、数字和字符'));
        }
        if (value.length != 6){
          callback(new Error('密码长度为六位'))
        }
        callback();
      }, 1000);
      };
      var rePassword = (rule, value, callback) => {

        setTimeout(() => {
          if ((/[\u4e00-\u9fa5]+/).test(value)) {
          callback(new Error('只能输入字母、数字和字符'));
        }
        if (this.temp.password != value){
          callback(new Error('两次密码输入不一致'))
        }else {
          callback();
        }
      }, 1000);
      };
      return {
        boolAdd:false,
        listLoading: true,
        listQuery: {
          loginName: '',
          userCode: '',
        },
        currentPage1:1,
        pageNumber: 1,
        pageSize: 1,
        total: 0,
        uid: '',
        tableData: {
          rows: [],
        },
        textMap: {
          update: '修改',
          create: '新增'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        temp: {
          loginName: '',
          userName: '',
          email: '',
          mobile: '',
          password: '',
          state:"1",
        },
        rules: {
          loginName: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],

          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          userCode: [
            {required: true, message: '请输入用户代码', trigger: 'blur'}
          ],
          userType: [
            {required: true, message: '请输入用户类型', trigger: 'blur'}
          ],
          userOrg: [
            {required: true, message: '请输入用户组织机构', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            { validator: email, trigger: 'blur' }
          ],

          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator:phone,trigger:'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator:password,trigger:'blur'}
          ],
          rePassword: [
            {required: true, message: '请确认密码', trigger: 'blur'},
            {validator:rePassword,trigger:'blur'}
          ],
        }
      }

    },
    computed:{
      getPageSize(){
        if(Math.ceil( this.total/this.pageSize)==0){
          return 1;
        }else{
          return Math.ceil( this.total/this.pageSize)
        }
      }
    },
    filters: {

      stateFilter(status){
        const statusMap = {
          '1': '正常',
          '0': '停用'
        };
        return statusMap[status];
      },
      usertypeFilter(status){
        const statusMap = {
          '1': '管理员',
          '2': '收件员',
        };
        return statusMap[status];
      }
    },

    created(){
      this.loadData();
    },

    methods: {
      handleSizeChange(){

      },
      cancel(formName){
        this.$refs.temp.resetFields();
        this.dialogFormVisible=false;

      },
      handleCurrentChange(val){
        this.pageNumber = val;
        this.loadData();
      },
      loadData(){
        let self = this;
        user(self.listQuery).then(res => {
          console.log(JSON.parse(res.data).data.rows)
        self.tableData.rows=JSON.parse(res.data).data.rows
        self.total = JSON.parse(res.data).data.total;
        self.pageSize = JSON.parse(res.data).data.pageSize;
      })
      },
      handleEdit(row){
        this.uid = row.id;
        this.temp = {
          id:row.id,
          loginName: row.loginName,
          userName:row.userName,
          email: row.email,
          mobile: row.mobile,
          password: row.password,
          state:row.state,
          userCode:row.userCode,
          userType:row.userType,
          userOrg:row.userOrg
        }
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(val){
        let self=this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(()=> {
          userdelete(val).then(function (res) {
          if (JSON.parse(res.data).code != '1') {
            self.$message.error(JSON.parse(res).msg)
            return false;
          }
          self.loadData();
        });
      }).catch(()=> {

        });

      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      resetTemp(){
        this.temp = {
          loginName: '',
          userName: '',
          email: '',
          mobile: '',
          password: '',
          state:1,
          userCode:'',
          userType:'',
          userOrg:''
        }
      },
      //添加
      create(formName){
        this.$refs.temp.validate(valid=>{
          if (valid) {
            this.boolAdd=true;
              let self = this;
            userpost(self.temp).then(res =>{
                if(JSON.parse(res.data).code==1){
                self.$confirm('添加成功, 是否返回列表?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success'
                }).then(()=> {
                  this.dialogFormVisible = false;
                this.boolAdd=false;
                self.loadData();
              })

              }else{
                this.$message.error(JSON.parse(res.data).msg);
                this.boolAdd=false;
              }
            })
          }
        }
      )

      },

      update(){
        let self = this;
        userput(self.temp).then(res=>
        {
          self.$confirm('修改成功, 是否返回列表?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() =>{
          this.dialogFormVisible = false;
        self.loadData();
      })

      })

      },

      resultMsg(msg) {
        this.$message.error("\r\n" + msg)
//        document.getElementById("text_result").value += "\r\n" + msg;
      },
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img{
    vertical-align: sub;
  }
  /*input{*/
  /*height: 20px;;*/
  /*}*/
  /*select{*/
  /*height: 30px;;*/
  /*}*/
  .cell button{
    height: 30px;
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
