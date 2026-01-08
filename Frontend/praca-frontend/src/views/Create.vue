<template>
    <div class="background">
        <div class="container">
            <div class="d-flex justify-content-center mb-3 mt-5">
                <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
            </div>
            <h1 class="mt-5 mb-5">Utwórz zbiórkę</h1>
            <div class="d-flex justify-content-center flex-column flex-lg-row column mt-5">
                <div class="tile-text rounded-4 shadow">
                  <form @submit.prevent="handleSubmit">
                      <div class="mb-3">
                          <label for="exampleInputName1" class="form-label">Tytuł</label>
                          <input type="text" class="form-control" id="exampleInputName1" v-model="title" aria-describedby="emailHelp">
                      </div>
                      <div class="mb-3">
                          <label for="exampleInputSurname1" class="form-label">Opis</label>
                          <textarea type="text" class="form-control custom-input" v-model="content" id="exampleInputSurname1"></textarea>
                          <div v-if="toShort" style="color: red;">Opis powinien mieć więcej niż 15 słów</div>
                      </div>
                      <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Cel zbiórki</label>
                          <input type="number" class="form-control" v-model="goal" id="exampleInputEmail1">
                      </div>
                      <div class="mb-3" v-if="error"> {{ errorP }}</div>
                      <div style="text-align: center;">
                        <button type="submit" class="btn text-white text-decoration-none bg-primary rounded-4 custom-button">Utwórz zbiórkę
                        </button>
                      </div>
                  </form>
                </div>
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
                        <button @click="triggerFileInput" class="btn text-white text-decoration-none bg-primary rounded-4 custom-button mt-3">
                          Wybierz zdjęcie
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  let title = ref('');
  let content = ref('');
  let goal = ref(0);
  let image = ref(null);
  let router = useRouter();
  let error = ref(0);
  let errorP = ref('');
  const currentBackground = ref('');
  const fileInput = ref(null);
  const imageUrl = ref('');
  let toShort = ref(false);

  async function handleSubmit() {
    const trimmed = content.value.trim();
    const words = trimmed.split(/\s+/);
    if (words.length <= 15){
      toShort.value = true;
    }
    else {
      try {
        axios.post('http://localhost:8000/posts', {
        title: title.value,
        content: content.value,
        goal: goal.value,
        image: image.value
      });
      //redirect();
    }
    catch (err) {
      error.value = err.response.status;
      if (error.value > 400 && error.value < 500){
        errorP = 'Proszę uzupełnić wszystkie pola';
      }
    }
    }
  }

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

  async function redirect() {
        await router.push({ path: '/' });
        window.location.reload();
    }



</script>

<style scoped>

  .custom-button-outline:hover {
    background-color: #A1C349 !important;
  }

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
    margin-left: 1vh;
  }

  .tile-text {
    background-color: white;
    padding: 20px;
    height: 500px;
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
  border: 2px dashed grey;
}

.drop-area p {
  margin: 0;
}

.custom {
    display: none;
}

textarea {
  height: 150px;
}
</style>