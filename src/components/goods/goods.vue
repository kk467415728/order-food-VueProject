<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu-list">
        <li v-for="(item, index) in goods" 
          :key="index" 
          class="menu-item"
          :class="{'current': currentIndex === index}"
          @click="selectMenu(index, $event)"
        >
          <span class="name">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]">
            </span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list" ref="foodListHook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li 
              v-for="(food, index) in item.foods" 
              :key="index" class="food-item"
              @click="selectFood(food, $event)"
            >
              <div class="icon">
                <img width="57px" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="new">￥{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old">￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" ></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :select-foods="selectedFoods"
      ref="shopcart"
    ></shopcart>
  </div>
  <food :food = "selectedFood" ref="food"></food>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'
  export default {
    components: {
      shopcart,
      cartcontrol,
      food
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.$http.get('/api/goods').then((res) => {
        const response = res.body
        if(response.errno === 0) {
          this.goods = response.data
          console.log('goods', this.goods)
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          })
        }
      });
      this.classMap = [
        'decrease', 
        'discount',
        'special',
        'invoice',
        'guarantee'
      ]
    },
    computed: {
      currentIndex() {
        for(let i=0; i < this.listHeight.length; i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i  
          }
        }
        return 0
      },
      selectedFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
              this.$store.commit('cart/setSelectFood', { foods : foods } );              
            }
          })
        });
      }
    },
    methods: {
      selectFood(food, $event) {
        if(!event._constructed) {
          return;
        }
        this.selectedFood = food
        this.$refs.food.show();
      },
      selectMenu(index, event) {
        if(!event._constructed){
          return ;
        }
        let foodList = this.$refs.foodListHook
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodListHook
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        font-weight 200
        padding 0 12px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .name
            border none
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            background-image url(decrease_3@2x.png)
          &.discount
            background-image url(discount_3@2x.png)
          &.special
            background-image url(special_3@2x.png)
          &.invoice
            background-image url(invoice_3@2x.png)
          &.guarantee
            background-image url(guarantee_3@2x.png)
        .name
          font-size 12px
          display table-cell
          width 56px
          vertical-align middle
          border-bottom 1px solid rgba(7,17,27,0.1)
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        position relative
        border-bottom 1px solid rgba(7,17,27,0.1)
        &:last-child
          border-bottom none
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc
            font-size 10px
            margin-bottom 8px
            line-height 12px
            color rgb(147,153,159)
          .extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
            .count
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
            right 0
            bottom 12px
            font-size 24px
            line-height 24px
</style>