<template>
<div id="app">
    <navbar></navbar>
    <transition name="fade">
        <router-view class="push-down"/>
    </transition>
</div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  beforeMount(){
    this.$store.dispatch('GET_USER')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Dosis');
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

#app {
  font-family: 'Dosis','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #959595;
  background-color: #fafafa;
}
body {
    margin: 0;
    padding: 0;
    background-color: #fafafa;
}
.logo {
    text-align: center;
}
.push-down {
    margin-top: 60px;
}

.fade-enter-active, .fade-leave-active{
    transition: all .3s ease;
    opacity: 0
}

.fade-enter, .fade-leave-active{
    opacity: 0;
    transition: all .3s ease;
}
</style>
