<template>
  <div>
    <div class="contain-title">
      <h1> >用户生产管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
          <p>用户名</p><input v-model="listQuery.userName" class="equiinput" type="text">
          <p class="text-data">员工号</p><input v-model="listQuery.userCode" class="equidata" type="text">
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search" @click="loadData">
            <div></div>查询<div></div>
          </button>
        <!--  <button type="button" class="btn btn-primary text-delete" @click="alldelete" :disabled="boodelete">
            <div></div>批量删除<div></div>
          </button>
          <button type="button" class="btn btn-primary text-return" @click="returnmail" :disabled="boodelete">
            <div></div>- 批量退件<div></div>
          </button>-->
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
        prop="userName"
        label="用户名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userCode"
        label="员工号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="statistics.normal"
        label="正常邮件"
        align="center">
      </el-table-column>

      <el-table-column
        prop="statistics.unnormal"
        label="非正常邮件"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="statistics.total"
        align="center"
        label="总数"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="statistics.weight"
        align="center"
        label="总金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="statistics.money"
        align="center"
        label="总重量"
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
            title="详情页"
            @click="handleUpdate(scope.row)">
            <i class="el-icon-info"></i>
          </el-button>
          <el-button
            class="el-button-delete"
            size="small"
            type="danger"
            icon="delete"
            title="删除"
            @click="handleDelete(scope.row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
<script>
  import {prouser} from "../api/getlist"
  export default {
    data() {
      return {
        boodelete:true,
        boolAdd:false,
        currentPage1:1,
        listQuery: {
          userName:'',
          userCode:'',
          pageNumber:1,
        },
        total:100,
        pageSize: 10,
        tableData: {
          rows: []
        },
        listLoading: false,
        textMap: {
          update: '修改',
          create: '新增'
        },
        uid: '',
        sels:[],
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
      handleUpdate(row){
        this.$router.push({path: '/mailmanagement', query: {id: row.id}})
      },
      handleCurrentChange(val) {
        this.listQuery.pageNumber= val;
        this.loadData();
      },
      loadData(){
        let self = this;
        prouser().then(res => {
          console.log(JSON.parse(res.data).data)
        self.tableData.rows=JSON.parse(res.data).data.rows
        self.total = JSON.parse(res.data).data.total;
      })
      },
     /* alldelete(){
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
      },*/
      selsChange(sels){
        this.sels = sels;
        if(this.sels.length>0){
          this.boodelete=false;
        }else{
          this.boodelete=true;
        }
      },
    /*  returnmail(){
        var ids = this.sels.map(item =>item.id).toString();

        var sub = ids.split(",");
        ids = "";
        for (var i = 0; i < sub.length;i++){
          if (sub[i] != ""){
            ids += sub[i] + ",";
          }
        }
        let self=this;
        ids = ids.substring(0,ids.length-1);
        console.log(ids)
        postssendback(ids).then(function (response) {
          let rmsg=JSON.parse(response.data);
          if(rmsg.code == 1){
            self.loadData();
          }else{
            self.$message.error(rmsg.msg)
          }
        })
      },*/
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
    }
  }
</script>
