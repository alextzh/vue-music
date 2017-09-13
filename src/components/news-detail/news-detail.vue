<template>
  <transition name="slider">
    <div class="news-detail">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="top-title" v-html="title"></h1>
      <div class="detail-wrapper" ref="detailWrapper">
        <div class="detail-content" v-show="newsDetail">
          <h2 class="title" v-html="newsDetail.title"></h2>
          <div class="media"></div>
          <div class="content" v-html="newsDetail.content"></div>
        </div>
        <div class="loading-container" v-show="!newsDetail">
          <loading></loading>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import {mapGetters} from 'vuex'
  import {getNewsDetail} from 'api/news'

  export default {
    data() {
      return {
        newsDetail: {}
      }
    },
    computed: {
      title() {
        return this.newsList.source
      },
      ...mapGetters([
        'newsList'
      ])
    },
    created() {
      this._getNewsDetail()
    },
    methods: {
      back() {
        this.$router.back()
      },
      _getNewsDetail() {
        if (!this.newsList.group_id) {
          this.$router.push('/news')
          return false
        }
        getNewsDetail(this.newsList.group_id).then((res) => {
          if (res.data) {
            console.info(res.data)
          }
        })
      }
    },
    components: {
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .news-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position:absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .top-title
      position:absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
  .slider-enter-active,.slider-leave-active
    transition: all 0.3s
  .slider-enter,.slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>
