<style>
.tags_group .tags {
    border: 1px solid rgba(36, 121, 204, .8);
    color: rgba(36, 121, 204, .8);
    padding: 0 30px;
    line-height: 40px;
    font-weight: normal;
    position: relative;
}

.tags_group .tags:hover {
    /*font-weight:bold;*/
    border-color: #2479CC;
    color: #2479CC;
}

.tags_group .tags:hover i {
    display: block !important;
    position: absolute;
    right: 2px;
    top: 2px;
}
</style>

<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder">
                <loading :show="!tags_arr.length"></loading>
                <article class="col-xs-12 padder-v" v-if="tags_arr.length">
                    <p class="article-title h2">标签</p>
                    <div class="entry-content m-t-md">
                        <div class="tags_group">
                            <router-link v-for="(vo, key) in tags_arr" :key="key" class="label inline m-t-sm tags m-r-sm " :to="'/index.html?tags_id=' + vo.id">
                                {{ vo.tags_name }}（{{ vo.counts }}）
                            </router-link>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    </section>
</template>
<script>
import loading from '../loading';
export default {
    components: {
        loading
    },
    data() {
        return {
            tags_arr: [
            ]
        }
    },
    methods: {
        get_tags() {
            this.$http.get('/article_tags').then(result => {
                this.tags_arr = result.data
            }, err => {

            })
        }
    },
    mounted() {
        this.get_tags();
    }
}
</script>
