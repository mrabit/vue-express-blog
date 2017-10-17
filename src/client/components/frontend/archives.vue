<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder">
                <article class="col-xs-12 padder-v">
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
export default {
    data() {
        return {
            article_list: [
                {
                    archives_time: '2017年10月',
                    aaData: [
                        {
                            id: 1,
                            title: '树莓派Raspberry Pi 3 安装图形化工具VNCserver',
                            create_time: '2017年10月16日'
                        }, {
                            id: 2,
                            title: '树莓派Raspberry Pi 3 安装图形化工具VNCserver',
                            create_time: '2017年10月15日'
                        }
                    ]
                },
                {
                    archives_time: '2017年9月',
                    aaData: [
                        {
                            id: 3,
                            title: '树莓派Raspberry Pi 3 安装图形化工具VNCserver',
                            create_time: '2017年9月16日'
                        }, {
                            id: 4,
                            title: '树莓派Raspberry Pi 3 安装图形化工具VNCserver',
                            create_time: '2017年9月15日'
                        }
                    ]
                }
            ]
        }
    }
}
</script>
