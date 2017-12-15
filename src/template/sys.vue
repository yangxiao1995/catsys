<template>
  <div>
    <div class="contain-title">
      <h1> >系统管理</h1>
      <div class="title-line"></div>
    <div class="title-text">
      <div class="title-text-left">
        <p>角色名称：</p><input class="user-input" type="text" name="fullName" v-model="listQuery.name" value="">
      </div>
        <div class="title-text-button">
          <button type="button" class="btn btn-primary text-search" @click="loadData">
            <div></div>查询<div></div>
          </button>
          <button type="button" class="btn btn-primary text-add" @click="handleCreate">
            <div></div>+ 添加<div></div>
          </button>
        </div>
    </div>
        <el-table
          :data="tableData.rows"
          border
          tooltip-effect="dark"
          v-loading.body="listLoading"
          element-loading.text="拼命加载中..."
        >
          <el-table-column
            align="center"
            type="selection">
          </el-table-column>
          <el-table-column label="序号" align="center" width="100">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="roleName"
            label="角色"
            align="center"
          ></el-table-column>
          <el-table-column
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              {{scope.row.hasvalid |stateFilter}}
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="500">
            <template slot-scope="scope">
              <el-button
                class="el-button-edit"
                size="small"
                type="danger"
                @click="handleEdit(scope.row)"><img src="../../static/img/table/edit.png" alt="">&nbsp;修改
              </el-button>
              <el-button
                class="el-button-rote"
                size="small"
                type="danger"
                @click="handleRoleConfig(scope.$index, scope.row)">配置权限
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

        <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="80px"
                 style='width: 400px; margin-left:50px;'>
          <input type="hidden" v-model="uid">

          <el-form-item  label="角色名称" prop="roleName">
            <el-input v-model="temp.roleName"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <input type="radio" v-model="temp.hasvalid" value="0">停用</input>&nbsp;&nbsp;&nbsp;
            <input type="radio" v-model="temp.hasvalid" value="1">正常</input>
          </el-form-item>

          <el-button v-if="dialogStatus=='create'" :disabled="boolSave" type="primary" @click="create(temp)">确 定</el-button>
          <el-button v-else type="primary" :disabled="boolSave" @click="update">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </el-form>
      </el-dialog>
      <el-dialog title="配置用户权限" v-model="dialogVisible" size="tiny">
        <div class="select-tree">
          <div class='is-empty'>
            <el-tree
              ref="roleTree"
              :data="roleTree"
              :default-checked-keys="roleDefalChecked"
              show-checkbox
              default-expand-all
              node-key="id" v-loading="dialogLoading"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="configUserRoles">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
      </el-dialog>

    </div>

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
  .title-text-left p{
    margin-left: 15px;
  }
  .user-input{
    height:50px;
    width: 160px;;
    margin-left: 5px;
  }
