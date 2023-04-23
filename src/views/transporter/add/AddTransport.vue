<template>
  <div class="transporter-container">
    <el-dialog
      title="添加运输信息"
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
        <el-form-item label="输入物流订单编号" prop="transportId">
          <el-input
            v-model="form.transportId"
            placeholder="Enter transportId"
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

        <el-form-item label="输入企业负责人" prop="enterOwner">
          <el-input
            v-model="form.enterOwner"
            placeholder="Enter EnterOwner"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入运输车牌号" prop="licenNumber">
          <el-input
            v-model="form.licenNumber"
            placeholder="Enter LicenNumber"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入运输时间" prop="transTime">
          <el-date-picker
            type="datetime"
            v-model="form.transTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter TransTime"
            clearable
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="输入运输起始地" prop="transOrigin">
          <el-input
            v-model="form.transOrigin"
            placeholder="Enter TransOrigin"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入运输目的地" prop="transDestin">
          <el-input
            v-model="form.transDestin"
            placeholder="Enter TransDestin"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入车厢温湿度" prop="carriageTeHu">
          <el-input
            v-model="form.carriageTeHu"
            placeholder="Enter CarriageTeHu"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入司机姓名" prop="driverName">
          <el-input
            v-model="form.driverName"
            placeholder="Enter DriverName"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
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
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          // this.form.transTime = new Date(this.form.transTime).getTime();
          this.$axios.post("info/transport", this.form).then((res) => {
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

<style scoped>
.dialog-footer {
  margin-top: -30px;
}
</style>