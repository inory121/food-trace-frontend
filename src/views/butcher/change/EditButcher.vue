<template>
  <div class="butcher-container">
    <el-dialog
      title="编辑屠宰信息"
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
        <el-form-item label="输入猪只编号" prop="pigId">
          <el-input
            v-model="form.pigId"
            placeholder="Enter pigId"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入健康状况" prop="healthStatu">
          <el-input
            v-model="form.healthStatu"
            placeholder="Enter HealthStatu"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入检疫日期" prop="quaranDate">
          <el-date-picker
            type="datetime"
            v-model="form.quaranDate"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter QuaranDate"
            clearable
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="输入猪肉批次" prop="porkBatches">
          <el-input
            v-model="form.porkBatches"
            placeholder="Enter PorkBatches"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入屠宰日期" prop="slaDate">
          <el-date-picker
            type="datetime"
            v-model="form.slaDate"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter SlaDate"
            clearable
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="输入排酸时间" prop="acidTime">
          <el-date-picker
            type="datetime"
            v-model="form.acidTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter AcidTime"
            clearable
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="输入环境温湿度" prop="ambientTeHu">
          <el-input
            v-model="form.ambientTeHu"
            placeholder="Enter AmbientTeHu"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入包装编号" prop="packId">
          <el-input
            v-model="form.packId"
            :style="{ width: '100%' }"
            placeholder="Enter packId"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="输入包装材料" prop="packMaterial">
          <el-input
            v-model="form.packMaterial"
            placeholder="Enter PackMaterial"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入包装时间" prop="packTime">
          <el-date-picker
            type="datetime"
            v-model="form.packTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter PackTime"
            clearable
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="输入猪肉部位" prop="meatPart">
          <el-input
            v-model="form.meatPart"
            placeholder="Enter MeatPart"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
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
        pigId: [
          {
            required: true,
            message: "Enter pigId",
            trigger: "blur",
          },
        ],
      },
      // ambientTeHuOptions: [
      //   {
      //     label: "雄",
      //     value: "雄",
      //   },
      //   {
      //     label: "雌",
      //     value: "雌",
      //   },
      // ],
    };
  },
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          this.$axios.post("check/butcherInfo", this.form).then((res) => {
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
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.butcher-container {
  margin: 40px;
}
.dialog-footer {
  margin-top: -30px;
}
</style>>
</style>