/**
 * Created by tianzhihong on 2017/7/3.
 */

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
export const navList = state => state.navList

export const currentNew = state => state.currentNew

export const activeIndex = state => state.activeIndex

export const tag = state => state.tag

export const newsDetail = state => state.newsDetail

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
