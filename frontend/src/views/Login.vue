<template>
    <div class="container">
        <h1>Welcome to Hacker News</h1>
        <img class="logo" src="../assets/logo.png" alt="Hacker News">

        <div class="login-section">
            <h3>Login to submit and interact with the topics</h3>
            <br>
            <button class="fb-btn" @click="login">
                <icon name="facebook-f"></icon> Login w/ Facebook
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { BACKEND_URL } from '@/config/conf'
export default {
  data: () => ({
    
  }),
  methods: {
      login () {
          // location.href = 'https://www.facebook.com/v2.12/dialog/oauth?client_id=530745817303993&&response_type=code&redirect_uri=http://localhost:1337/auth/login'
          location.href = BACKEND_URL + '/auth/signin'
      }
  }
}
</script>

<style scoped>
.container {
    position: absolute;
    top: 10%; left: 30%; right: 30%;
    border-radius: 5px;
    background-color: white;
    text-align:  center;
    box-shadow: 1px 2px 50px 10px #ececec
}

@media screen and (max-width: 768px){
    .container {
        left: 5%; right: 5%;
    }
}

.logo {
    width: 60px;
}

.fb-btn {
    height: 40px;
    padding: 0 40px;
    background-color: #3b5998;
    border: none;
    border-radius: 2px;
    color: white;
    font-weight: 600;
    cursor: pointer;
}
.fa-icon {
    margin: 0 20px 0 0;
}
.login-section {
    margin: 100px 0 50px 0;
}

</style>
