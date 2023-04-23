<template>
  <div class="login-container">
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form action="javascript:void(0)">
          <h1>注册新账户</h1>
          <div class="social-container">
            <a href="#" class="social"
              ><svg
                t="1627197088490"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5491"
                width="40"
                height="40"
              >
                <path
                  d="M68.399765 590.615655c-37.073602 90.765025-43.465533 176.418105-14.062849 191.757941 20.45478 11.505876 53.692423-14.061849 84.374094-60.084355 11.504876 51.135451 42.186547 95.87897 84.373094 132.952572-44.743519 16.619821-74.146204 44.743519-74.146204 75.42519 0 51.135451 79.259149 93.321998 176.418105 93.321997 88.208052 0 161.07627-33.237643 175.138119-77.982162h20.45478C535.009753 990.751357 607.87897 1023.989 696.087023 1023.989c98.436943 0 176.418105-40.908561 176.418104-93.321997 0-30.68167-29.402684-58.806368-74.146203-75.42519 42.186547-37.073602 72.868217-81.817121 84.374094-132.952572 30.68067 46.022506 62.640327 71.589231 84.373093 60.084355 30.68167-15.339835 24.289739-102.270901-14.061849-191.757941-29.403684-70.311245-69.033258-122.725682-99.714929-134.230558 0-3.835959 1.278986-8.949904 1.278987-14.062849 0-26.845712-7.669918-52.413437-20.454781-72.868217v-5.112945c0-12.783863-2.555973-24.289739-7.669917-34.516629C818.813704 145.736434 701.200968 0 510.722014 0 320.24206 0 202.630323 145.736434 194.959406 329.824457c-5.112945 10.22689-7.669918 21.732767-7.669918 34.516629v5.112945c-12.783863 20.45478-20.45478 46.022506-20.45478 72.869217v14.061849c-28.123698 11.504876-69.032258 62.640327-98.434943 134.230558z"
                  fill="#4CAFE9"
                  p-id="5492"
                ></path></svg
            ></a>
            <a href="#" class="social"
              ><svg
                t="1627197319615"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12069"
                width="40"
                height="40"
              >
                <path
                  d="M1010.8 628c0-141.2-141.3-256.2-299.9-256.2-168 0-300.3 115.1-300.3 256.2 0 141.4 132.3 256.2 300.3 256.2 35.2 0 70.7-8.9 106-17.7l96.8 53-26.6-88.2c70.9-53.2 123.7-123.7 123.7-203.3zM618 588.8c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 22-17.9 40-40 40z m194.3-0.3c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
                  fill="#00C800"
                  p-id="12070"
                ></path>
                <path
                  d="M366.3 106.9c-194.1 0-353.1 132.3-353.1 300.3 0 97 52.9 176.6 141.3 238.4l-35.3 106.2 123.4-61.9c44.2 8.7 79.6 17.7 123.7 17.7 11.1 0 22.1-0.5 33-1.4-6.9-23.6-10.9-48.3-10.9-74 0-154.3 132.5-279.5 300.2-279.5 11.5 0 22.8 0.8 34 2.1C692 212.6 539.9 106.9 366.3 106.9zM247.7 349.2c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z m246.6 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
                  fill="#00C800"
                  p-id="12071"
                ></path></svg
            ></a>
            <a href="#" class="social"
              ><img src="../../assets/favicon.png" class="bilibili"
            /></a>
          </div>
          <span>或者使用您的邮箱注册</span>

          <el-select
            v-model="registerForm.role"
            placeholder="请选择"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in roleOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
          <el-input
            placeholder="name"
            v-model="registerForm.name"
            clearable
          ></el-input>
          <el-input
            placeholder="Password"
            v-model="registerForm.password"
            show-password
            clearable
          ></el-input>
          <button @click="handleRegister">注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="javascript:void(0)">
          <h1>登录</h1>
          <div class="social-container">
            <a href="#" class="social"
              ><svg
                t="1627197088490"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5491"
                width="40"
                height="40"
              >
                <path
                  d="M68.399765 590.615655c-37.073602 90.765025-43.465533 176.418105-14.062849 191.757941 20.45478 11.505876 53.692423-14.061849 84.374094-60.084355 11.504876 51.135451 42.186547 95.87897 84.373094 132.952572-44.743519 16.619821-74.146204 44.743519-74.146204 75.42519 0 51.135451 79.259149 93.321998 176.418105 93.321997 88.208052 0 161.07627-33.237643 175.138119-77.982162h20.45478C535.009753 990.751357 607.87897 1023.989 696.087023 1023.989c98.436943 0 176.418105-40.908561 176.418104-93.321997 0-30.68167-29.402684-58.806368-74.146203-75.42519 42.186547-37.073602 72.868217-81.817121 84.374094-132.952572 30.68067 46.022506 62.640327 71.589231 84.373093 60.084355 30.68167-15.339835 24.289739-102.270901-14.061849-191.757941-29.403684-70.311245-69.033258-122.725682-99.714929-134.230558 0-3.835959 1.278986-8.949904 1.278987-14.062849 0-26.845712-7.669918-52.413437-20.454781-72.868217v-5.112945c0-12.783863-2.555973-24.289739-7.669917-34.516629C818.813704 145.736434 701.200968 0 510.722014 0 320.24206 0 202.630323 145.736434 194.959406 329.824457c-5.112945 10.22689-7.669918 21.732767-7.669918 34.516629v5.112945c-12.783863 20.45478-20.45478 46.022506-20.45478 72.869217v14.061849c-28.123698 11.504876-69.032258 62.640327-98.434943 134.230558z"
                  fill="#4CAFE9"
                  p-id="5492"
                ></path></svg
            ></a>
            <a href="#" class="social"
              ><svg
                t="1627197319615"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12069"
                width="40"
                height="40"
              >
                <path
                  d="M1010.8 628c0-141.2-141.3-256.2-299.9-256.2-168 0-300.3 115.1-300.3 256.2 0 141.4 132.3 256.2 300.3 256.2 35.2 0 70.7-8.9 106-17.7l96.8 53-26.6-88.2c70.9-53.2 123.7-123.7 123.7-203.3zM618 588.8c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 22-17.9 40-40 40z m194.3-0.3c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
                  fill="#00C800"
                  p-id="12070"
                ></path>
                <path
                  d="M366.3 106.9c-194.1 0-353.1 132.3-353.1 300.3 0 97 52.9 176.6 141.3 238.4l-35.3 106.2 123.4-61.9c44.2 8.7 79.6 17.7 123.7 17.7 11.1 0 22.1-0.5 33-1.4-6.9-23.6-10.9-48.3-10.9-74 0-154.3 132.5-279.5 300.2-279.5 11.5 0 22.8 0.8 34 2.1C692 212.6 539.9 106.9 366.3 106.9zM247.7 349.2c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z m246.6 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
                  fill="#00C800"
                  p-id="12071"
                ></path></svg
            ></a>
            <a href="#" class="social"
              ><img src="../../assets/favicon.png" class="bilibili"
            /></a>
          </div>
          <span>或者使用已有账号登录</span>
          <el-input
            placeholder="name or Email"
            v-model="loginForm.name"
            clearable
          ></el-input>
          <!-- <input
            type="password"
            placeholder="Password"
            v-model="loginForm.password"
          /> -->
          <el-input
            placeholder="Password"
            v-model="loginForm.password"
            show-password
            clearable
          ></el-input>
          <!-- <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span> -->
          <a href="#">忘记您的密码？</a>
          <button @click="handleLogin">登录</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>

    <aplayer :audio="audio" :lrcType="3" fixed :mini="true" />
  </div>
