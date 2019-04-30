<template>
  <div>
    <div class="ratings" ref="ratingWrapper">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="scroe">{{ seller.score }}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周围商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-time">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect :ratings = "ratings"></ratingselect>
      </div>
    </div>
    <shopcart
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      ref="shopcart"
    ></shopcart>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import shopcart from 'components/shopcart/shopcart'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components:{
      star,
      split,
      ratingselect,
      shopcart
    },
    data() {
      return {
        ratings: []
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.ratingWrapper, {
          click: true
        })
      },
    },
    created() {
      this.$http.get('/api/ratings').then((res) => {
        const response = res.body
        if(response.errno === 0) {
          this.ratings = response.data
          console.log('ratings', this.ratings)
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        border-right 1px solid rgba(7,17,27,0.1)
        width 137px
        text-align center
        padding 6px 0
        @media only screen and (max-width 320px)
          flex 0 0 120px
          width 120px 
        .scroe
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255,153,0)
        .title
          margin-bottom 6px
          padding-bottom 6px
          font-size 12px
          color rgb(7,17,27)
        .rank
          padding-bottom 6px
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
          margin-bottom 8px
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            display inline-block
            vertical-align top
            font-size 12px
            line-height 18px
            color rgb(7,17,27)
          .star
            display inline-block
            vertical-align top
            margin 0 12px
          .score
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(255,153,0)
        .delivery-time
          font-size 0
          .title
            font-size 12px
            line-height 18px
            color rgb(7,17,27)
          .delivery
            color rgb(147,153,159)
            font-size 12px
            margin-left 12px
</style>