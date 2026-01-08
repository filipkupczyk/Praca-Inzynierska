<template>
    <div class="background">
        <div class="container">
            <div class="d-flex justify-content-center mb-3 mt-5">
                <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
            </div>
            <h1 class="mt-5">Moje zbiórki</h1>
            <h5 class="mt-3">Witajcie w sekcji "Moje Zbiórki"!</h5>
            <h5 class="mb-5">To miejsce pełne serca, gdzie możecie śledzić i zarządzać wszystkimi zbiórkami charytatywnymi, które zainicjowałeś. Każda zbiórka to krok w stronę wspierania ważnych spraw i współtworzenia pozytywnych zmian wokół nas.</h5>
            <div class="row mb-5">
                <table class="table align-middle mb-0 custom-table mb-5 shadow">
                <tbody>
                    <tr v-for="(collection, index) in collections" :key="collection.id"
                    >
                        <td>
                            <div class="d-flex align-items-center">
                                <img
                                    :src="collection.image"
                                    alt=""
                                    style="max-width: 150px; max-height: auto"
                                    class="rounded"
                                    />
                                    <div class="ms-3">
                                        <p class="fw-bold mb-1">{{ collection.title }}</p>
                                    </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal custom"> {{  shortString(collection.content, 15) }}</p>
                        </td>
                        <td>
                            <p class="text">{{ SpacePayment(collection.payments.reduce((total, payment) => total + payment.ammount, 0)) }} zł </p>
                            <div class="progress">
                                <div class="progress-bar custom-bar d-flex align-items-center" role="progressbar" :style="{ width: `${(collection.payments.reduce((total, payment) => total + payment.ammount, 0)/collection.goal)*100}%`}" :aria-valuenow="collection.payments.reduce((total, payment) => total + payment.ammount, 0)" aria-valuemin="0" :aria-valuemax="collection.goal "></div>
                            </div> 
                        </td>
                        <td>
                            <div class="d-flex justify-content-center">
                                <router-link
                                    :to="{  
                                        name: 'collection',
                                        params: {
                                            id: collection.id
                                        }
                                    }"
                                    class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button">Więcej</router-link>
                                <router-link 
                                    :to="{  
                                        name: 'edit',
                                        params: {
                                            id: collection.id,
                                        }
                                    }" 
                                    class ="btn text-white text-decoration-none px-3 py-1 mx-2 bg-primary rounded-4 custom-button">Edytuj</router-link>
                                <button @click="DeletePost(collection.id)" class ="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button">Usuń</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>
<script setup>

    import axios from 'axios';
    import { ref } from 'vue';
    
    let collections = ref([]);


    async function DeletePost(id) {
        axios.delete(`http://localhost:8000/posts/${id}`).then(() => {
            window.location.reload();
        });
    }

    async function getCollections() {

        axios.get('http://localhost:8000/users/myuser/myposts ').then((res) => {
        collections.value = res.data;
    
        });
    }

    function shortString(content, maxWords) {

        const words = content.split(" ");
        const shortedText = words.slice(0, maxWords).join(" ") + "...";

        return shortedText;

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
  .custom-table {
        border-radius: 10px;
        overflow: hidden;
    }
    .custom-table td, th {
        border-top-width: 0;
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

  .background{
    background-color:#D9cAb3;
    min-height: 100vh;
  }

  .custom {
    max-width: 300px; 
  }

  .text {
    margin-bottom: 5px;
  }

</style>