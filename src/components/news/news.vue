<template>
  <div class="news" ref="news">
    <div class="nav-wrapper" v-if="navList.length">
      <div class="nav-content">
        <nav-slider rel="navSlider">
          <div v-for="(nav,index) in navList" :key="index" @click="slectItem(nav, index)" class="nav-item" :class="activeIndex === index ? 'active' : ''">{{nav.name}}</div>
        </nav-slider>
      </div>
    </div>
    <news-list ref="newsList"></news-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import NavSlider from 'base/nav-slider/nav-slider'
  import NewsList from 'base/news-list/news-list'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'navList',
        'activeIndex'
      ])
    },
    methods: {
      slectItem(item, index) {
        this.setTag(item.tag)
        this.setActiveIndex(index)
        this.$refs.newsList.refresh()
      },
      ...mapMutations({
        setActiveIndex: 'SET_ACTIVE_INDEX',
        setTag: 'SET_TAG'
      })
    },
    components: {
      NavSlider,
      NewsList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .news
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .nav-wrapper
      position: relative
      width: 100%
      height: 40px
      overflow: hidden
      .nav-content
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
</style>
