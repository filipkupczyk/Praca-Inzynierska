<template>
    <div class="background">
        <div class="container">
            <div class="d-flex justify-content-center mb-3 mt-5">
                <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
      .custom-button-outline:hover {
    background-color: #A1C349 !important;
  }

  .background{
    background-color:#D9cAb3;
    min-height: 100vh;
  }
</style>