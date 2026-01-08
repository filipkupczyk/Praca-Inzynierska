<template>
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="myOffcanvas" aria-labelledby="offcanvasScrollingLabel">
          <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Mój profil</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body d-flex justify-content-center flex-column flex-lg-row p-4 p-lg-0">
                <ul class="list-group list-group-flush align-items-center justify-items custom-ul">
                    <li class=" custom-li mt-3 mb-3">
                        <img :src="imageUrl" style="height:100px; width:100px; border-radius: 50%;">
                    </li>
                    <li class=" custom-li mb-3">
                        <h1>{{ user.name }} {{ user.surname }}</h1>
                    </li>
                    <li class="list-group-item custom-li">
                        <button @click="goTo('/myposts')" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3" data-bs-dismiss="offcanvas" aria-label="Close">Moje zbiórki</button>
                    </li>
                    <li class="list-group-item custom-li">
                        <button @click="goTo('/edituser')" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3" data-bs-dismiss="offcanvas" aria-label="Close">Edytuj dane</button>
                    </li>
                    <li class="list-group-item custom-li">
                        <button @click="goTo('/payments')" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3" data-bs-dismiss="offcanvas" aria-label="Close">Lista płatności</button>
                    </li>
                    <div class="w-100" v-show="isPrivileged">
                      <li class="list-group-item custom-li" style="border-top: 0; border-left: 0; border-right: 0;">
                        <button @click="goTo('/admin/userlist')" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3" data-bs-dismiss="offcanvas" aria-label="Close">Lista Użytkowników</button>
                      </li>
                      <li class="list-group-item custom-li" style="border-top: 0; border-left: 0; border-right: 0;">
                        <button @click="goTo('/admin/postlist')" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3" data-bs-dismiss="offcanvas" aria-label="Close">Lista Postów</button>
                      </li>
                    </div>
                    <li class="list-group-item-custom custom-li mt-5 mb-5">
                        <button @click="goTo('/create')" class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button mt-3 fs-5" data-bs-dismiss="offcanvas" aria-label="Close">Załóż zbiórkę</button>
                    </li>
                    <li class="custom-li mt-5">
                      <button @click="Logout" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-5" data-bs-dismiss="offcanvas" aria-label="Close"><font-awesome-icon :icon="['fas', 'right-from-bracket']" style="margin-right: 5px;" />Wyloguj</button>
                    </li>
                </ul>
          </div>
      </div>
</template>
<script setup>

    import { useRouter } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import event from '@/utils/Events';
    import axios from 'axios';
    import image from '@/images/user.png';

    let router = useRouter();
    let user = ref([]);
    let token = localStorage.getItem('token');
    let imageUrl = ref('');
    let isPrivileged = ref(false);

    function goTo(url){
        router.push(url);
    }

    function privileged(){
      if (user.value.privileged === true) {
        isPrivileged.value = true;
      }
    }

    function getUser(){
      if(token !== '' && token !== null) {
        axios.get('http://localhost:8000/users/myuser').then((res) => {
            user.value = res.data;

            handleImage();
            privileged();
        })
      }
    }

    function handleImage(){
        if(!user.value.image) {
          imageUrl.value = image;
        }
        else {
          imageUrl.value = user.value.image;
        }
    }
    
    function Logout() {
        localStorage.removeItem('token');
        
        redirect();
    }

    async function redirect() {
        await router.push({ path: '/' });
        window.location.reload();
    }

    onMounted(() => {
      event.on('showProfileNext', (bsOffcanvas) => {
        bsOffcanvas.show();
      });

      getUser();
    })



</script>
<style scoped>

  .custom-button-outline:hover {
    background-color: #A1C349 !important;
  }

  .custom-button-outline-logout {
    background-color: #A1C349 !important;
    width: 100%;
  }

  .custom-li {
    width: 100% !important;
    text-align: center !important;
  }

  .custom-ul {
    width: 100% !important;
  }

  .custom-button, .custom-button:hover, .custom-button:active, .custom-button:visited {
        background-color: #A1C349 !important;
        width: 90% !important;
        height: 5vh !important;
    }



</style>