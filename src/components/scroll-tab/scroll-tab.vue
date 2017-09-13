<template>
  <div class="scroll-tab" ref="scrollTab">
    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="tab-item" :class="activeIndex === index ? 'active' : ''" v-for="(item, index) in navList" :key="index" @click="selectItem(item, index)">
        <span class="tab-link">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {mapGetters, mapMutations} from 'vuex'

  const NAVITEMWIDTH = 50

  export default{
    computed: {
      ...mapGetters([
        'navList',
        'activeIndex'
      ])
    },
    mounted() {
      setTimeout(() => {
        this._setScrollTabWidth()
        this._initScroll()
      })
    },
    methods: {
      _setScrollTabWidth() {
        let width = 0
        this.children = this.$refs.scrollWrapper.children
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          child.style.width = NAVITEMWIDTH + 'px'
          width += NAVITEMWIDTH
        }
        this.$refs.scrollWrapper.style.width = width + 'px'
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scrollTab, {
            scrollX: true,
            scrollY: false,
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      selectItem(item, index) {
        this.setTag(item.tag)
        this.setActiveIndex(index)
        this.$emit('select')
      },
      ...mapMutations({
        setTag: 'SET_TAG',
        setActiveIndex: 'SET_ACTIVE_INDEX'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .scroll-tab
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    .scroll-wrapper
      position: relative
      overflow: hidden
      white-space: nowrap
      .tab-item
        float: left
        text-align: center
        line-height: 40px
        .tab-link
          display: block
          color: $color-text-l
          font-size: $font-size-medium-x
        &.active
          .tab-link
            color: $color-theme
</style>
