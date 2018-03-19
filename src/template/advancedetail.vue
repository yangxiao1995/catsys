<template>
  <div>
    <div class="contain-title">
      <h1> >预收寄登记详情页 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
          <p>邮件条码</p><input class="mailinput" v-model="listQuery.code" type="text">
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search" @click="loadData">
            <div></div>查询<div></div>
          </button>
          <button type="button" class="btn btn-primary text-delete" @click="alldelete" :disabled="boodelete">
            <div></div>批量删除<div></div>
          </button>
          <button type="button" class="btn btn-primary text-return" @click="returnmail" :disabled="boodelete">
            <div></div>导入<div></div>
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
      @selection-change="selsChange">
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
        prop="postCust"
        label="客户"
        align="center">
      </el-table-column>
      <el-table-column
        prop="postWeight"
        label="重量"
        align="center">
      </el-table-column>

      <el-table-column
        prop="postMoney"
        label="金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="postWidth"
        label="宽度"
        align="center">
      </el-table-column>
      <el-table-column
        prop="postTime"
        width="255"
        label="收寄时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="postCode"
        label="邮件代码"
        align="center">
      </el-table-column>

      <el-table-column
        prop="postType"
        label="类型"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="postOperation"
        align="center"
        label="操作状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.postOperation | mainstateFilter}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            class="el-button-edit"
            size="small"
            type="danger"
            title="修改"
            @click="handleEdit(scope.row)"><img src="../../static/img/table/edit.png" alt="">
          </el-button>
          <el-button
            class="el-button-delete"
            size="small"
            type="danger"
            icon="delete"
            title="删除"
            @click="handleDelete(scope.row.id)">
            <i class="el-icon-delete"></i>
            <!--<img src="../../static/img/table/delete.png" alt="">-->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="125px"
               style='width: 400px; margin-left:50px;'>
        <input type="hidden" v-model="uid">
        <el-form-item label="邮件条码" prop="postCode">
          <el-input v-model="temp.postCode"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <input type="radio" v-model="temp.postOperation" value="0" name="state">退件
          <input type="radio" v-model="temp.postOperation" value="1" name="state">正常
        </el-form-item>
        <el-form-item label="重量" prop="postWeight">
          <el-input v-model="temp.postWeight"></el-input>
        </el-form-item>

        <el-form-item label="收件员工号" prop="userName">
          <el-input style="margin-top:8px;" v-model="temp.operatorId"></el-input>
        </el-form-item>

        <el-form-item label="收件时间" prop="postTime">
          <el-input style="margin-top:8px;" v-model="temp.postTime"></el-input>
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
  import {posts,postsdelete,postssendback,postsuser} from "../api/getlist"
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
      return {
        boodelete:true,
        boolAdd:false,
        excelList:null,
        isEdit:true,
        currentPage1:1,
        listQuery: {
          code:'',
          /*  pageNumber:1,*/
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
        dialogStatus: '',
        dialogFormVisible: false,
        sels:[],
        temp: {
          postWeight: '',
          postCode: '',
          deptName:'',
          operatorId: '',
          postTime: '',
          mobile: '',
          password: '',
          rePassword:'',
          postOperation: -1,
        },
        rules: {
          postWeight: [
            {required: true, message: '请输入重量', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],
          postCode: [
            {required: true, message: '请输入邮件条码', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],

          userName: [
            {required: true, message: '请输入收件员工号', trigger: 'blur'}
          ],
          postTime: [
            {required: true, message: '请输入收件时间', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],
        },
      }

    },
    filters: {
      mainstateFilter(status) {
        const statusMap = {
          '1': '正常',
          '0': '退件'
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
      handleCurrentChange(val) {
        this.listQuery.pageNumber= val;
        this.loadData();
      },
      loadData(){
        let self = this;
        let par={
          id:self.$route.query.id,
          code:self.listQuery.code
        }
        console.log(par)
        postsuser(par).then(res => {
          console.log(JSON.parse(res.data).data)
        self.tableData.rows=JSON.parse(res.data).data
        self.total = JSON.parse(res.data).data.total;
        self.pageSize = JSON.parse(res.data).data.pageSize;
      })
      },
      alldelete(){
        var self = this;
        var ids = this.sels.map(item =>item.id).toString();

        var sub = ids.split(",");
        ids = "";
        for (var i = 0; i < sub.length;i++){
          if (sub[i] != ""){
            ids += sub[i] + ",";
          }
        }
        ids = ids.substring(0,ids.length-1);
        console.log(ids)

        this.$confirm('确认删除这些记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          postsdelete(ids).then(function (response) {
          let rmsg=JSON.parse(response.data);
          if(rmsg.code == 1){
            self.loadData();
          }else{
            self.$message.error(rmsg.msg)
          }
        });
      }).catch(() => {
        });
      },
      selsChange(sels){
        this.sels = sels;
        if(this.sels.length>0){
          this.boodelete=false;
        }else{
          this.boodelete=true;
        }
      },
      returnmail(){

      },
      handleDelete(index){
        var self = this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          postsdelete(index).then(function (response) {
          let rmsg=JSON.parse(response.data);
          if(rmsg.code == 1){
            self.loadData();
          }else{
            self.$message.error(rmsg.msg)
          }
        });
      }).catch(() => {
        });
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
      },
      resetTemp(){
        this.temp = {
          postWeight: '',
          postCode: '',
          operatorId: '',
          postTime: '',
          mobile: '',
          password: '',
          postOperation: 1,
        }
      },
      cancel(formName){
        this.$refs.temp.resetFields();
        this.dialogFormVisible=false;
      },
    }
  }
</script>
