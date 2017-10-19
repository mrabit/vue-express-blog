<style>
.el-date-editor--daterange.el-input {
  width: 320px;
}
</style>
<template>
    <section class="app-content">
        <div class="bg-light lter b-b wrapper-md">
            <h1 class="m-n font-thin h3">文章列表</h1>
        </div>
        <div class="wrapper">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="文章标题：">
                    <el-input v-model="formInline.title" placeholder="文章标题,支持模糊搜索"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox label=" 发布时间：" name="type" v-model="formInline.need_time"></el-checkbox>
                    <el-date-picker format="yyyy-MM-dd hh:mm:ss" v-model="formInline.release_time" :disabled="!formInline.need_time" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" stripe class="w-full">
                <el-table-column prop="id" label="ID" width="80">
                </el-table-column>
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop="private" label="公开度" width="100">
                    <template scope="scope">
                        <span>{{ scope.row.private | isPrivate }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reprint_url" label="是否转载" width="100">
                    <template scope="scope">
                        <span>{{ scope.row.reprint_url | isReprint }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="uname" label="发布者" width="100">
                </el-table-column>
                <el-table-column prop="release_time" label="发布时间" width="180">
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template scope="scope">
                        <button type="button" class="btn btn-default btn-sm w-xs" :disabled="!!parseInt(scope.row.is_html)"
                            @click="handleEdit(scope.$index, scope.row)">编辑</button>
                        <button type="button" class="btn btn-default btn-sm w-xs" 
                            @click="handleDelete(scope.$index, scope.row)">删除</button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pull-right m-t-md">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </section>
</template>
<script>
var util = require("util");
export default {
  data() {
    return {
      formInline: {
        title: "",
        need_time: false,
        release_time: "",
        params: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [
        {
          id: "40",
          title: "树莓派Raspberry Pi 3 安装图形化工具VNCserver",
          is_html: "0",
          reprint_url: "",
          private: "0",
          uname: "admin",
          release_time: "2017-10-10 23:28:56"
        },
        {
          id: "39",
          title: "树莓派Raspberry Pi 3 安装nginx服务",
          is_html: "0",
          reprint_url: "",
          private: "0",
          uname: "admin",
          release_time: "2017-10-05 20:32:23"
        },
        {
          id: "38",
          title: "树莓派Raspberry Pi 3 安装NodeJS",
          is_html: "0",
          reprint_url: "",
          private: "0",
          uname: "admin",
          release_time: "2017-10-05 17:51:31"
        },
        {
          id: "37",
          title: "树莓派Raspberry Pi 3 安装CentOS7",
          is_html: "0",
          reprint_url: "",
          private: "0",
          uname: "admin",
          release_time: "2017-10-04 17:54:19"
        },
        {
          id: "36",
          title: "测试markdown",
          is_html: "0",
          reprint_url: "",
          private: "1",
          uname: "admin",
          release_time: "2017-09-21 15:47:29"
        },
        {
          id: "35",
          title: "Spring Boot 和 webpack dev server 联合开发",
          is_html: "0",
          reprint_url: "",
          private: "0",
          uname: "admin",
          release_time: "2017-08-29 19:56:10"
        },
        {
          id: "34",
          title: "【转】JS实现SVG图形转存为图片下载",
          is_html: "1",
          reprint_url: "http://www.cnblogs.com/jiangxiaobo/p/6007589.html",
          private: "0",
          uname: "admin",
          release_time: "2017-08-28 15:38:50"
        },
        {
          id: "33",
          title: "CentOS7 配置密钥免密码登录",
          is_html: "0",
          reprint_url: "",
          private: "0",
          uname: "admin",
          release_time: "2017-07-13 12:52:48"
        }
      ],
      total: 0,
      pageSize: 10
    };
  },
  filters: {
    isReprint(val) {
      return !!val ? "转载" : "原创";
    },
    isPrivate(val) {
      return !!parseInt(val) ? "不公开" : "公开";
    }
  },
  methods: {
    handleCurrentChange(currentPage = 1) {
      var url = util.format(
        "/admin/article/get_lists/%s/%s",
        currentPage,
        this.pageSize
      );
      if (this.formInline.params) {
        url += this.formInline.params;
      }
      this.$http.get(url).then(d => {
        var result = d.data;
        this.tableData = result.article_lists;
        this.total = result.count;
      });
    },
    onSubmit() {
      var params = [];
      if (this.formInline.title) {
        params.push("title=" + this.formInline.title);
      }
      var time = this.formInline.release_time;
      if (
        this.formInline.need_time &&
        typeof time === "object" &&
        time[0] &&
        time[1]
      ) {
        params.push("startime=" + Date.parse(new Date(time[0])) / 1000);
        params.push("&endtime=" + Date.parse(new Date(time[1])) / 1000);
      }
      var params_url = "";
      if (params.length) {
        params_url = "?" + params.join("&");
      }
      this.formInline.params = params_url;

      this.handleCurrentChange(1);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    this.handleCurrentChange();
  }
};
</script>