<template>
  
  <navbar @showProfile="showProfile"></navbar>
  <Profile></Profile>
  <router-view class="mb-5"></router-view>
  <Footer></Footer>

</template>
<script setup>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import Profile from './views/Profile.vue';
  import event from './utils/Events';

  function showProfile(){
    const myOffcanvas = document.getElementById('myOffcanvas'); 
    const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas); 
    event.emit('showProfileNext', bsOffcanvas);
  }




</script>
