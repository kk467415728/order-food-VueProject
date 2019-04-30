<template>
  <div>
    <v-header
      :seller="seller"
    >

    </v-header>

    <v-tab>

    </v-tab>
    
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header.vue'
  import tab from 'components/tab/tab.vue'
  
  export default{
    data() {
      return {
        seller: {},   
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
        // res = res.json();
        const response = res.body
        if(response.errno === 0) {
          this.seller = response.data
          console.log('seller',this.seller)
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
