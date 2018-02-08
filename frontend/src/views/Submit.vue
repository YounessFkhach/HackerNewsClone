<template>
  <div v-if="loading" class="loading">
    <div v-if="!sent">
      <h3>Submiting</h3>
      <icon name="refresh" spin scale="2"></icon>
    </div>
    <div v-else>
      <h3>Submited</h3>
      <icon name="check" scale="2"></icon>
    </div>
    <br>
    <router-link to="/">
      <div class="btn">Go Home</div>
    </router-link>
  </div>
  <div v-else class="container">
    <h1>Submit</h1>
    <form action="">
      <div>
        <input type="text" :class="{ error: titleError }" name="title" v-model="title" placeholder="title">
        <p class="error" v-if="titleError">Please enter a title</p>
      </div>
      <div class="separator">
        <hr>
      </div>
      <div>
        <input type="text" :class="{ error: urlError }" v-model="url" name="url" placeholder="url">
        <p class="error" v-if="urlError">Please enter vaild url</p>
      </div>
      <div>Or</div>
      <div>
        <textarea name="text" cols="30" v-model="text" rows="10" placeholder="comment"></textarea>
      </div>
      <p class="error" v-if="dataError">Please enter a url or a comment</p>
      <input id="submit" type="button" @click="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import { createTopic } from '@/api'
export default {
  data: () => ({
    title: '',
    url: '',
    text: '',
    loading: false,
    sent: false,
    showErrors: false
  }),
  methods: {
    isValid() {
      return !(this.titleError || this.urlError || this.dataError)
    },
    submit: async function() {
      // check if the user is logged in
      if(!this.$store.state.user){
        this.$router.push('/login')
        return
      }

      // form validation
      this.showErrors = true
      if(!this.isValid())
        return

      // start the loading animation
      this.loading = true;

      var res = await createTopic({
        title: this.title,
        url: this.url,
        text: this.text,
      })
      this.title = this.url = this.text = ''
      
      this.sent = true
      // console.log(res)
    }
  },
  computed: {
    titleError(){
      return this.showErrors && !this.title
    },
    dataError(){
      return this.showErrors && !(this.url || this.text)
    },
    urlError(){
      return this.showErrors && this.url && !(this.url.length > 4)
    }
  },
  beforeCreate(){
    if(!this.$store.state.user){
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.container {
    margin: 10% 20%;
    padding: 20px;
    width: 60%;
    border-radius: 5px;
    /* box-shadow: 1px 2px 50px 10px #ececec */
}


input, textarea {
  height: 30px;
  background-color: #fafafa;
  border: 1px solid #959595;
  border-radius: 2px;
  width: 50%;
  margin: 5px 0;
  padding: 5px 10px;
  font-size: medium;
}
.separator {
  width: 50%;
  text-align: center;
  padding: 0 10px;
}

textarea {
  height: 200px;
}

#submit {
  width: fit-content;
}

.loading{
  position: relative;
  margin: 30% 0;
  text-align: center;
}

.btn {
  display: inline-block;
  margin: 50px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 1px 2px 5px 0px #ececec;
}

.error {
  border-color: red;
  color: red;
}

@media screen and (max-width: 768px){
  .container {
    width: 90%;
    margin: 10% 5%;
  }
  input, textarea, form div  {
      width: 90%;
  }
  .separator {
    width: 80%;
  }
}

</style>
