<template>
  <div>
    <div class="contain-title">
      <h1> >设备管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
          <p>设备名称</p><input v-model="listQuery.macName" class="equiinput" type="text">
          <p class="text-data">入网时间</p>
         <!-- <input v-model="listQuery.macWorkTime" class="equidata" type="text" id="datepicker">-->
          <div class="block">
            <el-date-picker
              v-model="listQuery.macWorkTime"
              class="equidata"
              type="date"
              format="yyyy-MM-dd"
              @change="getData"
              placeholder="选择日期">
            </el-date-picker>
          </div><div class="dataimg"><img src="../../static/img/data.png" alt=""></div>
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search" @click="loadData">
            <div></div>查询<div></div>
          </button>
          <button type="button" class="btn btn-primary text-add"  @click="handleCreate">
            <div></div>+ 添加设备<div></div>
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
        prop="macName"
        label="设备名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="macSeries"
        label="序列号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="macType"
        label="型号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="macManufacturer"
        label="厂商"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="macUser"
        align="center"
        label="设备管理人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="macWorkTime"
        align="center"
        label="入网时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="macState"
        align="center"
        label="状态"
        width="110"
        show-overflow-tooltip>
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
            @click="handleDelete(scope.row.id)"><img src="../../static/img/table/delete.png" alt="">&nbsp;删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="95px"
               style='width: 400px; margin-left:50px;'>
        <input type="hidden" v-model="uid">
        <el-form-item label="设备名称" prop="macName">
          <el-input v-model="temp.macName"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <input type="radio" v-model="temp.macState" value="0" name="state">停用
          <input type="radio" v-model="temp.macState" value="1" name="state">正常
        </el-form-item>
        <el-form-item label="序列号" prop="macSeries">
          <el-input v-model="temp.macSeries"></el-input>
        </el-form-item>

        <el-form-item label="型号" prop="macType">
          <el-input style="margin-top:8px;" v-model="temp.macType"></el-input>
        </el-form-item>

        <el-form-item label="厂商" prop="macManufacturer">
          <el-input style="margin-top:8px;" v-model="temp.macManufacturer"></el-input>
        </el-form-item>

        <el-form-item label="设备管理人" prop="macUser">
          <el-autocomplete
            style="margin-top:8px;"
            v-model="temp.macUser"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item  label="入网时间" prop="macWorkTime">
          <el-input style="margin-top:8px;"   v-model="temp.macWorkTime"></el-input>
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
  import {machine,machineadd,machinedelete,machineput,getusers} from "../api/getlist"
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
        equipment:[],
        timeout:  null,
        boodelete:true,
        boolAdd:false,
        excelList:null,
        isEdit:true,
        currentPage1:1,
        listQuery: {
          macName:'',
          macWorkTime:"",
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
          macName: '',
          deptName:'',
          macType: '',
          macManufacturer: '',
          macUser: '',
          macWorkTime: '',
          deptId:'',
          macState: -1,
        },
        rules: {
          macName: [
            {required: true, message: '请输入设备名称', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],
          macManufacturer: [
            {required: true, message: '请输入厂商', trigger: 'blur'},
            { validator: uname, trigger: 'blur' }
          ],

          macUser: [
            {required: true, message: '请输入设备管理人', trigger: 'blur'},
           /* {validator:uname,trigger:'blur'}*/
          ],
          macWorkTime: [
            {required: true, message: '请输入入网时间', trigger: 'blur'},
            {validator:uname,trigger:'blur'}
          ],
        },
        multipleSelection: [],
        listLoading: false
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
      querySearchAsync(queryString, cb ) {
        var equipment = this.equipment;
        var results = queryString ? equipment.filter(this.createStateFilter(queryString)) : equipment;
        cb (results)
      },
      createStateFilter(queryString) {
        return (equipment) => {
          return (equipment.userName.indexOf(queryString) >= 0);
        };
      },

      handleSelect(item) {
        console.log(item)
        this.$refs.temp.resetFields("macUser");
        this.temp.macUser=item.userName
      },

      handleSizeChange(){

      },
      handleCurrentChange(val) {
        this.listQuery.pageNumber= val;
        this.loadData();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      getData(){
        if (this.listQuery.macWorkTime != '') {
          this.listQuery.macWorkTime = util.formatDate.format(new Date(this.listQuery.macWorkTime), 'yyyy-MM-dd');
        }

      },
      handleEdit(row){
        this.uid = row.id;
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        let self=this
        getusers().then(res => {
          console.log("...")
        console.log(JSON.parse(res.data))
        self.equipment=JSON.parse(res.data).data
      })
      },
      selsChange(sels){
        this.sels = sels;
        if(this.sels.length>0){
          this.boodelete=false;
        }else{
          this.boodelete=true;
        }
      },
      resetTemp(){
        this.temp = {
          macName: '',
          macType: '',
          macManufacturer: '',
          macUser: '',
          macState: 1,
        }
      },
      loadData(){
        let self = this;
        machine(self.listQuery).then(res => {
          console.log(JSON.parse(res.data))
        self.tableData.rows=JSON.parse(res.data).data.rows
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
        machineput(this.temp).then(res=>
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
      //添加
      create(formName){
        let self=this;
        this.$refs.temp.validate(valid=>{
          if (valid) {
              let self = this;
              machineadd(self.temp).then(res =>{
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
          machinedelete(ids).then(function (response) {
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
          machinedelete(index).then(function (response) {
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
