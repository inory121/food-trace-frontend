<template>
  <div class="transporter-container">
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
            label="物流订单编号"
            align="center"
            width="110"
            fixed="left"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.transportId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" align="center" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.enterName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业地址" align="center" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.enterPosit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业负责人" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.enterOwner }}</span>
            </template>
          </el-table-column>
          <el-table-column label="运输车牌号" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.licenNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="运输时间" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.transTime | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column label="运输起始地" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.transOrigin }}</span>
            </template>
          </el-table-column>

          <el-table-column label="运输目的地" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.transDestin }}</span>
            </template>
          </el-table-column>
          <el-table-column label="车厢温湿度" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.carriageTeHu }}</span>
            </template>
          </el-table-column>
          <el-table-column label="司机姓名" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.driverName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作员编号" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.operatorId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据摘要" align="center" width="200">
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
    <EditTransport
      :dialogEdit="dialogEdit"
      :form="form"
      @updateEdit="getTransportInfo"
    />
    <AddTransport :dialogAdd="dialogAdd" @updateAdd="getTransportInfo" />
  </div>
</template>

<script>
import EditTransport from "./change/EditTransport";
import AddTransport from "./add/AddTransport";
export default {
  components: { EditTransport, AddTransport },

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
        transportId: undefined,
        enterName: "",
        enterPosit: "",
        enterOwner: undefined,
        licenNumber: null,
        transTime: null,
        transOrigin: "",
        transDestin: "",
        carriageTeHu: undefined,
        driverName: null,
        operatorId: undefined,
        hash: "",
      },
      search: "",
      rules: {
        transportId: [
          {
            required: true,
            message: "Enter transportId",
            trigger: "blur",
          },
        ],
        enterName: [
          {
            required: true,
            message: "Enter EnterName",
            trigger: "blur",
          },
        ],
        enterPosit: [
          {
            required: true,
            message: "Enter EnterPosit",
            trigger: "blur",
          },
        ],
        enterOwner: [
          {
            required: true,
            message: "Enter EnterOwner",
            trigger: "blur",
          },
        ],
        licenNumber: [
          {
            required: true,
            message: "Enter LicenNumber",
            trigger: "blur",
          },
        ],
        transTime: [
          {
            required: true,
            message: "Enter TransTime",
            trigger: "change",
          },
        ],
        transOrigin: [
          {
            required: true,
            message: "Enter TransOrigin",
            trigger: "blur",
          },
        ],
        transDestin: [
          {
            required: true,
            message: "Enter TransDestin",
            trigger: "blur",
          },
        ],
        carriageTeHu: [
          {
            required: true,
            message: "Enter CarriageTeHu",
            trigger: "blur",
          },
        ],
        driverName: [
          {
            required: true,
            message: "Enter DriverName",
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
    this.getTransportInfo();
  },
  methods: {
    getTransportInfo() {
      this.$axios
        .get("info/transport")
        .then((res) => {
          this.tableData = res.data.data.info;
        })
        .catch((err) => {});
    },
    handleEdit(index, row) {
      this.dialogEdit.show = true;
      this.form = {
        transportId: row.transportId,
        enterName: row.enterName,
        enterPosit: row.enterPosit,
        enterOwner: row.enterOwner,
        licenNumber: row.licenNumber,
        transTime: row.transTime,
        transOrigin: row.transOrigin,
        transDestin: row.transDestin,
        carriageTeHu: row.carriageTeHu,
        driverName: row.driverName,
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

<style scoped>
.transporter-container {
  margin: 40px 250px 40px 40px;
}
</style>