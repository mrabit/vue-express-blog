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
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            formInline: {
                title: '',
                need_time: false,
                release_time: ''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>