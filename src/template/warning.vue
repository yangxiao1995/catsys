<template>
  <div>
    <div class="contain-title">
      <h1> >预警管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
          <p>客户代码</p>
          <input v-model="listQuery.code" class="equiinput" type="text">
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search" @click="loadData">
            <div></div>查询<div></div>
          </button>
          </button>
          <button type="button" class="btn btn-primary text-delete" @click="alldelete" :disabled="boodelete">
            <div></div>批量删除<div></div>
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
        prop="postCode"
        label="邮件代码"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cause"
        label="预警原因"
        align="center">
      </el-table-column>
       <el-table-column
        prop="createTime"
        label="预警时间"
        align="center">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
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
            title="删除"
            @click="handleDelete(scope.row.id)"><!--<img src="../../static/img/table/delete.png" alt="">-->
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="95px"
               style='width: 400px; margin-left:50px;'>
        <input type="hidden" v-model="uid">
        <el-form-item label="客户姓名" prop="custName">
          <el-input v-model="temp.custName"></el-input>
        </el-form-item>

        <el-form-item label="客户代码" prop="custCode">
          <el-input style="margin-top:8px;" v-model="temp.custCode"></el-input>
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
  .equiinput{
    width: 280px;;
    height: 50px;;
    margin-left: 15px;
    vertical-align: super;
  }
  .text-data{
    margin-left: 70px;
  }
  .equidata{
    width: 245px !important;
    height: 50px !important;
    margin-left: 15px;
    vertical-align: super;
  }
</style>
<script src="../../static/js/jquery-ui.js"></script>
<script>
  import {warning,warningdelete,customeradd,customerone,customerput} from "../api/getlist"
  import  util from '../common/util'
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
        userName:[],
        timeout:  null,
        boodelete:true,
        boolAdd:false,
        excelList:null,
        currentPage1:1,
        listQuery: {
          prerasId:'',
          code:"",
          pageNumber:1,
        },
        total:100,
        pageSize: 10,
        tableData: {
          rows: []
        },
        textMap: {
          update: '修改',
          create: '新增'
        },
        sels:[],
        uid: '',
        dialogStatus: '',
        dialogFormVisible: false,
        temp: {
          custName: '',
          custCode: '',
          state: -1,
        },
        rules: {
          custName: [
            {required: true, message: '请输入客户姓名', trigger: 'blur'},
          ],
          custCode: [
            {required: true, message: '请输入客户代码', trigger: 'blur'},
          ],
        },
        multipleSelection: [],
        listLoading: false
      }

    },
    filters: {
      stateFilter(status) {
        const statusMap = {
          '1': '使用',
          '0': '删除',
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
      handleSelect(item) {
        console.log(item)
        this.temp.macUser=item.id
      },

      handleSizeChange(){

      },
      handleCurrentChange(val) {
        this.listQuery.pageNumber= val;
        this.loadData();
      },
      handleEdit(row){
        let self=this;
        customerone(row.id).then(res => {
          console.log(JSON.parse(res.data).data)
        this.temp={
          id:row.id,
          custName: JSON.parse(res.data).data.custName,
          custCode: JSON.parse(res.data).data.custCode,
          state: JSON.parse(res.data).data.state,
        }
      })

        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      selsChange(sels){
        this.sels = sels;
        if(this.sels.length>0){
          this.boodelete=false;
        }else{
          this.boodelete=true;
        }
      },
      loadData(){
        let self = this;
        self.listQuery.prerasId=self.$route.query.id
        warning(self.listQuery).then(res => {
          console.log(JSON.parse(res.data))
        self.tableData.rows=JSON.parse(res.data).data.data
        self.total = JSON.parse(res.data).data.total;
        self.pageSize = JSON.parse(res.data).data.pageSize;
      })
      },
      cancel(formName){
        this.$refs.temp.resetFields();
        this.dialogFormVisible=false;
      },
      update(){
        let self = this;
        this.$refs.temp.validate(valid=>{
          if (valid) {
            customerput(this.temp).then(res=>
            {
              if(JSON.parse(res.data).code=='1'){
              self.$confirm('修改成功, 是否返回列表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              }).then(() =>{
                this.dialogFormVisible = false;
              self.loadData();
            })
            }else{
              self.$message.error(JSON.parse(res.data).msg)
            }
          })
          }
        }
      )
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
          let par = {
            ids:ids
          }
          warningdelete(par).then(function (response) {
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
      handleDelete(index){
        var self = this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let par = {
            ids:index
          }
          warningdelete(par).then(function (response) {
          let rmsg=JSON.parse(response.data);
          if(rmsg.code == 1){
            self.loadData();
          }else{
            self.$message.error(rmsg.msg)
          }
        });
      }).catch(() => {
        });
      }
    }
  }
</script>
