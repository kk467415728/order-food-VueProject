<template>
  <div>
  <div class="shopcart">
    <div class="content" @click="toggle">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount > 0}">
          ￥ {{ totalPrice }}
        </div>
        <div class="desc">
          另需配送费 {{ deliveryPrice }} 元
        </div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
           {{ payDesc }}
        </div>
      </div>
    </div>
    <transition name="slide-fade" class="slide">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listCount">
          <ul>
            <li 
              class="food" 
              v-for="(food, index) in selectFoods" 
              :key="index"
            >
              <span class="neme">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.price * food.count }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <div class="list-mask" v-show="listShow" @click="hideList">

  </div>    
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default {
    components: {
      cartcontrol
    },
    data() {
      return {
        fold: true
      }
    },
    props:{
      deliveryPrice:{
        type: Number,
        default: 0
      },
      minPrice:{
        type: Number,
        default: 0
      }
    },
    methods: {
      toggle() {
        if(!this.totalCount) {
          return;
        }
        this.fold = !this.fold
      },
      empty() {
        this.$store.state.cart.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList() {
        this.fold = true
      },
      pay() {
        if (this.totalPrice < this.minPrice){
          return
        }
        window.alert('支付'+ this.totalPrice)
      }
    },
    computed: {
      listShow() {
        if(!this.totalCount) {
          this.fold = true
          return false;
        }
        let show = !this.fold;
        if(show) {
          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.listCount, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show
      },
      ...mapState({
        foodDom: state => state.cart.foodDom, 
        selectFoods: state => state.cart.selectFoods, 
      }),
      totalPrice() {
        console.log(this.$store.state.cart.selectFoods, 1212)
        let total = 0;
        this.$store.state.cart.selectFoods.forEach((food) => {
          total += food.price * food.count;
        })
        return total
      },
      totalCount() {
        let count = 0;
        this.$store.state.cart.selectFoods.forEach((food) => {
          count += food.count;
        })
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice){
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if(this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background rgba(7,17,27,0.6)
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px 
    // .slide-fade-enter-active, .slide-fade-leave-active
    //   transition all .5s
    // .slide-fade-enter
    //   transform translate3d(0,-100%,0)
    // .slide-fade-enter-to
    //   transform translate3d(0,-100%,0)
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255,255,255,0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background rgb(0,160,220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            height 16px
            width 24px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240,20,20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255,255,255,0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          font-size 12px
          line-height 48px
          height 48px
          text-align center
          background #2b333b
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-transition
          transition all 0.4s
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0,160,220)
            transition all 0.4s
    .shopcart-list
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      transform translate3d(0,-100%,0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          float left 
          font-size 14px
          color rgb(7,17,27)
        .empty
          float right 
          font-size 12px
          color rgb(0,160,220)
      .list-content
        padding 0 18px
        max-height 217px
        background #fff
        overflow hidden
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-bottom 1px solid rgba(7,17,27,0.1)
          .name
            line-height 24px
            font-size 14px
            color rgb(7,17,27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240,20,20)
          .cartcontrol-wrapper
            position absolute
            right 0px
            bottom 6px

</style>