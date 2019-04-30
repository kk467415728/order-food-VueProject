<template>
  <div v-show="showFlag" class="food" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{ food.name }}</h1>
        <div class="detail">
          <span class="sell-count">月售{{ food.sellCount }}份</span>
          <span class="rating">好评率{{ food.rating }}</span>
        </div>
        <div class="price">
          <span class="new">￥{{ food.price }}</span>
          <span v-show="food.oldPrice" class="old">￥{{ food.price }}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click="addFirst(food, $event)" class="buy" v-show="!food.count || food.count === 0">
          加入购物车
        </div>
      </div>
      <split/>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text" >{{ food.info }}</p>
      </div>
      <split v-show="food.info"/>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect 
          :ratings = "food.ratings"
        ></ratingselect>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'

  import Vue from 'vue'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return{
        showFlag: false,
      }
    },
    methods:{
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if(!this.scroll) {
            this.menuScroll = new BScroll(this.$refs.food, {
              click: true 
            })
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst(event) {
        if(event._contructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      position relative
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        .sell-count, .rating
          font-size 10px
          color rgb(147,153,159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .new
          color rgb(240,20,20)
          margin-right 8px
          font-size 14px
        .old
          text-decoration line-through
          color rgb(147,153,159)
          font-size 10px
      .cartcontrol-wrapper
        position absolute
        bottom 12px
        right 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        font-size 10px
        box-sizing border-box
        border-radius 12px
        background rgb(0,160,220)
        color #fff
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        color rgb(7,17,27)
        font-size 14px
      .text
        font-size 12px
        font-weight 200
        color rgb(77,85,93)
        line-height 24px
        padding 0 8px
    .rating
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        color rgb(7,17,27)
        font-size 14px
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
</style>