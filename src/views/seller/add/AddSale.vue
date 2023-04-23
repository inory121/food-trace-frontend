<template>
  <div class="seller-container">
    <el-dialog
      title="添加销售信息"
      :visible.sync="dialogAdd.show"
      top="5vh"
      width="40%"
    >
      <el-form
        ref="elForm"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="140px"
        label-position="left"
      >
        <el-form-item label="输入销售信息编号" prop="salesInfoId">
          <el-input
            v-model="form.salesInfoId"
            placeholder="Enter salesInfoId"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入企业名称" prop="enterName">
          <el-input
            v-model="form.enterName"
            placeholder="Enter EnterName"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入企业地址" prop="enterPosit">
          <el-input
            v-model="form.enterPosit"
            placeholder="Enter EnterPosit"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入入库时间" prop="storageTime">
          <el-date-picker
            type="datetime"
            v-model="form.storageTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter StorageTime"
            clearable
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="输入库内温湿度" prop="storageTeHu">
          <el-input
            v-model="form.storageTeHu"
            placeholder="Enter StorageTeHu"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入销售地点" prop="salesSite">
          <el-input
            v-model="form.salesSite"
            placeholder="Enter SalesSite"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入上架时间" prop="shelfTime">
          <el-date-picker
            type="datetime"
            v-model="form.shelfTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter ShelfTime"
            clearable
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="输入操作员编号" prop="operatorId">
          <el-input
            v-model="form.operatorId"
            placeholder="Enter operatorId"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="输入数据摘要" prop="hash">
          <el-input
            v-model="form.hash"
            placeholder="Enter Hash"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd.show = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogAdd: Object,
  },
  data() {
    return {
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
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          // this.form.storageTime = new Date(this.form.storageTime).getTime();
          // this.form.shelfTime = new Date(this.form.shelfTime).getTime();
          this.$axios.post("info/sale", this.form).then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              this.$message({ type: "success", message: "添加成功" });
              this.dialogAdd.show = false;
              this.$emit("updateAdd");
            } else {
              this.$message({ type: "error", message: "添加失败" });
            }
            this.$refs["elForm"].resetFields();
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  margin-top: -30px;
}
</style>