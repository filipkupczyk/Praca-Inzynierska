<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top mb-3">
        <div class="container">
            <router-link to="/" class="navbar-brand fs-4" font="bold" href="#">Fundacja im. Janusza G.</router-link>
            <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <Login/>
            <Register/>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header border-bottom">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Fundacja im. Janusza G.</h5>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
                    <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                        <li class="nav-item mx-2">
                            <div class="form-group has-search">
                                <font-awesome-icon icon="fa fa-magnifying-glass" class="form-control-feedback"/>
                                <input @keyup.enter="Search" v-model="searchData" class="form-control me-2 rounded-5" type="text" placeholder="Szukaj...">
                            </div>
                        </li>
                        <div v-if="button">
                            <li class="nav-item mx-2">
                                    <router-link to="/" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Strona Główna</router-link>
                            </li>
                            <li class="nav-item mx-2">
                                <router-link to="/Contact" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">Kontakt</router-link>
                            </li>
                            <li class="nav-item mx-2">
                                <router-link to="/FAQ" class="btn text-decoration-none px-3 py-1 bg-outline-primary rounded-4 custom-button-outline mt-3">FAQ</router-link>
                            </li>
                        </div>
                    </ul>
                    <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3"
                    v-if="token === null || token === ''"
                    >
                        <button @click="showLogin" class="btn text-black text-decoration-none rounded-4">Logowanie</button>
                        <button @click="showRegister" class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button">Rejestracja</button>
                    </div>
                    <div v-else class = "d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3">
                        <router-link to="/create" class ="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button">Załóż zbiókę</router-link>
                        <button @click="emitProfile" @mouseenter="showHoverIcon" @mouseleave="hideHoverIcon" class="btn text-white text-decoration-none bg-primary rounded-circle custom-button">
                            <font-awesome-icon v-if="!hovered" :icon="['far', 'user']" style="color: #ffffff; height: 30px; width: auto;" />
                            <font-awesome-icon v-if="hovered" :icon="['fas', 'user']" style="color: #ffffff; height:30px; width: auto;" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

</template>
<script setup>
    import { ref, onMounted, onBeforeMount, defineEmits } from 'vue';
    import { useRouter } from 'vue-router';
    import event from '@/utils/Events';
    import Login from '@/views/Login.vue';
    import Register from '@/views/Register.vue';

    let router = useRouter();
    let searchData = ref('');
    let token = localStorage.getItem('token');
    let decodedToken = ref([]);
    let button = ref(false);
    const isLoginPopupVisible = ref(false);
    const isRegisterPopupVisible = ref(false);
    let emit = defineEmits(['showProfile']);
    const hovered = ref(false);

    function showHoverIcon(){
        hovered.value = true;
    }

    function hideHoverIcon(){
        hovered.value = false;
    }

    function emitProfile(){
        emit('showProfile');
    }
    
    function showLogin() {
        event.emit('showLoginPopup', isLoginPopupVisible);
    }

    function showRegister() {
        event.emit('showRegisterPopup', isRegisterPopupVisible); 
    }
    
    function Search(){
        if (searchData.value.trim() !== ''){
            router.push({
                name: 'search',
                params: {
                    data: searchData.value,
                },
            });
        }
        else {
            window.alert('Proszę wprowadzić wyszukiwaną fraze!')
        }
        
    }

    function decodeJwt(token) {
        const [header, payload, signature] = token.split('.');

        const decodedHeader = atob(header);
        const decodedPayload = atob(payload);

        const headerData = JSON.parse(decodedHeader);
        const payloadData = JSON.parse(decodedPayload);

        return {
            header: headerData,
            payload: payloadData,
            signature,
        };
    }

    function isTokenExpired(){
        if (token !== '' && token !== null) {
            const currentTime = Math.floor(Date.now() / 1000); 
            decodedToken = decodeJwt(token);

            if (decodedToken.payload.exp < currentTime){
                localStorage.removeItem('token');
                window.alert("Sesja dobiegła końca, zostałeś wylogowany!");
                redirect();
            }
        }
    }

    function redirect(){
        router.push("/");
        window.location.reload();
    }

    function windowWidth(){
        button.value = window.innerWidth <= 991;
    }

    onMounted(() => {
        window.addEventListener('resize', windowWidth);
        windowWidth();
        isTokenExpired();

    })

    onBeforeMount(() => {
        window.removeEventListener('resize', windowWidth);
    })

</script>
<style scoped>
    .custom-button, .custom-button:hover, .custom-button:active, .custom-button:visited {
        background-color: #A1C349 !important;
    }

.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    text-align: center;
    pointer-events: none;
    padding-top: 0.6rem;
    padding-left: 0.5rem;
    color: #aaa;
}

.custom-button-outline:hover {
        background-color: #A1C349 !important;
    }

    
</style>
