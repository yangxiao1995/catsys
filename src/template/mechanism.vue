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
        prop="t_org_name"
        label="机构名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="t_org_number"
        label="机构编号"
        align="center">
      </el-table-column>

     <!-- <el-table-column
        prop="user_name"
        label="机构负责收件员"
        align="center">
      </el-table-column>-->

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
            icon="delete"
            type="danger"
            @click="handleDelete(scope.row.t_id)">&nbsp;删除
            <!--<img src="../../static/img/table/delete.png" alt="">-->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="135px"
               style='width: 600px; margin-left:50px;'>
        <input type="hidden" v-model="uid">
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="temp.orgName"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <input type="radio" v-model="temp.state" value="0" name="state">停用
          <input type="radio" v-model="temp.state" value="1" name="state">正常
        </el-form-item>
        <el-form-item label="机构编号" prop="orgNumber">
          <el-input v-model="temp.orgNumber"></el-input>
        </el-form-item>
        <el-form-item class="codenumber" label="所属地区">
          <select name="sectionNames" class="form-control" v-model="temp.province" @change="getcity"
                  id="province">
            <option value="00">请选择省</option>
            <option v-for="(item,index) in province" :value="item.distCd">{{item.provName}}</option>
          </select>
         <select name="sectionNames" class="form-control" v-model="temp.city" @change="getarea"
                  id="city">
           <option value="00">请选择市</option>
            <option v-for="(item,index) in city" :value="item.distCd">{{item.cityName}}</option>
          </select>
           <select name="sectionNames" class="form-control" v-model="temp.area"
                  id="area">
             <option value="00">请选择区县</option>
            <option v-for="(item,index) in area" :value="item.distCd">{{item.ctyName}}</option>
          </select>
        </el-form-item>


        <!--<el-form-item label="机构负责收件员" prop="operator">
          <select name="sectionNames" class="form-control" v-model="temp.operator"
                  id="sectionNames">
            <option v-for="(item,index) in getuserlist" :value="item.id">{{item.userName}}</option>
          </select>
        </el-form-item>-->

        <el-form-item label="组织机构详细地址" prop="orgAddr">
          <el-input v-model="temp.orgAddr"></el-input>
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
  import {getorgpageinfo,organizationadd,organization,organizationalldelete,organizationput,getuserlist,getaddrlist} from "../api/getlist"
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
        province:[],
        city:[],
        area:[],
        arealist:{

        },
        listQuery: {
          pageNumber:1,
        },
        getuserlist:[],
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
        operatorid:"",
        temp: {
          orgNumber: '',
          orgName: '',
          deptName:'',
          /*operator: 0,*/
          orgAddr:'',
          /*orgNumber: '',*/
          state: -1,
          province:"00",
          city:"00",
          area:"00"
        },
        rules: {
          orgAddr: [
            {required: true, message: '组织机构详细地址', trigger: 'blur'},
          ],
          orgName: [
            {required: true, message: '请输入机构名称', trigger: 'blur'},
          ],

         /* operator: [
            {required: true, message: '请输入机构负责收件员', trigger: 'blur'},
            { validator: checkoper, trigger: 'blur' }
          ],*/
          orgNumber: [
            {required: true, message: '请输入机构编号', trigger: 'blur'},
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
      },
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
        if(this.sels.length>0){
          this.boodelete=false;
        }else{
          this.boodelete=true;
        }
      },
      getcity(){
        this.temp.city="00";
        this.temp.area="00";
        this.area=[]
        let par={
          province:this.temp.province.substring(0,2)
        }
        getaddrlist(par).then(res => {
          console.log(JSON.parse(res.data))
        this.city=JSON.parse(res.data).data
      })
      },
      getarea(){
        this.temp.area="00"
        let par={
          province:this.temp.province.substring(0,2),
          city:this.temp.city.substring(2,4)
        }
        let self=this;
        getaddrlist(par).then(res => {
        self.area=JSON.parse(res.data).data
      })
      },
      loadData(){
        let self = this;
        getorgpageinfo(self.listQuery).then(res => {
          console.log(JSON.parse(res.data))
        self.tableData.rows=JSON.parse(res.data).data.rows
        self.total = JSON.parse(res.data).data.total;
      })
      /*  getuserlist().then(res => {
          self.getuserlist=JSON.parse(res.data).data
       /!* self.operatorid=JSON.parse(res.data).data[0].id*!/
      })*/
        getaddrlist().then(res => {
          self.province=JSON.parse(res.data).data
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
        let self=this;
        organization(par).then(res =>{
          console.log(JSON.parse(res.data).data)
            self.temp=JSON.parse(res.data).data
            self.temp.province=JSON.parse(res.data).data.orgProv.substring(0,2)+"0000",
            self.getcity();
            self.temp.city=JSON.parse(res.data).data.orgProv.substring(0,2)+JSON.parse(res.data).data.orgProv.substring(2,4)+"00",
              self.getarea();
            self.temp.area=JSON.parse(res.data).data.orgProv
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        })

      },
      //添加
      create(formName){
        this.$refs.temp.validate(valid=>{
          if (valid) {
              let self = this;
            let province=self.temp.province==="00"?"00":self.temp.province.substring(0,2)
             let  city= self.temp.city==="00"?"00":self.temp.city.substring(2,4)
              let area=self.temp.area==="00"?"00":self.temp.area.substring(4,6)
            let par={
                orgNumber: self.temp.orgNumber,
                orgName: self.temp.orgName,
                deptName:self.temp.deptName,
                /*operator: self.temp.operator,*/
                orgAddr:self.temp.orgAddr,
                state: self.temp.state,
              orgProv:province+city+area
            }

              organizationadd(par).then(res =>{
                if(JSON.parse(res.data).code==1){
                self.$confirm('添加成功, 是否返回列表?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success'
                }).then(()=> {
                  this.dialogFormVisible = false;
                self.city=[],
                self.area=[],
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

        var ids = this.sels.map(item =>item.t_id).toString();
        var sub = ids.split(",");
        ids = "";
        for (var i = 0; i < sub.length;i++){
          if (sub[i] != ""){
            ids += sub[i] + ",";
          }
        }
        ids = ids.substring(0,ids.length-1);

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
          organizationalldelete(index).then(function (response) {
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
          orgNumber: '',
          orgName: '',
          orgAddr:'',
          /*operator:this.operatorid,*/
          /*orgNumber: '',*/
          state: 1,
          province:"00",
          city:"00",
          area:"00"
        }
      },
      cancel(formName){
          this.city=[],
          this.area=[],
        this.$refs.temp.resetFields();
        this.dialogFormVisible=false;
      },
      update(){
        let self = this;
        let province=self.temp.province==="00"?"00":self.temp.province.substring(0,2)
        let  city= self.temp.city==="00"?"00":self.temp.city.substring(2,4)
        let area=self.temp.area==="00"?"00":self.temp.area.substring(4,6)
        let par={
          id:self.uid,
          orgNumber: self.temp.orgNumber,
          orgName: self.temp.orgName,
          deptName:self.temp.deptName,
          /*operator: self.temp.operator,*/
          orgAddr:self.temp.orgAddr,
          state: self.temp.state,
          orgProv:province+city+area
        }
        organizationput(par).then(res=>
        {
          if(JSON.parse(res.data).code==1){
          self.$confirm('修改成功, 是否返回列表?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() =>{
            self.city=[],
            self.area=[],
            this.dialogFormVisible = false;
          self.loadData();
        })
        }else{
          self.$message.error(JSON.parse(res.data).msg)
        }


      })

      },
    }
  }
</script>
