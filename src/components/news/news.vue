<template>
  <div class="news" ref="news">
    <div class="tab-wrapper">
      <scroll-tab @select="selectItem"></scroll-tab>
    </div>
    <div class="news-content">
      <news-list ref="newsList"></news-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ScrollTab from 'components/scroll-tab/scroll-tab'
  import NewsList from 'base/news-list/news-list'

  export default {
    methods: {
      selectItem() {
        this.$refs.newsList.refresh()
      }
    },
    components: {
      ScrollTab,
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
    .tab-wrapper
      position: relative
      width: 100%
      height: 40px
      overflow: hidden
    .news-content
      position: fixed
      top: 128px
      bottom: 0
      width: 100%
      overflow: hidden
</style>
