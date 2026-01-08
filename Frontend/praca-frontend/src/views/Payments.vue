<template>
    <div class="background">
        <div class="container">
            <div class="d-flex justify-content-center mb-3 mt-5">
                <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
            </div>
            <h1 class="mt-5">Historia twojego wsparcia</h1>
            <h5 class="mt-3">Drodzy Darczyńcy</h5>
            <h5 class="mb-5">Chcielibyśmy podziękować Wam gorąco za niezwykłe wsparcie, jakie udzieliliście naszej misji pomocy i dobra. Poniżej znajduje się historia transakcji, która odzwierciedla Waszą hojność i oddanie sprawie.</h5>
            <div class="row mb-5">
                <table class="table align-middle custom-table shadow mb-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Wpłacona ilość</th>
                            <th scope="col">Tytuł zbiórki</th>
                            <th scope="col">Data</th>
                            <th scope="col">Więcej</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(payment, index) in payments" :key="index">
                            <th scope="row">{{  index + 1 }}</th>
                            <td>
                                <p class="fw-normal mb-1">{{ payment.ammount }}</p>
                            </td>
                            <td>
                                <p class="fw-normal mb-1">{{ getPostTitle(payment.post_id) }}</p>
                            </td>
                            <td>
                                <p class="fw-normal mb-1">{{ payment.created_at.substring(0, payment.created_at.indexOf('T')) }}</p>
                            </td>
                            <td>
                                <router-link
                                        :to="{  
                                            name: 'collection',
                                            params: {
                                                id: getPostId(payment.post_id)
                                            }
                                        }"
                                        class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button">Więcej</router-link>
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
    let payments = ref([]);
    let user = ref([]);
    let id = ref(0);
    let userCollections = ref([]);

    async function getCollections(){
        axios.get('http://localhost:8000/posts ').then((res) => {
            collections.value = res.data;

            getUserCollections();
        });
    }

    async function getUser(){
        axios.get('http://localhost:8000/users/myuser').then((res) => {
            
            user.value = res.data;
            id.value = user.value.id;
        });
    }

    async function getUserCollections(){
        for(let i = 0; i < collections.value.length; i++){
            if (collections.value[i].owner_id === id.value){
                userCollections.value.push(collections.value[i]);
            }
        }

        payments.value = userCollections.value.flatMap(collection => collection.payments);
    }

    function getPostTitle(id){
        const post = collections.value.find((post) => post.id === id);
        return post.title;
    }

    function getPostId(id){
        const post = collections.value.find((post) => post.id === id);
        return post.id;
    }

    getCollections();
    getUser();


</script>

<style scoped>

    .custom-button-outline:hover {
        background-color: #A1C349 !important;
    }

    .background{
        background-color:#D9cAb3;
        min-height: 100vh;
    }
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

</style>