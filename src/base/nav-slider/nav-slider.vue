<template>
  <div class="nav-slider" ref="navSlider">
    <div class="nav-group" ref="navGroup">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  const NAVITEMWIDTH = 50

  export default {
    name: 'nav',
    data() {
      return {
        currentIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setNavSliderWidth()
        this._initNavSlider()
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.navSlider) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          this._setNavSliderWidth()
          this.refresh()
        }, 60)
      })
    },
    methods: {
      refresh() {
        if (this.navSlider) {
          this.navSlider.refresh()
        }
      },
      _setNavSliderWidth() {
        let width = 0
        this.children = this.$refs.navGroup.children
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          child.style.width = NAVITEMWIDTH + 'px'
          width += NAVITEMWIDTH
        }
        this.$refs.navGroup.style.width = width + 'px'
      },
      _initNavSlider() {
        this.navSlider = new BScroll(this.$refs.navSlider, {
          scrollX: true,
          scrollY: false
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .nav-slider
    min-height: 1px
    .nav-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .nav-item
        float: left
        box-sizing: border-box
        overflow: hidden
        height: 40px
        text-align center
        line-height: 40px
      .active
        color: #ffcd32
</style>
