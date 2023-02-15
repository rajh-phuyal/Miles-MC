<template>
  <v-app>  
    <v-main>
      <SideBar />
      <div style="margin-left: 17em">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from './components/sidebar/SideBar.vue';

export default {
  name: 'App',

  components: {
    SideBar,
  },
  data() {
    return { sidebarWidth: '14em', user: { name: 'User' } };
  }
};
</script>

<style>
  #app{
    background-color: #121008;
  }
  .greetingBar{
    font-size: larger;
    text-align: center;
		width: 98%;
		background-color: transparent;
		color: white;
  }
</style>