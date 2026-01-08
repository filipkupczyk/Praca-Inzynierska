<template>
    <Transition name="fade">
        <div v-show="popup" class="vue-modal">
            <Transition name="drop-in">
                <div v-show="popup" class="vue-modal-inner">
                    <div class="vue-modal-content">
                        <div class="container">
                            <button type="button" @click="exitEvent" class="btn-close btn-right" aria-label="Close"></button>
                            <h2 class="mb-2 fw-bold mt-3">Zaloguj się lub stwórz konto</h2>
                            <p class="mb-5">Zaloguj się korzystając z poniższych serwisów</p>
                            <button class="btn btn-outline-secondary custom-button-social fw-bold mb-1"><font-awesome-icon :icon="['fab', 'google']" style="color: #000000; float: left; margin-top: 4px" />Użyj konta Google</button>
                            <button class="btn btn-outline-secondary custom-button-social fw-bold mb-1"><font-awesome-icon :icon="['fab', 'apple']" style="color: #000000; float: left; margin-top: 4px" />Użyj konta Apple</button>
                            <button class="btn btn-outline-secondary custom-button-social-fb fw-bold mb-5" id="facebookButton"><font-awesome-icon class="facebookIcon" :icon="['fab', 'facebook-f']" style="float: left; margin-top: 4px"/>Użyj konta Facebook</button>
                            <div class="mb-3">
                                <p class="fs-6 line"><span>zarejestruj się tutaj</span></p>
                            </div>
                            <button @click="enterRegister" class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button mb-3 fs-5">Zarejestruj się</button>
                            <div class="mb-3">
                                <p class="fs-6 line"><span>lub zaloguj się przy pomocy adresu email</span></p>
                            </div>
                            <form @submit.prevent="chandleSubmit">
                                <div class="mb-1">
                                    <input type="email" class="form-control custom-input" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Wprowadź adres email">
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control custom-input" v-model="password" id="exampleInputPassword1" placeholder="Wprowadź hasło">
                                </div>
                                <div v-if="error" style="color: red;">{{ errorP }}</div>
                                <button type="submit" class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button mt-3 fs-5">Zaloguj się</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
    <Register/>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import event from '@/utils/Events';

    let email = ref('');
    let password = ref('');
    const formData = new URLSearchParams();
    let router = useRouter();
    let popup = ref(false);
    let popupR = ref(false);
    let error = ref(0);
    let errorP = ref('');

    function exitEvent(){
        popup.value = false;
    }

    function enterRegister(){
        popup.value = false;
        event.emit('fromLogin', popupR);
    }

    async function chandleSubmit(){
        
        try {
            formData.append('username',email.value);
            formData.append('password',password.value);

            const response = await axios.post('http://localhost:8000/login', formData);
            localStorage.setItem('token', response.data.access_token);
            popup.value = false;
            redirect();
        }
        catch (err) {
            error.value = err.response.status;
            if (error.value > 400 && error.value < 500){
                errorP = 'Podano zły email lub hasło';
            }
        }
        
    }

    async function redirect() {
        await router.push({ path: '/' });
        window.location.reload();
    }

    onMounted(() => {
        event.on('showLoginPopup', (isLoginPopupVisible) => {
            popup.value = !isLoginPopupVisible.value;
        });

        event.on('goToLogin', (popupL) => {
            popup.value = !popupL.value;
        });
    })


</script>

<style scoped>

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.vue-modal-inner {
  max-width: 500px;
  margin: 10rem auto;
}

.vue-modal-content {
  position: relative;
  background-color: #fff;
  border-radius: 0.7rem;
  padding: 1rem;
}

.custom-button, .custom-button:hover, .custom-button:active, .custom-button:visited {
        background-color: #A1C349 !important;
        width: 100% !important;
        height: 5vh !important;
    }
.custom-button-social:hover, .custom-button-social:active {
    background-color: #A1C349 !important;
    color: black !important;
}

.custom-button-social {
    color: black !important;
    width: 100% !important;
    height: 5vh !important;
    border-color: rgb(190, 189, 189) !important;
}

.custom-input {
    height: 5vh !important;
    padding: 10px;
}

.custom-button-social-fb:hover, .custom-button-social-fb:active {
    background-color: #4267B2 !important;
    width: 100% !important;
    height: 5vh !important;
    color: white !important;
}

.custom-button-social-fb {
    width: 100% !important;
    height: 5vh !important;
    color: black !important;
    border-color: rgb(190, 189, 189) !important;
}

.line {
   width: 100% !important; 
   text-align: center !important; 
   border-bottom: 1px solid #000; 
   line-height: 0.1em !important;
   margin: 10px 0 20px !important; 
} 

.line { 
    background:#fff !important; 
    padding:0 10px !important; 
}
span { 
    background:#fff !important; 
    padding:0 10px !important;
    font-size: 14px;
}

p {
    font-size: 14px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active, .drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from, .drop-in-leave-to {
  opacity: 0;
  transform: translate(0, -50px);
}

.container {
    padding: 0 !important;
}

.vue-modal-content {
  position: relative;
}

.btn-right {
  position: absolute;
  top: 10px;
  right: 10px;
}

#facebookButton .facebook-icon {
    color: #000000;
    transition: color 0.3s;
}

#facebookButton:hover .facebook-icon {
    color: white;
}


</style>