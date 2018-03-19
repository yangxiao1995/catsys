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
            <div></div>+ 添加登记<div></div>
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
      <!--<el-table-column-->
        <!--prop="state"-->
        <!--align="center"-->
        <!--label="状态"-->
        <!--show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.state | stateFilter}}-->
        <!--</template>-->
      <!--</el-table-column>-->
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
      <!--<el-table-column-->
        <!--prop="updatorId"-->
        <!--align="center"-->
        <!--label="更新人"-->
        <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="creatorId"-->
        <!--align="center"-->
        <!--label="创建人"-->
        <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="createTime"-->
        <!--align="center"-->
        <!--label="创建时间"-->
        <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="updateTime"-->
        <!--align="center"-->
        <!--label="更新时间"-->
        <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            class="el-button-edit"
            size="small"
            type="danger"
            title="详情页"
            @click="handleUpdate(scope.row)">
            <i class="el-icon-info"></i>
          </el-button>
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
        <el-form-item label="代码" prop="code">
          <el-input style="margin-top:8px;" v-model="temp.code"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerId">
          <el-select v-model="temp.customerId" placeholder="请选择">
            <el-option
              v-for="item in customer"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
  import {preras,prerasdelete,prerasadd,customer,prerasone,prerasput} from "../api/getlist"
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
        customer:[],
        equipment:[],
        timeout:  null,
        boodelete:true,
        boolAdd:false,
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
        uid: '',
        dialogStatus: '',
        dialogFormVisible: false,
        temp: {
          name: '',
          code:"",
          startTime : '',
          endTime:"",
          customerId:''
          /*state: -1,*/
        },
        rules: {
          name: [
            {required: true, message: '请输入预收寄名称', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入预收寄代码', trigger: 'blur'},
          ],
          macWorkTime: [
            {required: true, message: '请输入入网时间', trigger: 'blur'},
          ],
          customerId:[
            {required: true, message: '请选择客户名称', trigger: 'change'},
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
          '0': '删除',
          "-1":"异常",
          "2":"维护"
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
      handleUpdate(row){
        this.$router.push({path: '/advancedetail', query: {id: row.id}})
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
      handleEdit(row){
        let self=this;
        prerasone(row.id).then(res => {
          console.log(JSON.parse(res.data).data)
        this.temp={
          id:row.id,
          name: JSON.parse(res.data).data.name,
          code: JSON.parse(res.data).data.code,
          startTime: JSON.parse(res.data).data.startTime,
          endTime: JSON.parse(res.data).data.endTime,
          customerId: row.id,
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
          endTime:util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          customerId:''
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
        self.customer=[]
        customer(self.listQuery).then(res => {
        let cust='';
        for(let l=0;l<JSON.parse(res.data).data.rows.length;l++){
          cust={label:JSON.parse(res.data).data.rows[l].custName,value:JSON.parse(res.data).data.rows[l].id}
          self.customer.push(cust)
        }
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
              let self = this;
            prerasput(this.temp).then(res=>
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
      //添加
      create(formName){
        console.log(this.temp)
        let self=this;
        this.$refs.temp.validate(valid=>{
          if (valid) {
            prerasadd(self.temp).then(res =>{
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
