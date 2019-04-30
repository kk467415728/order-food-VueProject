<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span 
        @click="select(2, $event)" 
        class="block positive" 
        :class="{'active':selectType === 2}"
      >{{ desc.all }}<span class="count">{{ratings.length}}</span></span>
      <span 
        @click="select(0, $event)" 
        class="block positive" 
        :class="{'active':selectType === 0}"
      >{{ desc.positive }}<span class="count">{{positives.length}}</span></span>
      <span 
        @click="select(1, $event)" 
        class="block negative" 
        :class="{'active':selectType === 1}"
      >{{ desc.negative }}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <div class="rating-wrapper">
      <ul v-show="ratings && ratings.length">
        <li 
          v-for="(rating, index) in ratings" 
          :key="index" 
          class="rating-item"
          v-show="needShow(rating.rateType, rating.text)"
        >
          <div class="user">
            <span class="name">{{ rating.username }}</span>
            <img :src="rating.avatar" class="avatar" width="12" height="12">
          </div>
          <div class="time">{{ dateFormat }}</div>
          <p class="text">
            <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}">
            </span>{{ rating.text }}
          </p>
        </li>
      </ul>
      <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    data() {
      return {
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    methods:{
      select(type, event) {
        if(!event._constructed) {
          return
        }
        this.selectType = type
      },
      toggleContent(event) {
        if(!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
      },
      needShow(type, text) {
        if(this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      },
      dateFormat() {
        return dayjs(this.ratings.time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratingselect
    .rating-type
      padding 18px
      margin 0 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        font-size 12px
        color rgb(77,85,93)
        &.active
          color #fff
        .count
          margin-left 2px
          font-size 8px
        &.positive
          background rgba(0,160,220,0.2)
          &.active
            background rgb(0,160,220)
        &.negative
          background rgba(77,85,93,0.2)
          &.active
            background rgb(77,85,93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7,17,27,0.1)
      color rgb(147,153,159)
      font-size 0
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        font-size 16px
        margin-right 4px
      .text
        display inline-block
        vertical-align top
        font-size 12px
    .rating-wrapper
      padding 0 18px
      .rating-item
        padding 16px 0
        position relative
        border-bottom 1px solid rgba(7,17,27,0.1)
      .user
        position absolute
        right 0
        top 16px
        line-height 12px
        font-size 0
        .name
          display inline-block
          vertical-align top
          font-size 10px
          color rgb(147,153,159)
          margin-right 6px
        .avatar
          border-radius 50%
      .time
        font-size 10px
        line-height 12px
        color rgb(147,153,159)
        margin-bottom 6px
      .text
        line-height 16px
        font-size 12px
        color rgb(7,17,27)
        .icon-thumb_up, .icon-thumb_down
          margin-right 4px
          line-height 24px
          font-size 12px
        .icon-thumb_up
          color rgb(0,160,220)
        .icon-thumb_down
          color rgb(147,153,159)
      .no-rating
        padding 16px 0
        font-size 12px
        color rgb(147,153,159)
</style>