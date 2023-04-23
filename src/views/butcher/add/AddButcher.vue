<template>
  <div class="butcher-container">
    <el-dialog
      title="添加屠宰信息"
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
        <el-form-item label="输入猪只编号" prop="pigId">
          <el-input
            v-model="form.pigId"
            placeholder="Enter pigId"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
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
      //   ambientTeHuOptions: [
      //     {
      //       label: "雄",
      //       value: "male",
      //     },
      //     {
      //       label: "雌",
      //       value: "female",
      //     },
      //   ],
    };
  },

  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          // this.form.quaranDate = new Date(this.form.quaranDate).getTime();
          // this.form.acidTime = new Date(this.form.acidTime).getTime();
          // this.form.slaDate = new Date(this.form.slaDate).getTime();
          // this.form.packTime = new Date(this.form.packTime).getTime();
          this.$axios.post("info/butcher", this.form).then((res) => {
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