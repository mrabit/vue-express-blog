<style lang="scss">
.login {
  .input-with-login {
    width: 200px;
    input {
      border-radius: 0 !important;
      height: 36px;
    }
    button {
      width: 45px;
      padding: 0;
    }
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #27c24c;
    border-color: #27c24c;
  }
  .el-tabs__item {
    color: #8391a5;
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
  .qrcode {
    width: 150px;
    height: 150px;
  }
}
</style>
</style>
<template>
<section class="app-content m-l-none login">
        <div class="modal-over bg-black" >
            <div class="verticalCenter w-full h-full">
                <div class=" animated fadeInUp text-center" style="width:300px;">
                    <div class="thumb-lg">
                        <img src="/Uploads/Picture/2017-06-06/59369fb016efa.png" class="img-circle">
                    </div>
                    <p class="h4 m-t m-b">{{ formData.uname }}</p>
                    <el-tabs v-model="activeName">
                      <el-tab-pane label="二维码登录" name="QRCode">
                        <div id="qrcode">
                          <img :src="qrcode_url" alt="" @click="sendMessage(guid())">
                          <p class="text-center m-t-md">{{ qrcode_message }}</p>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="密码登录" name="passwd">
                        <el-form :inline="true" :model="formData" :rules="rules" class="m-t" ref="formData">
                          <el-form-item>
                            <el-input type="password" placeholder="输入密码进行下一步" class="hide"></el-input>
                          </el-form-item>
                          <el-form-item>
                              <el-input type="password" placeholder="输入密码进行下一步" v-model="formData.upwd" class="input-with-login"
                                  @focus="formData.visibility = false" @keyup.enter.native="submitForm('formData')" :disabled="formData.logining">
                                  <el-button slot="append" class="btn btn-success no-border" type="button" @click="submitForm('formData')">
                                      <i class="fa fa-arrow-right" :class="{'fa-spin fa-spinner': formData.logining}"></i>
                                  </el-button>
                              </el-input>
                              <span v-if="!formData.logining" class="help-block m-b-none text-danger m-t-none text-left text-xs" :style="{ visibility: formData.visibility?'visible':'hidden' }"
                              style="line-height: 18px">{{ formData.error }}</span>
                              <span v-if="formData.logining" class="help-block m-b-none text-success m-t-none text-left text-xs" :style="{ visibility: formData.logining?'visible':'hidden' }"
                              style="line-height: 18px">正在登录, 请稍候...</span>
                          </el-form-item>
                        </el-form>
                      </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
var WebStorageCache = require("web-storage-cache");
var wsCache = new WebStorageCache();
var QRCode = require("qrcode");
var config = require("../../config");
var md5 = require("md5");

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        this.formData.error = "请输入密码";
        this.formData.visibility = true;
      }
      callback();
    };
    var validateLength = (rule, value, callback) => {
      if (!this.formData.visibility) {
        this.formData.error = "长度在 5 到 10 个字符";
      }
      this.formData.visibility = value.length < 5 || value.length > 10;
      callback();
    };
    return {
      activeName: "QRCode",
      formData: {
        uname: "admin",
        upwd: "",
        error: "密码错误,请重试",
        visibility: false,
        logining: false
      },
      rules: {
        upwd: [
          { validator: validatePass, trigger: "change" },
          { validator: validateLength, trigger: "change" }
        ]
      },
      wss: null,
      qrcode_url: "",
      qrcode_message: "请扫码登录."
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.formData.visibility) {
          this.formData.logining = true;
          this.$http
            .post("/api/login", {
              uname: this.formData.uname,
              upwd: md5(this.formData.upwd)
            })
            .then(
              result => {
                setTimeout(_ => {
                  if (result.data.success) {
                    this.loginSuccess(result.data.token, result.data.user);
                  } else {
                    this.formData.logining = false;
                    this.$message.error(result.data.message);
                  }
                }, 1500);
              },
              err => this.$message.error(err.message)
            );
        }
      });
      return false;
    },
    createSocket() {
      if (this.wss) {
        this.wss.close();
      }
      this.wss = new WebSocket(config.socket + "?login");
      var canvas = document.getElementById("qrcode");

      this.wss.onopen = _ => {
        this.sendMessage(this.guid());
      };
      this.wss.onmessage = evt => {
        var result = JSON.parse(evt.data);
        var key = result.key;
        var msg = result.message;
        if (key) {
          // 获取base64编码二维码
          this.qrcode_url = key;
        } else {
          // 登录成功
          this.qrcode_message = msg;
          setTimeout(_ => {
            var token = result.token;
            var user = result.user;
            this.loginSuccess(token, user);
          }, 1500);
        }
      };
      this.wss.onclose = _ => {
        this.wss = null;
      };
    },
    sendMessage(msg) {
      // socket连接断开,重新创建服务
      if (!this.wss) {
        this.createSocket();
        return false;
      }
      this.wss.send(msg);
    },
    loginSuccess(token, user) {
      wsCache.set(
        "token",
        {
          token: token,
          user: user
        },
        { exp: 60 * 60 }
      );
      // 关闭login时创建的websocket
      this.wss.close();
      this.$store.commit("admin/changeUser", user);
      this.$router.push("/admin/index.html");
    },
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        S4() +
        "-" +
        S4() +
        S4() +
        "-" +
        S4() +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    }
  },
  mounted() {
    this.createSocket();
  }
};
</script>