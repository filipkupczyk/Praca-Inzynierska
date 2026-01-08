<template>
    <div class="background">
        <div class="container">
            <div class="d-flex justify-content-center mb-3 mt-5">
                <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
            </div>
            <h1 class="mt-5 mb-5">Twoje Konto</h1>
            <div class="d-flex justify-content-center flex-column flex-lg-row column mt-5">
                <div class="tile rounded-4 shadow">
                    <div
                    class="drop-area"
                    :style="{ backgroundImage: currentBackground }"
                    @dragover.prevent="handleDragOver"
                    @drop.prevent="handleDrop"
                    >
                    </div>
                    <div class="custom">
                        <input ref="fileInput" type="file" @change="handleFileInput"/>
                    </div>
                    <div>
                        <button @click="triggerFileInput" class="btn text-white text-decoration-none bg-primary rounded-4 custom-button mt-3">Wybierz zdjęcie</button>
                    </div>
                </div>
                <div class="tile-text rounded-4 shadow">
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="exampleInputName1" class="form-label">Zmień imie</label>
                            <input type="text" class="form-control" id="exampleInputName1" v-model="firstName" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputSurname1" class="form-label">Zmień nazwisko</label>
                            <input type="text" class="form-control" v-model="lastName" id="exampleInputSurname1">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Zmień e-mail</label>
                            <input type="email" class="form-control" v-model="email" id="exampleInputEmail1">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Zmień hasło</label>
                            <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
                        </div>
                        <div class="mb-3" v-if="error" style="color: red;">{{ errorP }}</div>
                        <div style="text-align: center;">
                            <button type="submit" class="btn text-white text-decoration-none bg-primary rounded-4 custom-button">Zatwierdź zmiany</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import defaultImage from '@/images/user.png';

    let firstName = ref('');
    let lastName = ref('');
    let email = ref('');
    let password = ref('');
    let user = ref([]);
    let error = ref(0);
    let errorP = ref('');
    let image = ref('');
    const imageUrl = ref('');
    const defaultBackground = ref(`url(${defaultImage})`);
    const currentBackground = ref(defaultBackground);
    const fileInput = ref(null);
    
    function triggerFileInput(){
        fileInput.value.click();
    }

    const handleDragOver = (event) => {
  event.dataTransfer.dropEffect = 'copy';
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  handleFile(file);
};

const handleFileInput = (event) => {
  const file = event.target.files[0];
  handleFile(file);
};

const handleFile = (file) => {
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = () => {
      image.value = reader.result;
      imageUrl.value = reader.result;
      currentBackground.value = `url(${reader.result})`;
    };
    reader.readAsDataURL(file);
  } else {
    console.error('Invalid file format. Please select an image.');
  }
};
    async function getUser(){
        axios.get('http://localhost:8000/users/myuser').then((res) => {
            user.value = res.data;

            firstName.value = user.value.name;
            lastName.value = user.value.surname;
            email.value = user.value.email;
            password.value = user.value.password;
            image.value = user.value.image;

            checkImage();
        });
    }

        async function handleSubmit(){
            try {
                const response = await axios.put('http://localhost:8000/users/myuser', {
                    name: firstName.value,
                    surname: lastName.value,
                    email: email.value,
                    password: password.value,
                    image: image.value
                })
                window.location.reload();
            }
            catch (err) {
                error.value = err.response.status;
                if (error.value > 400 && error.value < 500){
                    errorP = 'Proszę podać hasło';
                }
            }
        }

        function checkImage() {
            if (user.value.image !== null) {
                currentBackground.value = `url(${user.value.image})`
            }
        }

    getUser();


</script>

<style scoped>
    .background{
        background-color:#D9cAb3;
        min-height: 100vh;
  }

  .custom-button-outline:hover {
    background-color: #A1C349 !important;
  }

  .tile {
    background-color: white;
    padding: 20px;
    height: 100%;
  }

  .tile-text {
    background-color: white;
    padding: 20px;
    height: 500px;
    margin-left: 1vh;
    width: 50vh;
  }

  .custom-button, .custom-button:hover, .custom-button:active, .custom-button:visited {
        background-color: #A1C349 !important;
    }

    .drop-area {
  padding: 20px;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 250px;
  min-width: 250px;
}

.drop-area p {
  margin: 0;
}

.custom {
    display: none;
}
</style>