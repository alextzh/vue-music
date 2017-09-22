<template>
  <transition name="slider">
    <div class="news-detail">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="top-title" v-html="source"></h1>
      <div class="detail-wrapper">
        <scroll class="detail-content" ref="scroll"
                :data="newsDetail"
                :scrollbar="scrollbarObj"
        >
          <ul class="detail-group" ref="box">
            <li v-for="item in newsDetail">
              <div class="title" ref="title" v-html="item.title"></div>
              <div class="media" ref="media" v-show="item.media_user">
                <div class="icon" v-show="item.is_pgc_article">
                  <img class="img" v-lazy="getAvatar(item.media_user)">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.source"></h2>
                  <p class="desc" v-html="getDesc(item)"></p>
                </div>
              </div>
              <div class="content" ref="content" v-html="item.content"></div>
            </li>
          </ul>
        </scroll>
        <div class="loading-container" v-show="!newsDetail">
          <loading></loading>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import Scroll from 'base/new-scroll/new-scroll'
  import {getTime} from 'common/js/news'
  import {mapGetters} from 'vuex'
  import {getNewsDetail} from 'api/news'

  export default {
    data() {
      return {
        newsDetail: [],
        scrollbar: true,
        scrollbarFade: true,
        isLoad: false
      }
    },
    computed: {
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      source() {
        return this.currentNew.source
      },
      ...mapGetters([
        'currentNew'
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
        if (!this.currentNew.item_id) {
          this.$router.push('/news')
          return false
        }
        getNewsDetail(this.currentNew.item_id).then((res) => {
          if (res.data) {
            this.newsDetail = this._normalizeNews(res.data)
            setTimeout(() => {
              this._loadImg()
              this.isLoad = !this.isLoad
            }, 20)
          }
        })
      },
      _normalizeNews(data) {
        let ret = []
        let arr = []
        ret.push(data)
        arr = ret.splice(-1, 1)
        return arr
      },
      _loadImg() {
        let oP = this.$refs.content[0].getElementsByTagName('p')
        let oImg = this.$refs.content[0].getElementsByTagName('img')
        for (let i = 0; i < oP.length; i++) {
          oP[i].style.fontSize = '15px'
          oP[i].style.lineHeight = '24px'
        }
        for (let i = 0; i < oImg.length; i++) {
          oImg[i].style.width = '100%'
          oImg[i].style.display = 'block'
        }
        this.isLoad = true
      },
      getAvatar(item) {
        return item.avatar_url
      },
      getDesc(item) {
        if (item.is_original) {
          return `<span style="display: inline-block;padding:2px;border:1px solid #ffcd32;border-radius:4px;color:#ffcd32;font-size:10px;line-height:1;">原创</span>  ${getTime(item.publish_time)}`
        }
        return `${getTime(item.publish_time)}`
      }
    },
    watch: {
      scrollbarObj() {
        this.$refs.scroll.refresh()
      },
      isLoad(val) {
        if (val) {
          this.$refs.scroll.refresh()
        }
      }
    },
    components: {
      Scroll,
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
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .detail-wrapper
      position: absolute
      top: 40px
      bottom: 0
      width: 100%
      .detail-content
        height: 100%
        overflow: hidden
        .media
          position: relative
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 10px 15px
          .icon
            flex: 0 0 50px
            width: 50px
            border-radius: 50%
            margin-right: 15px
            overflow: hidden
            .img
              width: 50px
              height: 50px
              border-radius: 50%
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
        .title
          padding: 0 15px
          font-size: 16px
          color: $color-text
          font-weight: 600
          line-height: 1.5
        .content
          padding: 10px 15px
          box-sizing: border-box
          overflow: hidden
          p
            width: 100%
            overflow: hidden
            font-size: 14px
            line-height: 24px
          img
            display: block
            width: 100%
  .slider-enter-active,.slider-leave-active
    transition: all 0.3s
  .slider-enter,.slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>
