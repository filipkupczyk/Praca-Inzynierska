<template>
    <div class="background">
        <div class="container">
            <div class="d-flex justify-content-center mb-3 mt-5">
                <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
            </div>
            <h1 class="mt-5 mb-5">Lista postów</h1>
                <div class="row mb-5">
                    <table class="table align-middle custom-table shadow mb-5">
                        <thead>
                            <tr class="text-center">
                                <th scope="col">#</th>
                                <th scope="col">id</th>
                                <th scope="col">Imie i Nazwisko właściciela</th>
                                <th scope="col">Tytuł</th>
                                <th scope="col">Data założenia</th>
                                <th scope="col">Usuń post</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center" v-for="(collection, index) in collections" :key="index">
                                <th scope="row">{{  index + 1 }}</th>
                                <td>
                                    <p class="fw-normal mb-1">{{ collection.id }}</p>
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{{ getUser(collection.owner_id) }}</p>
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{{ collection.title }}</p>
                                </td>
                                <td>
                                    <p class="fw-normal mb-1">{{ collection.created_at.substring(0, collection.created_at.indexOf('T')) }}</p>
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
    let users = ref([]);


    async function DeletePost(id) {
        axios.delete(`http://localhost:8000/posts/${id}`).then(() => {
            window.location.reload();
        });
    }

    async function getCollections() {

        axios.get('http://localhost:8000/admin/posts ').then((res) => {
        collections.value = res.data;
    
        });
    }

    function getUsers(){
        axios.get("http://localhost:8000/admin/users").then((res) => {
            users.value = res.data;
        })
    }

    function getUser(id){
        for(let i = 0; i < users.value.length; i++){
            if (users.value[i].id === id) {
                return users.value[i].name + " " + users.value[i].surname;
            }
        }
    }

    getCollections();
    getUsers();
    

</script>

<style scoped>

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

</style>