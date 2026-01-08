<template>
  <div class="background">
    <div class="tint">
      <div class="d-flex align-items-center mb-3">
        <img src="@/images/background.jpg" style="width: 50%; height: 100%;">
            <h1 class="fw-bold ms-3">Każdy gest ma znaczenie: Wsparcie dla tych, którzy tego potrzebują.</h1>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center mb-3">
        <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
        <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
        <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12"
          v-for="collection in displayCollections"
          :key="collection.id"
        >
          <div class="card mb-5 shadow rounded-4"
          style="max-height: 550px;"
          >
          <div class="rounded-image">
            <img :src="collection.image" class="img-fluid rounded-4"
            style="width: auto; max-height: 400px"
            />
            <div class="sharp-edge"></div>
          </div>  
            <div class="card-body">
              <div class="card-title">
                <h2> {{ collection.title }}</h2>
              </div>
              <div class="card-text">
                <p> {{ collection.content }}</p>
              </div>
              <h4 v-if="collection.payments.reduce((total, payment) => total + payment.ammount, 0)" class="fw-bold">{{ SpacePayment(collection.payments.reduce((total, payment) => total + payment.ammount, 0)) }} zł</h4>
              <h4 class="fw-bold" v-else>0 zł</h4>
              <div class="progress mb-3">
                <div class="progress-bar custom-bar d-flex align-items-center"
                  role="progressbar"
                  :style="{ width: `${(collection.payments.reduce((total, payment) => total + payment.ammount, 0) / collection.goal) * 100}%` }"
                  :aria-valuenow="collection.payments.reduce((total, payment) => total + payment.ammount, 0)"
                  aria-valuemin="0"
                  :aria-valuemax="collection.goal"
                ></div>
              </div>
              <div class="d-flex justify-content-center">
                <router-link
                :to="{  
                  name: 'collection',
                  params: {
                    id: collection.id
                  }
                }"
                class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button">Więcej</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn text-decoration-none bg-outline-primary rounded-4 custom-button-outline mb-3 w-100"
      type="button"
      v-if="displayCollections.length < collections.length" 
      @click="showNext"
      >Pokaż więcej</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  let collections = ref([]);
  let displayCollections = ref([]);

  async function getCollections() {

    axios.get('http://localhost:8000/posts').then((res) => {
      collections.value = res.data;

      displayCollections.value = collections.value.slice(0, 6);

      ShorterContext();

    });
  }

  function ShorterContext(){
    for(let i = 0; i < displayCollections.value.length; i++){
      displayCollections.value[i].content = shortString(collections.value[i].content, 15);
    }
  }


  function shortString(content, maxWords) {
    
    const words = content.split(" ");
    const shortedText = words.slice(0, maxWords).join(" ") + "...";

    return shortedText;

  }

  function showNext(){
      let firstIndex = displayCollections.value.length;
      let lastIndex = displayCollections.value.length + 3;
      displayCollections.value = [...displayCollections.value, ...collections.value.slice(firstIndex, lastIndex)];
  }

  function SpacePayment(payment){
    let cutpayment = payment.toString();
    if (payment > 1000) {
      return cutpayment.slice(0, -3) + " " + cutpayment.slice(-3);
    }
  }

  getCollections();

</script>
<style scoped>
  .background{
    background-color:#D9cAb3;
    min-height: 100vh;
  }

  .custom-button, .custom-button:hover, .custom-button:active, .custom-button:visited {
        background-color: #A1C349 !important;
    }

  .custom-button-outline:hover {
    background-color: #A1C349 !important;
  }
  
  .custom-bar{
      background-color: #87A330 !important;
  }

  .rounded-image {
    position: relative;
    overflow: hidden;
  }

  .rounded-image img {
    width: 100% !important;
    border-radius: 3% 3% 0 0 !important;
  }

  .sharp-edge::after {
    content: '' !important;
    display: block !important;
    position:absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 10px !important;
    background-color: transparent !important;
  }

  .tint {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.5);
  }

</style>
