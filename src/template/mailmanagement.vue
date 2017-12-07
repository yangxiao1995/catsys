<template>
  <div>
    <div class="contain-title">
      <h1> >邮件管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
          <p>邮件条码</p><input class="mailinput" type="text">
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search">
             <div></div>查询<div></div>
          </button>
          <button type="button" class="btn btn-primary text-add" @click="handleCreate">
            <div></div>+ 添加机构<div></div>
          </button>
          <button type="button" class="btn btn-primary text-delete">
            <div></div>批量删除<div></div>
          </button>
          <button type="button" class="btn btn-primary text-return">
            <div></div>- 批量退件<div></div>
          </button>
        </div>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData.rows"
      border
      v-loading.body="listLoading"
      border fit highlight-current-row
      element-loading-text="拼命加载中"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="">
      <el-table-column
        align="center"
        type="selection">
      </el-table-column>
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="postCode"
        label="邮件条码"
        align="center">
      </el-table-column>
      <el-table-column
        prop="postWeight"
        label="重量"
        align="center">
      </el-table-column>

      <el-table-column
        prop="operatorId"
        label="收件员工号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="postTime"
        label="收件时间"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="postState"
        align="center"
        label="状态"
        width="110"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="func"
        align="center"
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
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
            @click="handleDelete(scope.row.t_id)"><img src="../../static/img/table/delete.png" alt="">&nbsp;删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="125px"
               style='width: 400px; margin-left:50px;'>
        <input type="hidden" v-model="uid">
        <el-form-item label="邮件条码" prop="roleName">
          <el-input v-model="temp.roleId"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <input type="radio" v-model="temp.hasvalid" value="0" name="state">停用
          <input type="radio" v-model="temp.hasvalid" value="1" name="state">正常
        </el-form-item>
        <el-form-item label="重量" prop="loginName">
          <el-input v-model="temp.loginName"></el-input>
        </el-form-item>

        <el-form-item label="收件员工号" prop="userName">
          <el-input style="margin-top:8px;" v-model="temp.userName"></el-input>
        </el-form-item>

        <el-form-item label="收件时间" prop="email">
          <el-input style="margin-top:8px;" v-model="temp.email"></el-input>
        </el-form-item>

        <el-button v-if="dialogStatus=='create'" class="btn-primary" type="primary" :disabled="boolAdd" @click="create(temp)">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
        <el-button @click="cancel(temp)" class="btn-white">取 消</el-button>
      </el-form>
    </el-dialog>
    <div class="text-paging">
      <div class="page-text">
        共{{this.total}}条记录，{{this.listQuery.pageNumber}}/{{getPageSize}}
      </div>
      <div class="page-text">
        <el-pagination layout=" pager,jumper"
                       background
                       @current-change="handleCurrentChange"
                       :page-size="listQuery.limit"
                       :total="total"
                       :current-page.sync="currentPage1"
                       @size-change="handleSizeChange"
                       style="float:right;">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
  import {posts} from "../api/getlist"
  export default {
    data() {
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
        excelList:null,
        isEdit:true,
        currentPage1:1,
        listQuery: {
          pageNumber:1,
        },
        total:100,
        pageSize: 10,
        tableData: {
          rows: []
        },
        multipleSelection: [],
        listLoading: false,
        textMap: {
          update: '修改',
          create: '新增'
        },
        uid: '',
        roleList: [],
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
        },
      }

    },
    filters: {
      houseTypeFilter(status) {
        const statusMap = {
          '1': '直管',
          '2': '私房',
          '3': '自管',
          '4': '其他'
        };
        return statusMap[status]
      },
    },
    created() {
      this.loadData();
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
    methods: {
      handleSizeChange(){

      },
      handleUpdate(row){
        this.$router.push({path: 'info', query: {id: row.id,searchList:this.listQuery,paths:'article'}})
      },
      handleCurrentChange(val) {
        this.listQuery.pageNumber= val;
      },
      loadData(){
        let self = this;
        posts().then(res => {
          console.log(JSON.parse(res.data).data.rows)
        self.tableData.rows=JSON.parse(res.data).data.rows
        self.total = JSON.parse(res.data).data.total;
      })
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
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
      cancel(formName){
        this.$refs.temp.resetFields();
        this.dialogFormVisible=false;

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
    }
  }
</script>
