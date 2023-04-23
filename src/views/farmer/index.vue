<template>
  <div class="farmer-container">
    <el-row :gutter="15">
      <div>
        <el-form :inline="true">
          <el-form-item style="float: right" label="查询信息:">
            <el-input
              v-model="search"
              placeholder="查询所需要的内容..."
            ></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit-outline"
              @click="dialogAdd.show = true"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="table">
        <el-table :data="tables" border style="width: 100%" stripe>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60"
            :index="indexMethod"
            fixed="left"
          ></el-table-column>
          <el-table-column
            label="猪只编号"
            align="center"
            width="60"
            fixed="left"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.pigId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="养殖场编号" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.farmId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="养殖场地址" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.farmPosit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="养殖场负责人" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.farmOwner }}</span>
            </template>
          </el-table-column>
          <el-table-column label="环境卫生状况" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.ehygiene }}</span>
            </template>
          </el-table-column>
          <el-table-column label="猪只种类" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.pigType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="猪只性别" align="center" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.pigGender }}</span>
            </template>
          </el-table-column>
          <el-table-column label="入栏时间" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.cultTime | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column label="喂食饲料种类" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.feedType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="疫苗接种种类" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.vaccineType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="疫苗接种时间" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.vaccineTime | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作员编号" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.operatorId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据摘要" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.hash }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="审核状态"
            align="center"
            fixed="right"
            width="110"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                :loading="true"
                v-if="scope.row.state == 0"
                >审核中</el-button
              >
              <el-button
                type="success"
                size="mini"
                v-else-if="scope.row.state == 1"
                >审核通过</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <!-- <el-col>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </el-col> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <EditFarm :dialogEdit="dialogEdit" :form="form" @updateEdit="getFarmInfo" />
    <AddFarm :dialogAdd="dialogAdd" @updateAdd="getFarmInfo" />
  </div>
</template>
<script>
import EditFarm from "./change/EditFarm";
import AddFarm from "./add/AddFarm";
export default {
  components: {
    EditFarm,
    AddFarm,
  },
  data() {
    return {
      dialogEdit: {
        show: false,
      },
      dialogAdd: {
        show: false,
      },
      tableData: [],
      form: {
        pigId: undefined,
        farmId: "",
        farmPosit: undefined,
        farmOwner: undefined,
        ehygiene: undefined,
        pigType: undefined,
        pigGender: "雄",
        cultTime: null,
        feedType: undefined,
        vaccineType: undefined,
        vaccineTime: null,
        operatorId: undefined,
        hash: "",
      },
      search: "",
    };
  },
  computed: {
    tables() {
      const search = this.search;
      if (search) {
        return this.tableData.filter((data) => {
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
  mounted() {
    this.getFarmInfo();
  },
  methods: {
    getFarmInfo() {
      this.$axios
        .get("info/farm")
        .then((res) => {
          this.tableData = res.data.data.info;
        })
        .catch((err) => {});
    },
    handleEdit(index, row) {
      this.dialogEdit.show = true;
      this.form = {
        pigId: row.pigId,
        farmId: row.farmId,
        farmPosit: row.farmPosit,
        farmOwner: row.farmOwner,
        ehygiene: row.ehygiene,
        pigType: row.pigType,
        pigGender: row.pigGender,
        cultTime: row.cultTime,
        feedType: row.feedType,
        vaccineType: row.vaccineType,
        vaccineTime: row.vaccineTime,
        operatorId: row.operatorId,
        hash: row.hash,
        id: row.id,
      };
      console.log(row);
    },
    indexMethod(index) {
      return index + 1;
    },
  },
};
</script>
<style >
.farmer-container {
  margin: 40px 250px 40px 40px;
}
</style>
