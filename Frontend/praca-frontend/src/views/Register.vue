<template>
    <Transition name="fade">
        <div v-show="popup" class="vue-modal">
            <Transition name="drop-in">
                <div v-show="popup" class="vue-modal-inner">
                    <div class="vue-modal-content">
                        <div class="container">
                            <button type="button" @click="exitEvent" class="btn-close btn-right" aria-label="Close"></button>
                            <h2 class="mb-2 fw-bold mt-3">Stwórz konto</h2>
                            <div class="mb-3">
                                <p class="fs-6 line"><span>Wprowadź poniżej swoje dane</span></p>
                            </div>
                            <form @submit.prevent="handleSubmit">
                                <div class="mb-3">
                                    <label for="exampleInputName1" class="form-label">Imie</label>
                                    <input type="text" class="form-control" id="exampleInputName1" v-model="firstName" aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputSurname1" class="form-label">Nazwisko</label>
                                    <input type="text" class="form-control custom-input" v-model="lastName" id="exampleInputSurname1">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">E-mail</label>
                                    <input type="email" class="form-control custom-input" v-model="email" id="exampleInputEmail1">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Hasło</label>
                                    <input type="password" class="form-control custom-input" v-model="password" id="exampleInputPassword1">
                                </div>
                                <div v-if="error" style="color: red;">{{ errorP }}</div>
                                <button type="submit" class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button mt-3 fs-5">Zarejestruj się</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>

    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import event from '@/utils/Events';

    let firstName = ref('');
    let lastName = ref('');
    let email = ref('');
    let password = ref('');
    let popup = ref(false);
    let popupL = ref(false);
    let error = ref(0);
    let errorP = ref('');

    async function handleSubmit() {

      try {
        await axios.post('http://localhost:8000/register', {
            name: firstName.value,
            surname: lastName.value,
            email: email.value,
            password: password.value,
        });

        goToLogin();
      }
      catch (err) {
          error.value = err.response.status;
            if (error.value > 400 && error.value < 500){
              errorP = 'Podany adres email już istnieje';
            }
        }
    }

    function exitEvent(){
        popup.value = false;
  }

  function goToLogin(){
        popup.value = false;
        event.emit('goToLogin', popupL);
  }

  onMounted(() => {
        event.on('showRegisterPopup', (isRegisterPopupVisible) => {
          popup.value = !isRegisterPopupVisible.value;
        });

        event.on('fromLogin', (popupR) => {
          popup.value = !popupR.value;
        })
     });

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

.custom-input {
    height: 5vh !important;
    padding: 10px;
}

.container {
    padding: 0;
}

.vue-modal-content {
  position: relative;
}

.btn-right {
  position: absolute;
  top: 10px; /* Adjust the top position according to your preference */
  right: 10px; /* Adjust the right position according to your preference */
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

</style>