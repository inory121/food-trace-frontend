<template>
  <div class="butcher-container">
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
          <el-table-column label="健康状况" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.healthStatu }}</span>
            </template>
          </el-table-column>
          <el-table-column label="检疫日期" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.quaranDate | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column label="猪肉批次" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.porkBatches }}</span>
            </template>
          </el-table-column>
          <el-table-column label="屠宰日期" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.slaDate | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column label="排酸时间" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.acidTime | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column label="环境温湿度" align="center" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.ambientTeHu }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包装编号" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.packId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包装材料" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.packMaterial }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包装时间" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.packTime | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column label="猪肉部位" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.meatPart }}</span>
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
    <EditButcher
      :dialogEdit="dialogEdit"
      :form="form"
      @updateEdit="getButcherInfo"
    />
    <AddButcher :dialogAdd="dialogAdd" @updateAdd="getButcherInfo" />
  </div>
</template>

<script>
import EditButcher from "./change/EditButcher";
import AddButcher from "./add/AddButcher";
export default {
  components: {
    EditButcher,
    AddButcher,
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
        healthStatu: "",
        quaranDate: "",
        porkBatches: undefined,
        slaDate: null,
        acidTime: null,
        ambientTeHu: "",
        packId: null,
        packMaterial: undefined,
        packTime: null,
        meatPart: null,
        operatorId: undefined,
        hash: "",
      },
      search: "",
      rules: {
        pigId: [
          {
            required: true,
            message: "Enter pigId",
            trigger: "blur",
          },
        ],
        healthStatu: [
          {
            required: true,
            message: "Enter HealthStatu",
            trigger: "blur",
          },
        ],
        quaranDate: [
          {
            required: true,
            message: "Enter QuaranDate",
            trigger: "change",
          },
        ],
        porkBatches: [
          {
            required: true,
            message: "Enter PorkBatches",
            trigger: "blur",
          },
        ],
        slaDate: [
          {
            required: true,
            message: "Enter SlaDate",
            trigger: "change",
          },
        ],
        acidTime: [
          {
            required: true,
            message: "Enter AcidTime",
            trigger: "change",
          },
        ],
        ambientTeHu: [
          {
            required: true,
            message: "Enter AmbientTeHu",
            trigger: "blur",
          },
        ],
        packId: [
          {
            required: true,
            message: "Enter packId",
            trigger: "blur",
          },
        ],
        packMaterial: [
          {
            required: true,
            message: "Enter PackMaterial",
            trigger: "blur",
          },
        ],
        packTime: [
          {
            required: true,
            message: "Enter PackTime",
            trigger: "change",
          },
        ],
        meatPart: [
          {
            required: true,
            message: "Enter MeatPart",
            trigger: "blur",
          },
        ],
        operatorId: [
          {
            required: true,
            message: "Enter operatorId",
            trigger: "blur",
          },
        ],
        hash: [
          {
            required: true,
            message: "Enter Hash",
            trigger: "blur",
          },
        ],
      },
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
    this.getButcherInfo();
  },
  methods: {
    // getButcherInfo() {
    //   this.$axios.get("info/butcher").then((res) => {
    //     console.log(res);
    //     if (res.data.code == 20000) {
    //       this.tableData = res.data.data.info;
    //       this.$message({ type: "success", message: "查询成功" });
    //     } else {
    //       this.$message({ type: "error", message: "查询失败" });
    //     }
    //   });
    // },
    getButcherInfo() {
      this.$axios
        .get("info/butcher")
        .then((res) => {
          this.tableData = res.data.data.info;
        })
        .catch((err) => {});
    },
    handleEdit(index, row) {
      this.dialogEdit.show = true;
      this.form = {
        pigId: row.pigId,
        healthStatu: row.healthStatu,
        quaranDate: row.quaranDate,
        porkBatches: row.porkBatches,
        slaDate: row.slaDate,
        acidTime: row.acidTime,
        ambientTeHu: row.ambientTeHu,
        packId: row.packId,
        packMaterial: row.packMaterial,
        packTime: row.packTime,
        meatPart: row.meatPart,
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

<style lang="scss" scoped>
.butcher-container {
  margin: 40px 250px 40px 40px;
}
</style>