<template>
  <div>
    <div class="contain-title">
      <h1> >机构管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-add" @click="handleCreate">
            <div></div>+ 添加机构<div></div>
          </button>
          <button type="button" class="btn btn-primary text-delete" @click="alldelete">
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
        prop="t_org_name"
        label="机构名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="t_org_addr"
        label="机构编号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="t_operator"
        label="机构负责收件员"
        align="center">
      </el-table-column>

     <!-- <el-table-column
        prop="t_org_prov"
        label="设备编号"
        align="center"
        show-overflow-tooltip>
      </el-table-column>-->
      <el-table-column
        prop="t_state"
        align="center"
        label="状态"
        width="110"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.t_state | stateFilter}}
        </template>
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
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="temp.orgName"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <input type="radio" v-model="temp.state" value="0" name="state">停用
          <input type="radio" v-model="temp.state" value="1" name="state">正常
        </el-form-item>
        <el-form-item label="机构编号" prop="orgAddr">
          <el-input v-model="temp.orgAddr"></el-input>
        </el-form-item>

        <el-form-item label="机构负责收件员" prop="operator">
          <el-input style="margin-top:8px;" v-model="temp.operator"></el-input>
        </el-form-item>

       <!-- <el-form-item label="设备编号" prop="orgNumber">
          <el-input style="margin-top:8px;" v-model="temp.orgNumber"></el-input>
        </el-form-item>-->

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
  import {getorgpageinfo,deleteone,organizationadd,organization,organizationalldelete,organizationput} from "../api/getlist"
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
        sels:[],
        temp: {
          orgAddr: '',
          orgName: '',
          deptName:'',
          operator: '',
          /*orgNumber: '',*/
          state: -1,
        },
        rules: {
          orgAddr: [
            {required: true, message: '请输入机构编号', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],

          operator: [
            {required: true, message: '请输入机构负责收件员', trigger: 'blur'}
          ],
          orgNumber: [
            {required: true, message: '请输入设备编号', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],
        },
      }

    },
    filters: {
      stateFilter(status) {
        const statusMap = {
          '1': '正常',
          '0': '',
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
      selsChange(sels){
        this.sels = sels;
      },
      loadData(){
        let self = this;
        getorgpageinfo().then(res => {
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
        let par={
          id:row.t_id
        }
        this.uid = row.t_id;

        organization(par).then(res =>{
          this.temp=JSON.parse(res.data).data
        })
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      //添加
      create(formName){
        this.$refs.temp.validate(valid=>{
          if (valid) {
            if(this.temp.orgName!=''){
              let self = this;
              organizationadd(self.temp).then(res =>{
                if(JSON.parse(res.data).code==1){
                self.$confirm('添加成功, 是否返回列表?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success'
                }).then(()=> {
                  this.dialogFormVisible = false;
                self.loadData();
              })

              }else{
                this.$message.error(JSON.parse(res.data).msg);
              }
            })
            }else{
              this.$message.error("请填写机构名称");
            }

          }
        }
      )
      },
      alldelete(){
        var self = this;

        var ids = this.sels.map(item =>item.t_id).toString();
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
          organizationalldelete(ids).then(function (response) {
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
          deleteone(index).then(function (response) {
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
      resetTemp(){
        this.temp = {
          orgAddr: '',
          orgName: '',
          operator: '',
          /*orgNumber: '',*/
          state: 1,
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
        organizationput(data).then(res=>
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
