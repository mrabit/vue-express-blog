<style lang="scss">
.login {
  .input-with-login {
    width: 200px;
    input {
      border-radius: 0 !important;
    }
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #27c24c;
    border-color: #27c24c;
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
                    <el-form :inline="true" :model="formData" :rules="rules" class="m-t" ref="formData">
                        <el-form-item prop="upwd">
                            <el-input type="password" placeholder="输入密码进行下一步" v-model="formData.upwd" class="input-with-login"
                                @focus="formData.visibility = false">
                                <el-button slot="append" class="btn btn-success no-border" @click="submitForm('formData')">
                                    <i class="fa fa-arrow-right"></i>
                                </el-button>
                            </el-input>
                            <span class="help-block m-b-none text-danger m-t-none text-left text-xs" :style="{ visibility: formData.visibility?'visible':'hidden' }"
                             style="line-height: 18px">{{ formData.error }}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
var WebStorageCache = require("web-storage-cache");
var wsCache = new WebStorageCache();
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
      formData: {
        uname: "admin",
        upwd: "",
        error: "密码错误,请重试",
        visibility: false
      },
      rules: {
        upwd: [
          { validator: validatePass, trigger: "change" },
          { validator: validateLength, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!this.formData.visibility) {
          this.$http
            .post("/api/login", {
              uname: this.formData.uname,
              upwd: this.formData.upwd
            })
            .then(
              result => {
                if (result.data.success) {
                  var token = result.data.token;
                  wsCache.set(
                    "token",
                    {
                      token: token,
                      user: result.data.user
                    },
                    { exp: 60 * 5 }
                  );
                  this.$store.commit("changeUser", result.data.user);
                  this.$router.push("/admin/index.html");
                } else {
                  this.$message.error(result.data.message);
                }
              },
              err => this.$message.error(err.message)
            );
        }
      });
    }
  }
};
</script>