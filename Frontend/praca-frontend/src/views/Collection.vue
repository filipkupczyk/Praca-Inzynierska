<template>
  <div class="background">
      <div class="container">
          <div class="d-flex justify-content-center mb-3 mt-5">
              <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
              <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
              <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
          </div>
          <div class="d-flex justify-content-center">
            <div class="row w-100 mb-5 mt-5">
              <div class="col-8">
                <div class="tile-left rounded-4 shadow">
                  <div>
                		<h1 class="float-start mb-5">{{ collection.title }}</h1>
                    <div>
                      <img class="rounded-4" :src="collection.image" style="max-height: 400px; width: auto;">
                    </div>
                  </div>
                </div>
                <div class="tile-left mt-3 rounded-4 mt-3 shadow">
                  <h4 class="mb-3"> {{  collection.title }}</h4>
                  <p> {{ collection.content }}</p>
                </div>
              </div>
              <div ref="scrollTarget" class="col-4 rounded-4">
                <div class="tile-right rounded-4 shadow" v-if="collection.payments">
                  <p v-if="collection.payments.reduce((total, payment) => total + payment.ammount, 0)" class="text-center" style="margin-bottom: 5px;"><span class="custom-goal fw-bold">{{ SpacePayment(collection.payments.reduce((total, payment) => total + payment.ammount, 0)) }}</span> z {{ SpacePayment(collection.goal) }} zł (Cel)</p>
                  <p v-else class="text-center" style="margin-bottom: 5px;"><span class="custom-goal fw-bold"> 0 </span> z {{ SpacePayment(collection.goal) }} zł (Cel)</p>
                  <div class="progress" style="margin: 0 20px">
                    <div class="progress-bar custom-bar"
                      role="progressbar"
                      :style="{ width: `${(collection.payments.reduce((total, payment) => total + payment.ammount, 0) / collection.goal) * 100}%`}"
                      :aria-valuenow="collection.payments.reduce((total, payment) => total + payment.ammount, 0)"
                      aria-valuemin="0"
                      :aria-valuemax="collection.goal"
                    ></div>
                  </div>
                  <div style="font-size: 15px; margin:0 20px;" class="float-start mt-2">
                    <font-awesome-icon :icon="['fas', 'people-group']" style="color: #000000; margin-right: 10px;" />wpłaciło <span class="fw-bold ">{{ howManyPaid(collection.payments) }} osób</span>
                  </div>
                  <form class="mt-5" @submit.prevent="handleSubmit">
                    <div class="mb-3 mt-5" style="margin: 0 20px;">
                      <label for="exampleInputEmail1" class="form-label text-center">Wybierz kwote do wpłacenia</label>
                      <input type="number" class="form-control custom-form w-100" v-model="amount" id="exampleInputEmail1">
                    </div>
                    <button style="margin: 0 20px" type="submit" class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button mt-3 fs-5 mb-3">Wpłać teraz</button>
                  </form>
                </div>
                <div class="tile-right rounded-4 mt-3 shadow">
                  <p class="text-center">Organizator zbiórki</p>
                  <div class="d-flex justify-content-center">
                    <img class="mt-3 mb-3" :src="user.image" style="height:100px; width:100px; border-radius: 50%;">
                  </div>
                  <h4 class="text-center">{{ user.name }} {{ user.surname }}</h4>
                  <div class="d-flex justify-content-center mb-3">
                    <button style="width: 90%;height: 5vh; " class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</button>
                  </div>
                </div>
              </div>
              <div class="w-100"></div>
              <div class="col-12">
                <div class="tile-right rounded-4 shadow mt-3">
                  <h1 class="text-center mb-3">Wpłać teraz</h1>
                  <div class="d-flex justify-content-center">
                    <table class="custom-table">
                      <tr>
                        <td>
                          <div @click="updateAmmount(10)" class="table-tile rounded-4">10 zł</div>
                        </td>
                        <td>
                          <div @click="updateAmmount(20)"  class="table-tile rounded-4">20 zł</div>
                        </td>
                        <td>
                          <div @click="updateAmmount(50)" class="table-tile rounded-4">50 zł</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div @click="updateAmmount(100)" class="table-tile rounded-4">100 zł</div>
                        </td>
                        <td>
                          <div @click="updateAmmount(200)" class="table-tile rounded-4">200 zł</div>
                        </td>
                        <td>
                          <div @click="scrollToElement" class="table-tile rounded-4">Inna</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button @click="handleSubmit" class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button-2 mt-5 fs-5 mb-3">Wpłać teraz</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  let collection = ref([]);
  const id = route.params.id;
  let amount = ref(0);
  let user = ref([]);
  let scrollTarget = ref(null);

  function updateAmmount(value){
    amount.value = value;
  }

  function scrollToElement() {
    if(scrollTarget.value) {
      scrollTarget.value.scrollIntoView({ behavior: 'smooth'});
    }
  }
  
  async function getCollection(){
    axios.get(`http://localhost:8000/posts/${id}`).then((res) => {
      collection.value = res.data;
      
      getUser(collection.value.owner_id);
    });
  }

  async function getUser(id){
    axios.get(`http://localhost:8000/users/${id}`).then((res) => {
      user.value = res.data;
    })
  }

  function handleSubmit(){
    axios.post(`http://localhost:8000/posts/${id}/payment`, {
      ammount: amount.value,
    })

    window.location.reload();
  }

  function SpacePayment(payment){
    let cutpayment = payment.toString();
    if (payment > 1000) {
      return cutpayment.slice(0, -3) + " " + cutpayment.slice(-3);
    }
  }

  function howManyPaid(payments){
    let Ids = new Set();
    for (const payment of payments) {
      Ids.add(payment.user_id);
    }
    return Ids.size;
  }
  
  getCollection();

</script>
<style scoped>

.custom-button-outline:hover {
        background-color: #A1C349 !important;
    }

    .background{
        background-color:#D9cAb3;
        min-height: 100vh;
        flex-wrap: wrap;
    }

    .tile-left {
      padding: 20px;
      background-color: white;
    }
    .tile-right {
      padding: 10px;
      background-color: white;
    }

    .custom-goal {
      color: #87A330;
      font-size: 40px;
    }

    .custom-bar{
      background-color: #87A330 !important;
  }

  .custom-button, .custom-button:hover, .custom-button:active, .custom-button:visited {
        background-color: #A1C349 !important;
        width: 90% !important;
        height: 5vh !important;
    }
    .custom-button-2, .custom-button-2:hover, .custom-button-2:active, .custom-button-2:visited {
        background-color: #A1C349 !important;
        width: 50% !important;
        height: 5vh !important;
    }

    .table-tile {
      border: 1px solid rgb(168, 166, 166);
      padding: 20px;
      margin: 3px;
    }

    .table-tile:hover {
      background-color: #A1C349 !important;
      color: white;
    }

    .custom-table{
      width: 80%;
    }
</style>
