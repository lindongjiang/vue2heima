<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar title="黑马头条" fixed/>

    <!-- 导入，注册使用ArtcleInfo组件 -->
    <p>{{ artlist.length }}</p>
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
      <ArticleInfo v-for="item in artlist" 
        :key="item.id"
        :title="item.title"
        :author="item.aut_name"
        :cmtCount="item.comm_count"
        :time="item.pubdate"
        :cover="item.cover"></ArticleInfo> 
      </van-list>
    </van-pull-refresh>
  </div>
</template>
 
<script>
// 导入request
// import request from '@/utils/request'

// 按需导入API接口
import { getArticleListAPI } from '@/api/articleAPI'
// const result = getAriticleListAPI()

// 导入需要的组件
import ArticleInfo from '@/components/Article/ArticleInfo.vue'

export default {
  name: 'Home',
  data () {
    return {
      // 页码值
      page: 1,
      // 每页传多少数据
      limit: 10,
      // 文章数据
      artlist:[],
      // 是否加载下一页数据，如果loading为true，则不会触发load事件
      // 每当下页数据请求回来之后，千万要几等，吧loading从true改为false
      loading: true,
      // 所有数据加载完成，如果没有更多的数据，一定要吧finished改成true
      finished:false,
      // 是否正在下拉刷新
      isLoading:false
      
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
      // 封装获取文章列表数据的方法
      async initArticleList(isRefresh) {
      // 发起get请求，获取文章列表数据
       const { data: res } = await getArticleListAPI(this.page,this.limit)
      if(isRefresh) {
        // 如果下拉刷新，应该是
       //  this.artlist= [新数据在前，旧数据在后]
        this.artlist = [...res, ...this.artlist]
        this.loading=false
      }else{
        // 如果上拉加载数据更多，应该是
       //  this.artlist= [旧数据在前，新数据在后]
       this.artlist = [...this.artlist , ...res]
       this.loading=false
      }
       if(res.length ===0 ){
        // 证明没有下一页，直接把finished 改为true
        this.finished=true
       }
      },
      onLoad() {
        console.log('出发了')
        // 1.让页码值加1
         this.page++
        //  // eslint-disable-next-line no-undef
        //  console.log(page)
        // 2.重新获取数据
        this.initArticleList()
      },
      // 下拉刷新
      onRefresh() {
        console.log('下拉刷新')
        // 让页码值+1
        this.page++
        // 重新获取数据

        this.isLoading
      }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
 .home-container {
  padding: 46px 0 50px;

  .van-nav-bar{
    background: #007bff;
  }

  /deep/.van-nav-bar__title {
    color: white;
  }
 }
</style>
