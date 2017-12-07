<template>
  <div>
    <div class="contain-title">
      <h1> >报表管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-button">
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
        prop="t_operator"
        label="收件员工号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="t_post_user"
        label="收件人姓名"
        align="center">
      </el-table-column>

      <el-table-column
        prop="t_collect_number"
        label="收件数量"
        align="center">
      </el-table-column>

      <el-table-column
        prop="t_return_number"
        label="退件数量"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
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
        prop="func"
        align="center"
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
          class="el-button-edit"
          size="small"
          type="danger"
          @click="handleUpdate(scope.row)"><img src="../../static/img/table/edit.png" alt="">&nbsp;修改
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
  import {getreportpageinfo,deleteonereport,reportalldelete} from '../api/getlist'
  export default {
    data() {
      return {
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
        sels:[],
        multipleSelection: [],
        listLoading: false
      }

    },
    filters: {
      stateFilter(status) {
        const statusMap = {
          '1': '正常',
          '0': '不',
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
      selsChange(sels){
        this.sels = sels;
      },
      loadData(){
        let self = this;
        getreportpageinfo().then(res => {
         console.log(JSON.parse(res.data).data.rows)
         self.tableData.rows=JSON.parse(res.data).data.rows
        self.total = JSON.parse(res.data).data.total;
      })
      },
      handleDelete(index){
        var self = this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          deleteonereport(index).then(function (response) {
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
          reportalldelete(ids).then(function (response) {
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
