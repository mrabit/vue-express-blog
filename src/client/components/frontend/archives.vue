<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder">
                <loading :show="!article_list.length"></loading>
                <article class="col-xs-12 padder-v" v-if="article_list.length">
                    <p class="article-title h2">归档</p>
                    <div class="entry-content m-t-md">
                        <article class="list-group archives_list" v-for="(vo, key) in article_list" :key="key">
                            <p class="h4 font-bold month_time">
                                <time :datetime="vo.archives_time">{{ vo.archives_time }}</time>({{ vo.aaData.length }})</p>
                            <ul class="padder-lg padder-v  m-l-md">
                                <li v-for="(data, k) in vo.aaData" :key="k">
                                    <router-link :to="{ path: 'details/' + data.id + '.html'}" :title="data.title">{{ data.title }}</router-link>
                                    <span class="date m-l-sm hidden-xs">{{ data.create_time }}</span>
                                </li>
                            </ul>
                        </article>
                    </div>
                </article>
            </section>
        </div>
    </section>
</template>
<script>
import loading from './common/loading';
export default {
    components: {
        loading
    },
    data() {
        return {
            article_list: [
            ]
        }
    },
    methods: {
        get_archives() {
            this.$http.get('/article/archives').then(result => {
                this.article_list = result.data;
            }, err => {

            })
        }
    },
    mounted() {
        this.get_archives();
    }
}
</script>
