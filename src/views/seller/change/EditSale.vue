<template>
  <div class="seller-container">
    <el-dialog
      title="编辑销售信息"
      :visible.sync="dialogEdit.show"
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
            :disabled="true"
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
        <!-- 
        <el-form-item label="输入数据摘要" prop="hash">
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
        <el-button @click="dialogEdit.show = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogEdit: Object,
    form: Object,
  },
  data() {
    return {
      rules: {
        salesInfoId: [
          {
            required: true,
            message: "Enter salesInfoId",
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
          this.$axios.post("check/saleInfo", this.form).then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              this.$message({ type: "success", message: "申请审核成功" });
              this.dialogEdit.show = false;
              this.$emit("updateEdit");
            } else {
              this.dialogEdit.show = false;
              this.$message({ type: "error", message: "请勿重复提交申请" });
            }
          });
          // this.$emit("showButton");
          // this.dialogEdit.show = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.seller-container {
  margin: 40px;
}
.dialog-footer {
  margin-top: -30px;
}
</style>