<style>
.radio {
  margin-left: initial;
  margin-bottom: initial;
  margin-top: initial;
}
.w-full-important {
  width: 100% !important;
}
.input-new-tag.el-input {
  width: 80px;
}
</style>
<template>
    <section class="app-content">
        <div class="app-content-body">
            <div class="bg-light lter b-b wrapper-md">
                <h1 class="m-n font-thin h3">新增文章</h1>
            </div>
            <div class="wrapper clearfix m-b-md">
                <el-row>
                    <el-col :span="22" :offset="2">
                        <el-form label-position="right" label-width="120px" :model="article_add">
                            <el-form-item label="文章标题：">
                                <el-input v-model="article_add.name"></el-input>
                            </el-form-item>
                            <el-form-item label="转载地址：">
                                <el-input v-model="article_add.region"></el-input>
                            </el-form-item>
                            <el-form-item label="公开度：">
                                <el-radio class="radio" v-model="article_add.type" label="1">公开</el-radio>
                                <el-radio class="radio" v-model="article_add.type" label="2">不公开</el-radio>
                            </el-form-item>
                            <el-form-item label="文章正文：">
                                <div id="editormd" class="w-full-important">
                                    <textarea style="display:none;"></textarea>
                                </div>
                            </el-form-item>
                            <el-form-item label="标签填写：">
                                <el-tag
                                    :key="index"
                                    v-for="(id, tag, index) in dynamicTags"
                                    class="m-r-sm"
                                    :closable="true"
                                    :close-transition="false"
                                    @close="handleClose(tag)">
                                    {{"name: " + tag + ",id: " + id + ",index: " + index}}
                                </el-tag>
                                <el-input
                                    class="input-new-tag"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="mini"
                                    @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
    </section>
</template>
<script>
var util = require("util");
export default {
  data() {
    return {
      article_add: {
        name: "",
        region: "",
        type: ""
      },
      dynamicTags: {
        标签1: 1,
        标签2: 2,
        标签3: 3,
        标签4: 4,
        标签5: 5,
        标签6: 6
      },
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(tag) {
      this.$nextTick(_ => {
        delete this.dynamicTags[tag];
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags[inputValue] = 0;
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  mounted() {
    editormd.toolbarModes.full = [
      "undo",
      "redo",
      "|",
      "bold",
      "del",
      "italic",
      "quote",
      "ucwords",
      "uppercase",
      "lowercase",
      "|",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "|",
      "list-ul",
      "list-ol",
      "hr",
      "|",
      "link",
      "reference-link",
      "image",
      "code",
      "preformatted-text",
      "code-block",
      "table",
      "datetime",
      "emoji",
      "html-entities",
      "pagebreak",
      "|",
      "goto-line",
      "watch",
      "preview",
      "clear",
      "search",
      "|",
      "help"
    ];

    var editormd_content = editormd("editormd", {
      width: "90%",
      height: 640,
      syncScrolling: "single",
      path: "/static/js/editormd/lib/",
      imageUpload: true,
      imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL: "/home/upload/getUpLoad"
    });
  }
};
</script>