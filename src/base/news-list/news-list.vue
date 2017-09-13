<template>
  <scroll ref="newsList" class="news-list" :data="newsList">
    <ul>
      <li v-for="item in newsList" class="item">
        <div class="item-con">
          <div class="item-ver" v-if="!item.middle_mode">
            <h2 class="title" v-html="item.title"></h2>
            <div class="icon" v-show="item.has_image && item.more_mode">
              <img class="multiple-img" v-lazy="img.url" v-for="img in item.image_list">
            </div>
            <div class="icon" v-show="item.has_image && item.large_mode && !item.has_video">
              <img class="single-img" :style="bgStyle(item)" v-lazy="item.large_image_url">
            </div>
            <div class="icon" v-show="item.label_style ===3 && item.more_mode">
              <img class="multiple-img" v-lazy="img.url" v-for="img in item.image_list">
            </div>
            <div class="icon" v-show="item.label_style ===3 && item.large_mode">
              <div class="single-img" :style="bgStyle(item)" v-lazy="item.large_image_url"></div>
            </div>
            <div class="video-wrapper" v-show="(item.has_video && item.large_mode) || (item.has_video && item.large_mode && item.has_image)">
              <div class="video-img" :style="bgStyle(item)" v-lazy="item.large_image_url"></div>
              <span class="video-icon">
                <i class="icon-play"></i>
              </span>
              <span class="video-dur">{{format(item.video_duration)}}</span>
            </div>
            <p class="desc" v-html="getDesc(item)"></p>
          </div>
          <div class="item-hor" v-else>
            <div class="text">
              <h2 class="name" v-html="item.title"></h2>
              <p class="desc" v-html="getDesc(item)"></p>
            </div>
            <div class="icon" v-show="item.has_image && item.middle_mode">
              <img width="116" height="76" v-lazy="item.image_url">
            </div>
            <div class="icon" v-show="item.label_style === 3 && item.middle_mode">
              <img width="116" height="76" v-lazy="item.image_url">
            </div>
            <div class="mini-video-wrapper" v-show="item.has_video && item.middle_mode">
              <img width="116" height="76" v-lazy="item.image_url" alt="">
              <span class="mini-video-icon">
              <i class="icon-play-mini"></i>
            </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="loading-container" v-show="!newsList.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {getNewsList} from 'api/news'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        newsList: []
      }
    },
    computed: {
      ...mapGetters([
        'tag'
      ])
    },
    created() {
      this._getNewsList(this.tag)
    },
    methods: {
      refresh() {
        this._getNewsList(this.tag)
      },
      _getNewsList(tag) {
        getNewsList(tag).then((res) => {
          if (res.data) {
            this.newsList = res.data
            this.setNewsList(res.data)
          }
        })
      },
      bgStyle(item) {
        return `background-image:url(${item.large_image_url})`
      },
      getDesc(item) {
        if (item.label_style) {
          return `<span style="display: inline-block;padding:2px;border:1px solid #ffcd32;border-radius:4px;color:#ffcd32;font-size:10px;line-height:1;">${item.label}</span> ${item.source} ${item.comment_count}评论 ${this.getTime(item.behot_time)}分钟前`
        } else if (item.hot === 1) {
          return `<span style="display: inline-block;padding:2px;border:1px solid #ffcd32;border-radius:4px;color:#ffcd32;font-size:10px;line-height:1;">热</span> ${item.source} ${item.comment_count}评论 ${this.getTime(item.behot_time)}分钟前`
        } else {
          return `${item.source} ${item.comment_count}评论 ${this.getTime(item.publish_time)}分钟前`
        }
      },
      getTime(date) {
        let now = new Date().getTime()
        let nTime = now - date
        return Math.floor(nTime % 86400 % 3600 / 60)
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      ...mapMutations({
        setNewsList: 'SET_NEWS_LIST'
      })
    },
    watch: {
      data() {
        setTimeout(() => {
          this.$refs.newsList.refresh()
        })
      }
    },
    components: {
      Loading,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .news-list
    height: 100%
    overflow: hidden
    .item
      display: flex
      box-sizing: border-box
      align-items: center
      padding: 0 20px 20px 20px
      .item-con
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        font-size: $font-size-medium
        .item-ver
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          .title
            margin-bottom: 10px
            color: $color-text
          .icon
            display flex
            align-items center
            margin-right: -2px
            margin-bottom: 10px
            width: 100%
            .multiple-img
              flex: 1
              width: 33%
              height: 76px
              margin-right: 2px
            .single-img
              flex: 1
              height: 0
              padding-top: 53%
              width: 100%
              transform-origin: top
              background-size: cover
          .video-wrapper
            display: flex
            align-items: center
            margin-bottom: 10px
            position: relative
            justify-content: center
            .video-img
              flex: 1
              height: 0
              padding-top: 53%
              width: 100%
              transform-origin: top
              background-size: cover
            .video-icon
              position: absolute
              top: 50%
              left: 50%
              font-size: 30px
              color: #ffcd32
              transform: translate(-50%,-50%)
            .video-dur
              position: absolute
              right: 5px
              bottom: 5px
              padding: 0 4px
              font-size: 10px
              color: #ffcd32
              border-radius: 4px
              background rgba(0,0,0,.3)
          .desc
            color: $color-text-d
        .item-hor
          display: flex
          flex-direction: row
          align-items: center
          flex: 1
          .icon
            flex: 0 0 116px
            width: 116px
            padding-left: 20px
            order: 1
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
          .mini-video-wrapper
            flex: 0 0 116px
            width: 116px
            padding-left: 20px
            order: 1
            position: relative
            .mini-video-icon
              position: absolute
              top: 50%
              left: 50%
              font-size: 14px
              color: #ffcd32
              transform: translate(-50%,-50%)
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
