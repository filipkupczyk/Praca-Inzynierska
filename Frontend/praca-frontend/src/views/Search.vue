<template>
    <div class="background">
        <div class="container">
            <div class="d-flex justify-content-center mb-3 mt-5">
                <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
            </div>
            <h1 class="mt-5 mb-5">Wyniki wyszukiwania:</h1>
            <div v-if="!filteredData.length" class="text-center">
                <p>Nie znaleziono wyników.</p>
            </div>
            <table v-if="filteredData.length" class="table align-middle mb-0 custom-table">
                <tbody>
                    <tr v-for="collection in filteredData"
                    >
                        <td>
                            <div class="d-flex align-items-center">
                                <img
                                    :src="collection.image"
                                    alt=""
                                    style="width: 150px; max-height: auto;"
                                    class="rounded"
                                    />
                                    <div class="ms-3">
                                        <p class="fw-bold mb-1">{{ collection.title }}</p>
                                    </div>
                            </div>
                        </td>
                        <td class="custom">
                            <p class="fw-normal mb-1"> {{  shortString(collection.content, 15) }}</p>
                        </td>
                        <td>
                            <p class="text">{{ SpacePayment(collection.totalPayments) }} zł </p>
                            <div class="progress">
                                <div class="progress-bar custom-bar d-flex align-items-center" role="progressbar" :style="{ width: `${(collection.totalPayments/collection.goal)*100}%` }" :aria-valuenow="collection.totalPayments" aria-valuemin="0" :aria-valuemax="collection.goal">
                                </div>
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
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    
    import axios from 'axios';
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    const searchData = ref(route.params.data);
    let collections = ref([]);
    let filteredData = ref([]);
    let results = false;

    async function getCollections() {

        axios.get('http://localhost:8000/posts').then((res) => {
        collections.value = res.data;

        Search();
    
        });
    }


    function Search(){

        const query = searchData.value.toLowerCase();

        for(let i = 0; i < collections.value.length; i++){
            if(collections.value[i].title.toString().toLowerCase().includes(query)){
                filteredData.value.push({
                    ...collections.value[i], totalPayments: 
                    collections.value[i].payments.reduce(
                        (total, pay) => total + pay.ammount, 0)
                });
            }
        }

        if(filteredData.value.length > 0){
            results = true;
        }
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

    watch(() => route.params.data, (newValue) => {
        searchData.value = newValue;
        filteredData.value = [];
        Search();
    })

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
    max-width: 450px; 
  }

  .text {
    margin-bottom: 5px;
  }

</style>