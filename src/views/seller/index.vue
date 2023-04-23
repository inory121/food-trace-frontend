<template>
  <div class="seller-container">
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
            label="销售信息编号"
            align="center"
            width="110"
            fixed="left"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.salesInfoId }}</span>
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
          <el-table-column label="入库时间" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.storageTime | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column label="库内温湿度" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.storageTeHu }}</span>
            </template>
          </el-table-column>
          <el-table-column label="销售地点" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.salesSite }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上架时间" align="center" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.shelfTime | moment }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作员编号" align="center" width="160">
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
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <EditSale :dialogEdit="dialogEdit" :form="form" @updateEdit="getSaleInfo" />
    <AddSale :dialogAdd="dialogAdd" @updateAdd="getSaleInfo" />
  </div>
</template>

<script>
import EditSale from "./change/EditSale";
import AddSale from "./add/AddSale";
export default {
  components: { EditSale, AddSale },

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
        salesInfoId: undefined,
        enterName: "",
        enterPosit: "",
        storageTime: null,
        storageTeHu: null,
        salesSite: null,
        shelfTime: null,
        operatorId: undefined,
        hash: "",
      },
      search: "",
      rules: {
        salesInfoId: [
          {
            required: true,
            message: "Enter salesInfoId",
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
        storageTime: [
          {
            required: true,
            message: "Enter StorageTime",
            trigger: "change",
          },
        ],
        storageTeHu: [
          {
            required: true,
            message: "Enter StorageTeHu",
            trigger: "blur",
          },
        ],
        salesSite: [
          {
            required: true,
            message: "Enter SalesSite",
            trigger: "blur",
          },
        ],
        shelfTime: [
          {
            required: true,
            message: "Enter ShelfTime",
            trigger: "change",
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
    this.getSaleInfo();
  },
  methods: {
    getSaleInfo() {
      // this.$axios
      //   .all([this.$axios.get("info/sale"), this.$axios.get("check/checkInfo")])
      //   .then(
      //     this.$axios.spread((res1, res2) => {
      //       console.log(res1.data, 111);
      //       console.log(res2.data, 222);
      //       this.tableData = res1.data.data.info;
      //       this.tableData.forEach((item) => {
      //         res2.data.data.list.forEach((item2) => {
      //           if (item.salesInfoId == item2.id) {
      //             item.state = item2.state;
      //           }
      //         });
      //       });
      //     })
      //   )
      //   .catch((err) => {});
      this.$axios
        .get("info/sale")
        .then((res) => {
          this.tableData = res.data.data.info;
        })
        .catch((err) => {});
    },
    handleEdit(index, row) {
      console.log(row.state);
      this.dialogEdit.show = true;
      this.form = {
        salesInfoId: row.salesInfoId,
        enterName: row.enterName,
        enterPosit: row.enterPosit,
        storageTime: row.storageTime,
        storageTeHu: row.storageTeHu,
        salesSite: row.salesSite,
        shelfTime: row.shelfTime,
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
.seller-container {
  margin: 40px 250px 40px 40px;
}
</style>