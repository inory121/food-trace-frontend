<template>
  <div class="farmer-container">
    <el-dialog
      title="编辑养殖信息"
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

        <el-form-item label="输入养殖场编号" prop="farmId">
          <el-input
            v-model="form.farmId"
            placeholder="Enter farmId"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入养殖场地址" prop="farmPosit">
          <el-input
            v-model="form.farmPosit"
            placeholder="Enter FarmPosit"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入养殖场负责人" prop="farmOwner">
          <el-input
            v-model="form.farmOwner"
            placeholder="Enter FarmOwner"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入环境卫生状况" prop="ehygiene">
          <el-input
            v-model="form.ehygiene"
            placeholder="Enter Ehygiene"
            :maxlength="20"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入猪只种类" prop="pigType">
          <el-input
            v-model="form.pigType"
            placeholder="Enter PigType"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="输入猪只性别" prop="pigGender">
          <el-select
            v-model="form.pigGender"
            placeholder="Enter PigGender"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in pigGenderOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="输入入栏时间" prop="cultTime">
          <el-date-picker
            type="datetime"
            v-model="form.cultTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter CultTime"
            clearable
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="输入喂食饲料种类" prop="feedType">
          <el-input
            v-model="form.feedType"
            placeholder="Enter FeedType"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="输入疫苗接种种类" prop="vaccineType">
          <el-input
            v-model="form.vaccineType"
            placeholder="Enter VaccineType"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>

        <el-form-item label="输入疫苗接种时间" prop="vaccineTime">
          <el-date-picker
            type="datetime"
            v-model="form.vaccineTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :style="{ width: '100%' }"
            placeholder="Enter VaccineTime"
            clearable
          ></el-date-picker>
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
      pigGenderOptions: [
        {
          label: "雄",
          value: "雄",
        },
        {
          label: "雌",
          value: "雌",
        },
      ],
    };
  },
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          // this.form.vaccineTime = new Date(this.form.vaccineTime).getTime();
          // this.form.cultTime = new Date(this.form.cultTime).getTime();
          this.$axios.post("check/farmInfo", this.form).then((res) => {
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
.dialog-footer {
  margin-top: -30px;
}
</style>
