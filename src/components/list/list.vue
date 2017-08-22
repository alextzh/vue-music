<template>
  <transition name="slide">
    <div class="list-container">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="text">List</h1>
      <div class="scroll-wrapper">
        <scroll-list ref="scrollList"
                     :data="items"
                     :scrollbar="scrollbar"
                     :pullDownRefresh="pullDownRefresh"
                     :pullUpLoad="pullUpLoad"
                     @pullingDown="onPullingDown"
                     @pullingUp="onPullingUp"
        ></scroll-list>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import ScrollList from 'base/scroll-list/scroll-list'

  const _data = [
    '我是第 1 行',
    '我是第 2 行',
    '我是第 3 行',
    '我是第 4 行',
    '我是第 5 行',
    '我是第 6 行',
    '我是第 7 行',
    '我是第 8 行',
    '我是第 9 行',
    '我是第 10 行',
    '我是第 11 行',
    '我是第 12 行',
    '我是第 13 行',
    '我是第 14 行',
    '我是第 15 行',
    '我是第 16 行',
    '我是第 17 行',
    '我是第 18 行',
    '我是第 19 行',
    '我是第 20 行'
  ]

  export default{
    data() {
      return {
        items: _data,
        scrollbar: false,
        pullDownRefresh: true,
        pullUpLoad: true,
        y: 300,
        itemIndex: _data.length
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      onPullingDown() {
        this.loading = true
        // 更新数据
        setTimeout(() => {
          this.loading = false
          this.items.unshift('我是新数据: ' + +new Date())
        }, 1000)
      },
      onPullingUp() {
        let newPage = [
          '我是第 ' + ++this.itemIndex + ' 行',
          '我是第 ' + ++this.itemIndex + ' 行',
          '我是第 ' + ++this.itemIndex + ' 行',
          '我是第 ' + ++this.itemIndex + ' 行',
          '我是第 ' + ++this.itemIndex + ' 行'
        ]
        // 更新数据
        setTimeout(() => {
          this.items = this.items.concat(newPage)
        }, 1000)
      }
    },
    components: {
      ScrollList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .list-container
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: #fff
    color: #333
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .text
      display: block
      vertical-align: top
      line-height: 44px
      height: 44px
      font-size: $font-size-large
      width: 100%;
      text-align: center;
    .scroll-wrapper
      position: absolute
      top: 44px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 15px
</style>
