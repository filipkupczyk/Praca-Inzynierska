<template>

<footer class="bg-white text-center mt-5">
    <div class="container p-4 pb-0">
        <div class="row">
                <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
                <h5 class="text-uppercase mb-4">O Nas</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                </p>
            </div>
            <div class="col-lg-4 col-md-6 mb-4 mb-md-0" style="float:right">
                <h5 class="text-uppercase mb-4 pb-1">Kontakt</h5>
                <ul class="fa-ul">
                    <li class="mb-3">
                        <span class="fa-li ms-5"><font-awesome-icon :icon="['fas', 'house']" /></span><span class="ms-2">Testowa 12/24 Lublin 20-023</span>
                    </li>
                    <li class="mb-3">
                        <span class="fa-li ms-5"><font-awesome-icon :icon="['fas', 'phone']" /></span><span class="ms-2">+48 123 123 123</span>
                    </li>
                    <li class="mb-3">
                        <span class="fa-li ms-5"><font-awesome-icon :icon="['fas', 'envelope']" /></span><span class="ms-2">test.zbiorki@gmail.com</span>
                    </li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase mb-4">FAQ</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Jak się zalogować?</li>
                    <li class="list-group-item">Jak się stworzyć zbiórkę?</li>
                    <li class="list-group-item">Jak wpłacić pieniądze?</li>
                    <li class="list-group-item">Jak strona jest zabezpieczona?</li>
                </ul>
            </div>
        </div>
            
        <div class="row">
            <section class="mb-4">
                <a class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button m-1" href="facebook.com" role="button"
                    ><font-awesome-icon :icon="['fab', 'facebook-f']" style="color: #ffffff;" />
                </a>
                <a class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button m-1" href="twitter.com" role="button"
                    ><font-awesome-icon :icon="['fab', 'twitter']" style="color: #ffffff;" /></a>
                <a class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button m-1" href="google.com" role="button"
                    ><font-awesome-icon :icon="['fab', 'google']" style="color: #ffffff;" /></a>
                <a class="btn text-white text-decoration-none px-3 py-1 bg-primary rounded-4 custom-button m-1" href="instagram.com" role="button"
                    ><font-awesome-icon :icon="['fab', 'instagram']" style="color: #ffffff;" /></a>
            </section>
        </div>
    </div>
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2023 Wszystkie prawa zastrzeżone:
        <a>FundacjaJG.pl</a>
    </div>
</footer>

</template>
<script setup>

</script>
<style scoped>
    .custom-button, .custom-button:hover, .custom-button:active, .custom-button:visited {
        background-color: #A1C349 !important;
    }
</style>