<template>
<div class="nav-container">
    <div class="nav">
        <router-link to="/home">
            <img class="logo" src="../assets/logo.png" alt="HN">
        </router-link>
        <div class="nav-menu">
            <div v-if="!user">
              <router-link to="/login">
                <a href="/login">Login</a>
              </router-link>
            </div>
            <div v-else>
              <router-link to="/profile">
                <a href="/profile">{{ user.first_name }}</a>
              </router-link>
            </div>
            <div v-if="user" @click="logout">
                <a >Logout</a>
              </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    data: () => ({

    }),
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
        fetch () {
            this.$store.dispatch({
                type: 'FETCH',
                activeTab: 'top',
                route: this.$route
            })
        },
        open (url) {
            this.$router.go('/login')
        },
        logout(){
          this.$store.dispatch('LOGOUT')
          this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.nav-container {
    height: 60px;
    position: fixed;
    top: 0; left: 0; right: 0;
    background-color: #ffffff;
    box-shadow: 0px 1px 5px 0px #ececec;
}
.nav {
    margin: 10px 20%;
    display: flex;
    align-items: center;
    justify-content: right;
}

@media screen and (max-width: 768px){
    .nav {
        margin: 10px 5%;
    }
}
.logo {
    height: 40px;
    float: left;
}

.nav-menu {
    width: 100%;
    text-align: right;
}

.nav-menu div {
    display: inline-block;
    margin-left:  20px;
    cursor: pointer;
}

a, a:visited{
    text-decoration: none;
    color: inherit;
}
a:hover {
    color: black;
}
</style>
