<template>
  <div class="supervision-container">
    <el-row :gutter="15">
      <div>
        <el-form :inline="true">
          <el-form-item style="float: right" label="查询信息:">
            <el-input
              v-model="search"
              placeholder="查询所需要的内容..."
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="table">
        <el-table
          :data="tables"
          border
          style="width: 100%"
          max-height="800"
          stripe
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60"
            :index="indexMethod"
            fixed="left"
          ></el-table-column>
          <el-table-column label="编号" align="center" width="170">
            <template slot-scope="scope">
              <span>{{ scope.row.checkID }}</span>
            </template>
          </el-table-column>
          <el-table-column label="修改信息" align="center" width="1200">
            <template slot-scope="scope">
              <span>{{ scope.row.info }}</span>
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
              <el-button type="success" size="mini" v-else>审核通过</el-button>
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
                @click="confirmCheck(scope.row)"
                >审核</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      search: "",
      tableData: [],
      isVisabled: true,
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
  watch: {},
  created() {},
  mounted() {
    this.getCheckInfo();
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    getCheckInfo() {
      this.$axios.get("check/checkInfo").then((res) => {
        console.log(res);
        if (res.data.code == 20000) {
          this.tableData = res.data.data.list;
          this.$message({ type: "success", message: "查询成功" });
        } else {
          this.$message({ type: "error", message: "查询失败" });
        }
      });
    },
    confirmCheck(row) {
      console.log(row.id);
      console.log(JSON.parse(row.info), 222);

      this.$confirm("确认审核通过吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("check/confirmInfo", {
              params: {
                id: row.checkID,
              },
            })
            .then((res) => {
              console.log(res.data);
              this.getCheckInfo();
            })
            .catch((err) => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "审核通过!",
          });
          if (row.info.indexOf("farmId") != -1) {
            this.$axios.put("info/farm", JSON.parse(row.info)).then((res) => {
              console.log(res.data);
            });
          } else if (row.info.indexOf("packId") != -1) {
            this.$axios
              .put("info/butcher", JSON.parse(row.info))
              .then((res) => {
                console.log(res.data);
              });
          } else if (row.info.indexOf("transportId") != -1) {
            this.$axios
              .put("info/transport", JSON.parse(row.info))
              .then((res) => {
                console.log(res.data);
              });
          } else if (row.info.indexOf("salesInfoId") != -1) {
            this.$axios.put("info/sale", JSON.parse(row.info)).then((res) => {
              console.log(res.data);
            });
          }
          // this.$axios.put("info/sale", JSON.parse(row.info)).then((res) => {
          //   console.log(res.data, "更新");
          // });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消审核",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.supervision-container {
  margin: 40px 250px 40px 40px;
}
</style>