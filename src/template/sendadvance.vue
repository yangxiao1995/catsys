<template>
  <div>
    <div class="contain-title">
      <h1> >预收寄登记 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
          <p>名称</p><input v-model="listQuery.name" class="equiinput" type="text">
          <p class="text-data">代码</p><input v-model="listQuery.code" class="equiinput" type="text">
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search" @click="loadData">
            <div></div>查询<div></div>
          </button>
          <button type="button" class="btn btn-primary text-add"  @click="handleCreate">
            <div></div>+ 添加客户<div></div>
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
        prop="name"
        label="预收寄名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="code"
        label="预收寄代码"
        align="center">
      </el-table-column>
      <el-table-column
        prop="state"
        align="center"
        label="状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.state | stateFilter}}
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        align="center"
        label="开始收件时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="endTime"
        align="center"
        label="结束收件时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="updatorId"
        align="center"
        label="更新人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="creatorId"
        align="center"
        label="创建人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        align="center"
        label="更新时间"
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

      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="105px"
               style='width: 400px; margin-left:50px;'>
        <input type="hidden" v-model="uid">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item  label="收寄起始时间" prop="">
            <el-date-picker
              v-model="temp.startTime"
              type="date"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item  label="收寄结束时间" prop="">
                    <el-date-picker
                      v-model="temp.endTime"
                      type="date"
                      format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

        <!--<el-form-item label="状态">
          <input type="radio" v-model="temp.state" value="2" name="state">停用
          <input type="radio" v-model="temp.state" value="1" name="state">正常
        </el-form-item>-->

        <el-form-item label="代码" prop="code">
          <el-input style="margin-top:8px;" v-model="temp.code"></el-input>
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
  import {preras,prerasdelete,prerasadd} from "../api/getlist"
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
        manufacturer:[],
        userName:[],
        edit:false,
        equipment:[],
        timeout:  null,
        boodelete:true,
        boolAdd:false,
        excelList:null,
        isEdit:true,
        currentPage1:1,
        listQuery: {
          code:'',
          name:"",
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
        macUser:"",
        uid: '',
        dialogStatus: '',
        dialogFormVisible: false,
        temp: {
          name: '',
          code:"",
          startTime : '',
          endTime:""
          /*state: -1,*/
        },
        rules: {
          macName: [
            {required: true, message: '请输入设备名称', trigger: 'blur'},
          ],
          macManufacturer: [
            {required: true, message: '请输入厂商', trigger: 'blur'},
          ],

          macUser: [
            {required: true, message: '请输入设备管理人', trigger: 'change'},
          ],
          macWorkTime: [
            {required: true, message: '请输入入网时间', trigger: 'blur'},
          ],
          operators:[
            {required: true, message: '请选择设备操作员', trigger: 'change'},
          ]
        },
        multipleSelection: [],
        listLoading: false
      }

    },
    filters: {
      stateFilter(status) {
        const statusMap = {
          '1': '正常',
          '0': '停用',
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
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },

      handleSelect(item) {
        console.log(item)
        /*this.macUser=item.value*/
        this.temp.macUser=item.id
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
        let self=this
      },
    /*  getData(){
        if (this.temp.startTime != '') {
          this.temp.startTime = util.formatDate.format(new Date(this.temp.startTime), 'yyyy-MM-dd');
          this.temp.endTime = util.formatDate.format(new Date(this.temp.startTime), 'yyyy-MM-dd');
        }
      },*/
      handleEdit(row){
        let self=this;
        self.equipment=[]
        machinegetid(row.id).then(res => {
          console.log(JSON.parse(res.data).data)
        this.macUser=JSON.parse(res.data).data.userName
        this.temp={
          id:row.id,
          macName: JSON.parse(res.data).data.macName,
          macType: JSON.parse(res.data).data.macType,
          /*macSeries:JSON.parse(res.data).data.macSeries,*/
          macManufacturer: JSON.parse(res.data).data.macManufacturer,
          macUser: JSON.parse(res.data).data.macUser,
          macWorkTime: JSON.parse(res.data).data.macWorkTime,
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
      resetTemp(){
        this.temp = {
          name: '',
          code: '',
          startTime:util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          endTime:util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        }
      },
      loadData(){
        let self = this;
        preras(self.listQuery).then(res => {
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

        this.$refs.temp.validate(valid=>{
          if (valid) {
            if(self.macUser=="" || self.macUser==null){
              this.$message.error("请填写设备管理人")
            }else{
              let self = this;
              machineput(this.temp).then(res=>
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
        }
      )

      },
      //添加
      create(formName){
        console.log(this.temp)
        console.log(JSON.stringify(this.temp))
        let par=JSON.stringify(this.temp)
        let self=this;
        this.$refs.temp.validate(valid=>{
          if (valid) {
            let self = this;
            prerasadd(par).then(res =>{
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
          prerasdelete(ids).then(function (response) {
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
          prerasdelete(index).then(function (response) {
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
