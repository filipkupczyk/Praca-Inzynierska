<template>
    <div class="background">
        <div class="container">
            <div class="d-flex justify-content-center mb-3 mt-5">
                <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
            </div>
            <h1 class="mt-5 mb-5">Lista użytkowników</h1>
                <div class="row mb-5">
                    <table class="table align-middle custom-table shadow mb-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">id</th>
                                <th scope="col">Imie</th>
                                <th scope="col">Nazwisko</th>
                                <th scope="col">email</th>
                                <th scope="col">zdjęcie</th>
                                <th scope="col">data założenia</th>
                                <th scope="col">czy admin</th>
                                <th scope="col">akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="index">
                                <th scope="row">{{  index + 1 }}</th>
                                <td>
                                    <p class="fw-normal mb-1">{{ user.id }}</p>
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{{ user.name }}</p>
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{{ user.surname }}</p>
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{{ user.email }}</p>
                                </td>
                                <td>
                                    <img class="rounded-4" :src="user.image" style="width:100px; height: 100px;">
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{{ user.created_at.substring(0, user.created_at.indexOf('T')) }}</p>
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{{ user.privileged }}</p>
                                </td>
                                <td>
                                    <button v-if="!user.privileged" @click="DeleteUser(user.id)" class ="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button">Usuń</button>
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

    let users = ref([]);

    function getUsers(){
        axios.get('http://localhost:8000/admin/users').then((res) => {
            users.value = res.data;
        });
    }

    function DeleteUser(id){

        axios.delete(`http://localhost:8000/admin/users/${id}`);

        window.location.reload();
    }

    getUsers();


</script>

<style scoped>

    .background{
        background-color:#D9cAb3;
        min-height: 100vh;
    }

    .custom-button, .custom-button:hover, .custom-button:active, .custom-button:visited {
        background-color: #A1C349 !important;
    }

    .custom-table {
        border-radius: 10px;
        overflow: hidden;
    }
    .custom-table td, th {
        border-top-width: 0;
    }

</style>