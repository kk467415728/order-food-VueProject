<template>
  <div>
    <v-header
      :seller="seller"
    >

    </v-header>

    <v-tab>

    </v-tab>
    
    <keep-alive>
      <router-view :seller="seller" ></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from 'components/header/header.vue'
  import tab from 'components/tab/tab.vue'
  import {urlParse} from '../src/common/js/util.js'
  export default{
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam,1213)
            return queryParam.id
          })()
        },   
      }
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
        // res = res.json();
        const response = res.body
        if(response.errno === 0) {
          this.seller = Object.assign({}, this.seller, response.data)     
          console.log('seller',this.seller.id)
        }
      });
    },
    components:{
      'v-header': header,
      'v-tab': tab
    }
  }
</script>

<style>

</style>
