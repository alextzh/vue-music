<template>
  <transition name="slider">
    <div class="news-detail">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="top-title" v-html="title"></h1>
      <div class="detail-wrapper">
        <div class="detail-content" ref="detailContent">
          <ul class="detail-group" ref="box">
            <li class="title" ref="title" v-html="newsDetail.title"></li>
            <li class="media" ref="media" v-show="newsDetail.media_user">
              <div class="icon">
                <img class="img" v-lazy="getAvatar">
              </div>
              <div class="text">
                <h2 class="name" v-html="getName"></h2>
                <p class="desc" v-html="getDesc"></p>
              </div>
            </li>
            <li class="content" id="content" ref="content" v-html="newsDetail.content"></li>
          </ul>
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
  import BScroll from 'better-scroll'
  import {mapGetters} from 'vuex'
  import {getTime} from 'common/js/news'

  export default {
    computed: {
      title() {
        return this.newsList.source
      },
      getAvatar() {
        let obj = {}
        if (this.newsList.media_info) {
          obj = this.newsList.media_info
          return obj.avatar_url
        }
      },
      getName() {
        let obj = {}
        if (this.newsList.media_info) {
          obj = this.newsList.media_info
          return obj.name
        }
      },
      getDesc() {
        if (this.newsDetail.is_original) {
          return `<span style="display: inline-block;padding:2px;border:1px solid #ffcd32;border-radius:4px;color:#ffcd32;font-size:10px;line-height:1;">原创</span>  ${getTime(this.newsDetail.publish_time)}`
        }
        return `${getTime(this.newsDetail.publish_time)}`
      },
      ...mapGetters([
        'newsList',
        'newsDetail'
      ])
    },
    created() {
      this._init()
      console.log(this.newsDetail)
    },
    mounted() {
      setTimeout(() => {
        this._setHeight()
        this._initScroll()
      }, 20)
    },
    methods: {
      refresh() {
        if (this.scroll) {
          this._setHeight()
          this.scroll.refresh()
        }
      },
      back() {
        this.$router.back()
      },
      _init() {
        if (!this.newsList.group_id) {
          this.$router.push('/news')
          return false
        }
      },
      _setHeight() {
        let height = 0
        let dBox = document.getElementById('content')
        let dImg = dBox.getElementsByTagName('img')
        let imgH = 0
        for (let i = 0; i < dImg.length; i++) {
          imgH += parseInt(dImg[i].attributes[2].value)
        }
        height += imgH
        let children = this.$refs.content.children[0].children
        for (let n = 0; n < children.length; n++) {
          height += parseInt(children[n].clientHeight)
        }
        this.$refs.box.style.height = height - dImg.length * 21 + parseInt(this.$refs.media.clientHeight) + parseInt(this.$refs.title.clientHeight) + 'px'
      },
      _initScroll() {
        this.scroll = new BScroll(this.$refs.detailContent, {})
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
      position: fixed
      top: 40px
      bottom: 0
      width: 100%
      .detail-content
        height: 100%
        .detail-group
          position: relative
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
            font-size: 14px
            line-height: 1.5
            box-sizing: border-box
            overflow: hidden
  .slider-enter-active,.slider-leave-active
    transition: all 0.3s
  .slider-enter,.slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>
