<template>
  <div>
    <div class="contain-title">
      <h1> >邮件管理 </h1>
      <div class="title-line"></div>
      <div class="title-text">
        <div class="title-text-left">
          <p>邮件条码</p><div class="mailinput"></div>
        </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search">
             <div></div>查询<div></div>
          </button>
          <button type="button" class="btn btn-primary text-add">
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
        prop="name"
        label="邮件条码"
        align="center">
      </el-table-column>
      <el-table-column
        prop="zhongliang"
        label="重量"
        align="center">
      </el-table-column>

      <el-table-column
        prop="section"
        label="收件员工号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="time"
        label="收件时间"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="zhuangt"
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
  export default {
    data() {
      return {
        excelList:null,
        isEdit:true,
        currentPage1:1,
        listQuery: {
          sectionNo: '',//标段

          homeNo: '',//档案号
          houseType: '',
          sectionName: '',
          homeStructure: '',
          reviewStatus: '',//复核状态
          fullName: '',//被征收人
          buildingNo: '',//楼号
          homeAddress: '',//房屋地址
          isProblem: '',//是否问题
          pageNumber:1,
        },
        total:100,
        pageSize: 10,
        //下拉框中的数据
        section: [],
        building: [],
        tableData: {
          rows: [{name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1},
            {name:1,zhongliang:1,section:1,time:"2017-1-1",zhuangt:"yes",func:1}]
        },
        multipleSelection: [],
        listLoading: false
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

    },
    computed:{
      getPageSize(){
        return 5;
        /* if(Math.ceil( this.total/this.pageSize)==0){
         return 1;
         }else{
         return Math.ceil( this.total/this.pageSize)
         }*/
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
    }
  }
</script>
