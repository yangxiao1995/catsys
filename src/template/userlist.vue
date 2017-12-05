<template>
  <div>
    <div class="contain-title">
      <h1> >用户管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
            <p>登录名：</p><input class="user-input" type="text" name="fullName" v-model="listQuery.loginName" value="">
            <p>用户名：</p><input class="user-input" type="text" name="fullName" v-model="listQuery.userName" value="">
            <p>邮箱：</p><input class="user-input" type="text" name="homeNo" v-model="listQuery.email" value="">
            <p>手机号：</p><input class="user-input" type="text" name="fullName" v-model="listQuery.mobile" value="">
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search">
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
            prop="email"
            label="邮箱"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="手机"
            align="center"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="deptName"
            label="职责范围"
            align="center"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="roleName"
            label="角色"
            align="center"
          ></el-table-column>
          <el-table-column
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.hasvalid |stateFilter}}
            </template>
          </el-table-column>
          <el-table-column
            label="登录状态"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              {{scope.row.errorPass |passFilter}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center"   width="300">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="default"
                class="btn-review"
                @click="handleReset(scope.row.id,scope.row.userName)">重置密码
              </el-button>
              <el-button
                size="small"
                type="default"
                class="bg-dj01"
                @click="handleEdit(scope.row)"><img src="" alt=""> 修改
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)"><img src="" alt=""> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

        <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="80px"
                 style='width: 400px; margin-left:50px;'>
          <input type="hidden" v-model="uid">
          <el-form-item label="角色" prop="roleName">



            <select name="sectionName" class="form-control"  :model="temp" placeholder="请选择角色类型  "  v-model="temp.roleId"
                    id="">
              <option v-for="(item,index) in roleList" :value="item.id">{{item.roleName}}</option>
            </select>

          </el-form-item>

          <el-form-item label="状态">
            <input type="radio" v-model="temp.hasvalid" value="0" name="state">停用
            <input type="radio" v-model="temp.hasvalid" value="1" name="state">正常
          </el-form-item>
          <el-form-item label="登录状态">
            <input type="radio" v-model="temp.errorPass" value="5" name="loginstate">锁定&nbsp;&nbsp;&nbsp;
            <input type="radio" v-model="temp.errorPass" value="0" name="loginstate">未锁定
          </el-form-item>
          <el-form-item label="评估公司" prop="appCompany" v-if="temp.roleId == 46">
            <select name="appCompany" class="form-control" v-model="temp.userType"
                    id="appCompany">
              <option value="1">北京华信房地产评估有限公司</option>
              <option value="2">北京中鼎联合房地产评估有限公司</option>
            </select>
          </el-form-item>
          <el-form-item label="职责范围" prop="deptName" v-if="temp.roleId != 46">
            <select name="sectionNames" class="form-control" v-model="temp.deptId"
                    id="sectionNames">
              <option value="0">-全部-</option>
              <option v-for="(item,index) in section" :value="item.id">{{item.sectionName}}</option>
            </select>
          </el-form-item>
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="temp.loginName"></el-input>
          </el-form-item>

          <el-form-item label="用户名" prop="userName">
            <el-input style="margin-top:8px;" v-model="temp.userName"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input style="margin-top:8px;" v-model="temp.email"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <el-input style="margin-top:8px;"  v-model="temp.mobile"></el-input>
          </el-form-item>

          <el-form-item v-show="dialogStatus == 'create'" label="密码" prop="password">
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
  var socket;
  var sendFlag=0;
  var zpFormat;
  var idNum;
  export default {
    name: 'hello',

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
        roleList: [],
        section: [],
        listQuery: {
          loginName: '',
          userName: '',
          email: '',
          mobile: '',
          idNumber:'',
          pageNumber: 1,
          limit: 10
        },

        pageSize: 1,
        total: 0,
        uid: '',
        searchKey: '',
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
          roleName: '',
          deptName:'',
          userName: '',
          email: '',
          mobile: '',
          password: '',
          rePassword:'',
          deptId:'',
          roleId: '',
          hasvalid: -1,
          errorPass:-1
        },
        rules: {
          loginName: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],

          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
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
    computed: {
      getPageSize(){
        return Math.ceil(this.total / this.pageSize);
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
      passFilter(status){
        const statusMap = {
          '1': '未锁定',
          '2': '未锁定',
          '3': '未锁定',
          '4': '未锁定',
          '0': '未锁定',
          '5': '锁定',
          'undefined':'未锁定'
        };
        return statusMap[status];
      }
    },

    created(){
      this.loadData();
      this.getRoleList();
      /*this.openReader();*/
      this.sections();
    },

    methods: {
      cancel(formName){
        this.$refs.temp.resetFields();
        this.dialogFormVisible=false;

      },
      handleCurrentChange(val){
        this.listQuery.pageNumber = val;
        this.loadData();
      },
      loadData(){

      },
      handleEdit(row){
        this.uid = row.id;
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        if (this.temp.errorPass != 5){
          this.temp.errorPass = 0;
        }
        var releng=this.roleList.length
        for(var i=0;i<releng;i++){
          if(this.temp.roleName == this.roleList[i].roleName){
            this.temp.roleId=this.roleList[i].id;
          }
        }
        var depeng=this.section.length
        for(var i=0;i<depeng;i++){
          if (this.temp.deptName == '全部'){
            this.temp.deptId = '';
          }
          if(this.temp.deptName == this.section[i].sectionName){
            this.temp.deptId=this.section[i].id;
          }
        }
      },
      handleReset(val,name){
        let self=this;
        this.$confirm('确认重置'+name+'的密码吗?', '提示', {
          type: 'warning'
        }).then(()=> {
          resetPassword(val).then(function (res) {
          if (JSON.parse(res.data).code != '1') {
            self.$message.error(JSON.parse(res).msg)
            return false;
          }else {
            self.$message.success('重置密码成功')
          }
          self.loadData();
        });
      }).catch(()=> {

        });

      },
      handleDelete(val){
        let self=this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(()=> {
          delUser(val).then(function (res) {
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
          roleName: '',
          userName: '',
          email: '',
          mobile: '',
          password: '',
          roleId: '',
          hasvalid: 1,
          errorPass:0

        }
      },
      //添加

      create(formName){
        this.$refs.temp.validate(valid=>{
          if (valid) {
            this.boolAdd=true;
            if(this.temp.roleId!=''){
              let data = {
                params: JSON.stringify(this.temp)
              }
              let self = this;
              postUser(data).then(res =>{
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
            }else{
              this.$message.error("请选择角色");
              this.boolAdd=false;
            }

          }
        }
      )

      },

      update(){
        let data = {

          params: JSON.stringify(this.temp)
        }
        let self = this;
        putUser(data).then(res=>
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
      sections(){
        let self = this;
        enIndexsections().then(function (response) {
          if (JSON.parse(response.data).code == 1) {
            self.section = JSON.parse(response.data).data;
          }
        });
      },
      getRoleList(){

        getRoleAll().then( res => {
          this.roleList = JSON.parse(res.data).data;
      })
      },
      resultMsg(msg) {
        this.$message.error("\r\n" + msg)
//        document.getElementById("text_result").value += "\r\n" + msg;
      },
      openReader(){
        var self=this;
        var host = "ws://127.0.0.1:6688";
        if (socket == null) {
//          this.resultMsg("设备连接成功.");
          console.log( "设备连接成功.")
          socket = new WebSocket(host);
        } else {
//          this.resultMsg("设备已开打.");
          console.log('设备已开打')
        }
        try {
//          socket.onopen = function (msg) {
//        /*    clearZP(); //清除zp文件夹的身份证头像*/
//        console.log("open")
//          };
          socket.onerror = function () {
            self.resultMsg("请安装驱动.");
          };
          socket.onmessage = function (msg) {
            if (typeof msg.data == "string") {
              var msgM = msg.data + "";
              if (sendFlag == 1) {
                //resultMsg("清除头像成功.");
                openReaderStart();
              } else if (sendFlag == 2) {
                if (msgM[0] == "1") {  //1:连接设备成功
                  self.resultMsg("连接成功.");
                } else { //2:连接设备失败
                  self.resultMsg("请连接设备.");
                }
              } else if (sendFlag == 3) {
                if (msgM[0] == "0") {
                  self.resultMsg("身份证阅读器异常,请联系管理员.");
                } else if (msgM[0] == "3") {
                  self.resultMsg("请连接设备.");
                } else if (msgM[0] == "4") {
                  self.resultMsg("请放身份证.");
                } else if (msgM[0] == "5") {
                  self.resultMsg("读取身份证信息失败,请查身份证是否有效.");
                } else if (msgM[0] == "6") {
                  self.resultMsg("读取身份证头像失败,请查身份证是否有效.");
                } else {
                  //获得身份信息

                  document.getElementById("text_idNum").value = msgM.match(/IDCode(\S*)IDCode/)[1];         //身份证号
                  idNum=msgM.match(/IDCode(\S*)IDCode/)[1];

                }
              } else if (sendFlag == 4) {
                closeSocket();
                if (msgM[0] == "1") {  //1:关闭设备成功
                  this.$message.error("关闭设备成功.");
                }
              }
            }
            else {
              this.resultMsg("连接异常,请检查是否成功安装华旭J15S驱动.");
            }
          };
        }
        catch (ex) {
          this.resultMsg("连接异常,请检查是否成功安装华旭J15S驱动.");
        }
      },
      readIDCard() {
        zpFormat=document.getElementById("text_zpFormat").value;
        sendFlag=3;
        try {
          console.log( zpFormat)
          socket.send("SDT_ReadCard#"+zpFormat+"#");
        }
        catch (ex) {
//          this.resultMsg("请打开设备.");
        }
      },
      read(){
        this.openReader();
        this.readIDCard();

      }

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
