<template>
    <li>
        <router-link
        :to="`/${index}`"
        class="nav-link"
        active-class="active" 
        aria-currnet="page"
        :title="`This look goes to the ${page.link.text} page`"
        >{{ page.link.text }}</router-link>
    </li>
</template>

<script>
    export default {
        props: ['page', 'index']
    }
</script>