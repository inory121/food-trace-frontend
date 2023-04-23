<template>
  <div class="consumer-container">
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:8081/api/foodtrace/getInfo"
      :on-success="handleSucceed"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>

    <el-button
      type="primary"
      size="small"
      class="trace"
      @click="foodTrace"
      icon="el-icon-search"
      >一键溯源比对</el-button
    >

    <el-descriptions
      class="margin-top"
      title="养殖场信息"
      :column="3"
      :size="size"
      border
    >
      <template slot="extra"> </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          猪肉编号
        </template>
        {{ farm.pigId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          养殖场地址
        </template>
        {{ farm.farmPosit }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          养殖场负责人
        </template>
        {{ farm.farmOwner }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          环境卫生状况
        </template>
        {{ farm.ehygiene }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          猪肉种类
        </template>
        {{ farm.pigType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          入栏时间
        </template>
        {{ farm.cultTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          喂食饲料种类
        </template>
        {{ farm.feedType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          疫苗接种种类
        </template>
        {{ farm.vaccineType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          疫苗接种时间
        </template>
        {{ farm.vaccineTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          哈希值
        </template>
        {{ farm.hash }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
      class="margin-top"
      title="屠宰场信息"
      :column="3"
      :size="size"
      border
    >
      <template slot="extra"> </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          猪肉编号
        </template>
        {{ butcher.pigId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          健康状况
        </template>
        {{ butcher.healthStatu }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          检疫日期
        </template>
        {{ butcher.quaranDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          猪肉批次
        </template>
        {{ butcher.porkBatches }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          屠宰日期
        </template>
        {{ butcher.slaDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          排酸时间
        </template>
        {{ butcher.acidTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          环境温湿度
        </template>
        {{ butcher.ambientTeHu }}
      </el-descriptions-item>
      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          包装编号
        </template>
        {{ butcher.packId }}
      </el-descriptions-item> -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          包装材料
        </template>
        {{ butcher.packMaterial }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          包装时间
        </template>
        {{ butcher.packTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          猪肉部位
        </template>
        {{ butcher.meatPart }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          哈希值
        </template>
        {{ butcher.hash }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
      class="margin-top"
      title="物流信息"
      :column="3"
      :size="size"
      border
    >
      <template slot="extra"> </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          物流订单编号
        </template>
        {{ transport.transportId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          企业名称
        </template>
        {{ transport.enterName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          企业地址
        </template>
        {{ transport.enterPosit }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          企业负责人
        </template>
        {{ transport.enterOwner }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          运输车牌号
        </template>
        {{ transport.licenNumber }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          运输时间
        </template>
        {{ transport.transTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          运输起始地
        </template>
        {{ transport.transOrigin }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          运输目的地
        </template>
        {{ transport.transDestin }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          车厢温湿度
        </template>
        {{ transport.carriageTeHu }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          司机姓名
        </template>
        {{ transport.driverName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          哈希值
        </template>
        {{ transport.hash }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
      class="margin-top"
      title="销售信息"
      :column="3"
      :size="size"
      border
    >
      <template slot="extra"> </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          销售信息编号
        </template>
        {{ sale.salesInfoId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          企业名称
        </template>
        {{ sale.enterName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          企业地址
        </template>
        {{ sale.enterPosit }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          入库时间
        </template>
        {{ sale.storageTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          库内温湿度
        </template>
        {{ sale.storageTeHu }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          销售地点
        </template>
        {{ sale.salesSite }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          上架时间
        </template>
        {{ sale.shelfTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          哈希值
        </template>
        {{ sale.hash }}
      </el-descriptions-item>
    </el-descriptions>

    <el-dialog title="比对结果" :visible.sync="dialogVisible" width="30%">
      <div class="info">{{ farmInfo }}</div>
      <div class="info">{{ butcherInfo }}</div>
      <div class="info">{{ transportInfo }}</div>
      <div class="info">{{ saleInfo }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      farmInfo: "",
      butcherInfo: "",
      transportInfo: "",
      saleInfo: "",
      dialogVisible: false,
      size: "",
      farm: {
        pigId: undefined,
        farmId: "",
        farmPosit: undefined,
        farmOwner: undefined,
        ehygiene: undefined,
        pigType: undefined,
        pigGender: "雄",
        cultTime: null,
        feedType: undefined,
        vaccineType: undefined,
        vaccineTime: null,
        operatorId: undefined,
        hash: "",
      },
      butcher: {
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
      transport: {
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
      sale: {
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
    };
  },

  methods: {
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "比对中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 1800);
    },
    handleSucceed(res) {
      if (
        res.data.info.farm === null ||
        res.data.info.butcher === null ||
        res.data.info.transport === null
      ) {
        this.$message({
          type: "error",
          message: "找不到产品信息",
        });
      }
      console.log(res.data.info);
      this.farm = res.data.info.farm;
      this.butcher = res.data.info.butcher;
      this.transport = res.data.info.transport;
      this.sale = res.data.info.sale;
    },
    foodTrace() {
      this.openFullScreen();
      this.$axios
        .post(
          "/foodtrace/trace",
          this.$qs.stringify({
            pigId: this.farm.pigId,
            transportId: this.transport.transportId,
            salesInfoId: this.sale.salesInfoId,
          })
        )
        .then((res) => {
          this.dialogVisible = true;
          console.log(res.data);
          if (res.data.data.blockList[0] == res.data.data.sqlList[0]) {
            this.farmInfo = "养殖信息比对成功,没有被篡改";
          } else {
            this.farmInfo = "养殖信息比对成功,数据被篡改";
          }
          if (res.data.data.blockList[1] == res.data.data.sqlList[1]) {
            this.butcherInfo = "屠宰信息比对成功,没有被篡改";
          } else {
            this.butcherInfo = "屠宰信息比对成功,数据被篡改";
          }
          if (res.data.data.blockList[2] == res.data.data.sqlList[2]) {
            this.transportInfo = "物流信息比对成功,没有被篡改";
          } else {
            this.transportInfo = "物流信息比对成功,数据被篡改";
          }
          if (res.data.data.blockList[3] == res.data.data.sqlList[3]) {
            this.saleInfo = "销售信息比对成功,没有被篡改";
          } else {
            this.saleInfo = "销售信息比对成功,数据被篡改";
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "找不到产品信息或者您还没有上传图片",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.consumer-container {
  margin: 40px;
  .trace {
    margin-left: calc(50% - 104px);
  }
  .upload-demo {
    width: 550px;
  }
  .margin-top {
    margin: 20px 200px 20px 0;
  }
  .info {
    margin: 8px;
    font-size: 16px;
    text-align: center;
  }
}
</style>