</template>

<script>
import { setToken, removeToken } from "@/utils/auth";
import jsSHA from "jssha";
export default {
  name: "Login",
  data() {
    return {
      audio: {
        name: "終わりの世界から",
        artist: "やなぎなぎ",
        url: "http://inory.oss-cn-shanghai.aliyuncs.com/%E7%B5%82%E3%82%8F%E3%82%8A%E3%81%AE%E4%B8%96%E7%95%8C%E3%81%8B%E3%82%89.flac",
        cover: 'https://p2.music.126.net/MbE8xi4E6E5DULmwtKxjBw==/4428832836684297.jpg', // prettier-ignore
        lrc: "http://inory.oss-cn-shanghai.aliyuncs.com/owarinosekaikara.lrc",
      },

      roleOptions: [
        {
          label: "养殖场",
          value: "farmer",
        },
        {
          label: "屠宰场",
          value: "butcher",
        },
        {
          label: "物流公司",
          value: "transporter",
        },
        {
          label: "销售公司",
          value: "seller",
        },
        {
          label: "监管人员",
          value: "supervision",
        },
        {
          label: "消费者",
          value: "consumer",
        },
      ],
      loginForm: {
        name: "admin",
        password: "admin",
      },
      registerForm: {
        role: "farmer",
        name: "",
        password: "",
      },
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  },
  methods: {
    crypto(str) {
      const shaObj = new jsSHA("SHA3-256", "TEXT", { encoding: "UTF8" });
      shaObj.update(str);
      return shaObj.getHash("HEX", { outputLen: 1024 });
    },
    handleColorfullLoading(index) {
      const Loading = this.$baseColorfullLoading(index);
      setTimeout(() => {
        location.reload();
        Loading.close();
        this.$message({ type: "success", message: "登陆成功" });
      }, 1500);
    },

    handleLogin() {
      if (this.loginForm.name != "" && this.loginForm.password != "") {
        let pwd = this.crypto(this.loginForm.password);
        this.$axios
          .post("account/login", { name: this.loginForm.name, password: pwd })
          .then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              this.$router.push("/");
              this.handleColorfullLoading(3);
              setToken(res.data.data.token);
            } else {
              this.$message({ type: "error", message: "用户名或密码错误" });
              removeToken();
            }
          });
      } else {
        this.$message({ type: "warning", message: "用户名或密码不能为空" });
      }
    },
    handleRegister() {
      if (this.registerForm.name != "" && this.registerForm.password != "") {
        let pwd = this.crypto(this.registerForm.password);
        this.$axios
          .post("account/register", {
            role: this.registerForm.role,
            name: this.registerForm.name,
            password: pwd,
          })
          .then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              this.$message({ type: "success", message: "注册成功" });
              this.registerForm = {};
            } else {
              console.log("error register!!");
              this.$message({ type: "error", message: "注册失败" });
            }
          });
      } else {
        this.$message({ type: "warning", message: "用户名或密码不能为空" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* reset element-ui css */
.login-container {
  background: url("https://inory.oss-cn-shanghai.aliyuncs.com/AI14-RVawLtv6.jpg");
  background-size: cover;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>


<style >
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}
.role {
  width: 100%;
  height: 43px;
  background-color: #eee;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin: 5px 0;
  padding: 10px;
  font-size: 15px;
  outline: none;
  color: #606266;
}
input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.el-input__inner {
  background-color: #eee;
  height: 43px;
}

.container {
  opacity: 0.8;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  top: calc(50% - 240px);
  left: calc(50% - 384px);
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
  display: flex;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  padding: 10px;
  height: 40px;
  width: 40px;
}

.bilibili {
  widows: 20px;
  height: 20px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>