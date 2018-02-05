<template>
    <div class="container">
        <div class="card">
            <div></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: #00000070;
}
.card {
    position: absolute;
    top: 5%; bottom: 5%; left: 20%; right: 20%;
    border-radius: 5px;
    background-color: white;
}

@media screen and (max-width: 768px){
    .card {
        left: 2%; right: 2%;
    }
}
</style>
