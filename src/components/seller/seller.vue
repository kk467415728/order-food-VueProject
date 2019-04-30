<template>
  <div>
    <div class="seller" ref="sellerWrapper">
      <div>
        <div class="seller-content">
          <div class="sellerInfo">
            <h1 class="title">{{ seller.name }}</h1>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="sellCount">月售{{ seller.sellCount }}单</span>
            <div class="collect">
              <i 
                class="icon-favorite"
                @click="handleCollect"
                :class="{'select': collectType}"
              ></i>
              <span class="text">{{ setType }}</span>
            </div>
          </div>
          <div class="overview">
            <div class="overview-item">
              <span class="title">起送价</span>
              <span class="price">{{ seller.minPrice }}<span>元</span></span>
            </div>
            <div class="overview-item">
              <span class="title">商家配送</span>
              <span class="price">{{ seller.deliveryPrice }}<span>元</span></span>
            </div>
            <div class="overview-item">
              <span class="title">平均配送时间</span>
              <span class="price">{{ seller.deliveryTime }}<span>分钟</span></span>
            </div>
          </div>
        </div>
        <split></split>
        <div class="actives">
          <div class="notice">
            <h1 class="title">公告与活动</h1>
            <span class="text">{{ seller.bulletin }}</span>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{ seller.supports[index].description }}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="live">
          <h1 class="title">商家实景</h1>
          <span></span>
        </div>
        <split></split>
        <div class="seller-info">
          <h1 class="title">商家信息</h1>
        </div>
      </div>
    </div>
    <shopcart
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
    ></shopcart>
  </div>
</template>

<script>
  import shopcart from 'components/shopcart/shopcart'
  import star from '../star/star'
  import split from 'components/split/split'
  import BScroll from 'better-scroll'

  export default {
    components:{
      shopcart,
      star,
      split
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        classMap : [
          'decrease', 
          'discount',
          'special',
          'invoice',
          'guarantee'
        ],
        collectType: false
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.sellerWrapper, {
          click: true
        })
      },
      handleCollect() {
        this.collectType = !this.collectType
      }
    },
    created() {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    computed: {
      setType() {
        if(this.collectType) {
          return '已收藏' 
        } else return '未收藏'
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .seller
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .seller-content
      padding 18px
      .sellerInfo
        padding-bottom 18px
        font-size 0
        position relative
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          font-size 14px
          color rgb(7,17,27)
          line-height 28px
          margin-bottom 8px
        .star
          margin-right 8px
          display inline-block
          vertical-align top
        .sellCount
          display inline-block
          vertical-align top
          font-size 10px
          color rgb(77,85,93)
          line-height 15px
        .collect
          position absolute
          top 0
          right 0
          .icon-favorite
            display block
            font-size 24px
            line-height 24px
            padding 4px
            color #ccc
            text-align center
            &.select
              color rgb(240,20,20)
          .text
            font-size 10px
            color rgb(77,85,93)
            line-height 10px
      .overview
        padding-top 18px
        display flex
        .overview-item
          flex 1
          border-right 1px solid rgba(7,17,27,0.1)
          &:last-child
            border-right none
          .title
            display block
            text-align center
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            margin-bottom 4px
          .price
            display block
            font-size 24px
            font-weight 200
            color rgb(7,17,27)
            line-height 24px
            text-align center
            span 
              font-size 10px
              font-weight 200
              color rgb(7,17,27)
              line-height 24px
    .actives
      padding 18px
      .notice
        padding-bottom 16px
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          font-size 14px
          color rgb(7,17,27)
          line-height 28px
          margin-bottom 8px
        .text
          display block
          padding 0 12px
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
          line-height 24px
      .supports
        .support-item
          padding 16px
          font-size 0
          border-bottom 1px solid rgba(7,17,27,0.1)
          &:last-child
            border-bottom none
            padding-bottom 0
          .icon
            display inline-block
            width 16px
            height 16px
            margin-right 6px
            vertical-align top
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              background-image url(decrease_2@2x.png)
            &.discount
              background-image url(discount_2@2x.png)
            &.special
              background-image url(special_2@2x.png)
            &.invoice
              background-image url(invoice_2@2x.png)
            &.guarantee
              background-image url(guarantee_2@2x.png)
          .text
            font-size 12px
            line-height 12px
            font-weight 200 
            color rgb(7,17,27)
            line-height 16px 
    .live
      padding 18px
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 28px
        margin-bottom 8px
    .seller-info
      padding 18px
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 28px
        margin-bottom 8px
</style>