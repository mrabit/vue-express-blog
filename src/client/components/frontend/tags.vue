<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder">
                <article class="col-xs-12 padder-v">
                    <p class="article-title h2">标签</p>
                    <div class="entry-content m-t-md">
                        <div class="tags_group">
                            <router-link v-for="(vo, key) in tags_arr" :key="key" class="label inline m-t-sm tags m-r-sm "
                             :to="'/tags_id/' + vo.id + '.html'">
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
export default {
    data() {
        return {
            tags_arr: [
                {
                    tags_name: 'linux',
                    counts: '5',
                    id: 1
                },
                {
                    tags_name: 'javascript',
                    counts: '3',
                    id: 2
                },
                {
                    tags_name: 'centos',
                    counts: '0',
                    id: 3
                },
                {
                    tags_name: 'mysql',
                    counts: '2',
                    id: 4
                }
            ]
        }
    }
}
</script>
