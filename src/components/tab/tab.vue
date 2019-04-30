<template>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display flex
    width 100%
    height 38px
    line-height 40px
    border-bottom 1px solid rgba(7,17,27,0.1)
    border-top 1px solid rgba(7,17,27,0.1)
    .tab-item 
      text-align center
      flex 1
      & > a 
        display block
        font-size 14px
        color rgb(77, 85, 93)
      .active
        color rgb(240, 20, 20) 
      
</style>