</style>
<script>
  import {role,roledelete,roleadd,rolepost,authority,authorityput,authorityid} from "../api/getlist"
  export default {
    data () {
      var checkrole = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入角色名称'));
        }
        setTimeout(() => {
          if ((/[\u4e00-\u9fa5]+/).test(value)) {
          callback(new Error('只能输入英文字母、数字和字符'));
        } else {
          callback();
        }
      }, 1000);
      };
      return {
        boolSave:false,
        rules:{
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
            /*{ validator: checkrole, trigger: 'blur' }*/
          ],
        },
        currentRow: {},
        listLoading:'',
        dialogVisible: false,
        dialogLoading: false,
        roleTree: [],
        roleDefalChecked:[],
        currentPage1:1,
        defaultProps: {
          children: 'id',
          label: 'name',
          id: "id",
        },
        roleList: [],
        listQuery: {
          name: '',
          pageNumber: 1,
        },
        pageSize: 1,
        total: 0,
        uid: '',
        searchKey: '',
        tableData: {
          rows: [],
        },
        textMap: {
          update: '修改',
          create: '新增'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        temp: {
          roleName: '',
          id:'',
          authIds:'',
          hasvalid: 1,

        },
      }

    },
    computed: {
      getPageSize(){
        if(Math.ceil( this.total/this.pageSize)==0){
          return 1;
        }else{
          return Math.ceil( this.total/this.pageSize)
        }
      }
    },
    filters: {

      stateFilter(status){
        const statusMap = {
          '1': '正常',
          '0': '停用'
        };
        return statusMap[status];
      }
    },

    created(){
      this.loadData();
      this.getRoleList();
    },
    methods: {
      handleSizeChange(){

      },
      handleRoleConfig(index, row){
        this.currentRow = row;
        this.dialogVisible = true;
        let self=this;
        authorityid(row.id).then(res => {
          let array=[];
          let datalength=JSON.parse(res.data).data;
          for(var i=0;i<datalength.length;i++){
            array.push(datalength[i].authId.toString());
          }
        self.roleDefalChecked=array

        console.log(self.roleDefalChecked)
      })
      },
      handleCurrentChange(val){
        this.listQuery.pageNumber = val;
        this.loadData();
      },
      loadData(){
        let self=this;
        role(self.listQuery).then(res => {
         console.log(JSON.parse(res.data))
        self.tableData.rows=JSON.parse(res.data).data.rows
        self.total=JSON.parse(res.data).data.total
        self.pageSize=JSON.parse(res.data).data.pageSize
        });
      },
      handleEdit(row){
        this.uid = row.id;
        this.temp = {
          id:row.id,
          roleName: row.roleName,
          hasvalid: row.hasvalid
        }
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;

      },
      handleDelete(val){
        let self=this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          roledelete(val).then(function (res) {
          if(JSON.parse(res.data).code!='1'){
            self.$message.error(JSON.parse(res.data).msg)
            return false;
          }
          self.loadData();
        });
      }).catch(() => {
        });

      },
      configUserRoles(){
        let checkedKeys = this.$refs.roleTree.getCheckedKeys();
        let par={
          roleId:this.currentRow.id,
          ids:checkedKeys.join(','),
        }
        console.log(par)
        authorityput(par).then(res => {
          if(JSON.parse(res.data).code=='1'){
          this.$confirm('修改成功, 是否返回列表?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.dialogVisible = false;
          this.loadData();
        })
        }else{
          alert("请选择正确的权限")
        }
      })

      },
      close(){
        this.dialogFormVisible = false
        this.boolSave=false;
        this.$refs['temp'].resetFields();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      resetTemp(){
        this.temp = {
          roleName: '',
          hasvalid: 1
        }
      },
      //添加
      create(formName){
        this.$refs.temp.validate(valid =>{
          if (valid) {
            this.boolSave = true;
            console.log(this.temp);
            let self = this;
            roleadd(self.temp).then(res=>{
              if(JSON.parse(res.data).code ==1){
              this.$alert('添加成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                self.boolSave=false;
              this.dialogFormVisible = false;
              self.loadData()
            }
            });
            }
          else {
              self.boolSave = false;
              this.$message.error(JSON.parse(res.data).msg)
            }
          })
          }
        })
      },
      update(){
        let self = this;
        rolepost(self.temp).then(res => {
          console.log(JSON.parse(res.data))
          if(JSON.parse(res.data).code=="1"){
            self.$confirm('修改成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.dialogFormVisible = false;
            self.loadData();
          })
        }else{
            this.$message.error(JSON.parse(res.data).msg);
            return false
          }
      })

      },
      getRoleList(){
        authority().then(res => {
          this.roleTree = JSON.parse(res.data).data;
      })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .is-empty{
    overflow: auto;
    height: 380px;;
  }
  img{
    vertical-align: sub;
  }
  input{
    height: 20px;;
  }
  select{
    height: 20px;;
  }
  .cell button{
    height: 30px;
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
