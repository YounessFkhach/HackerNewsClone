<template>
  <div class="container">
    <h1>Submit</h1>
    <form action="">
      <div>
        <input type="text" name="title" v-model="title" placeholder="title">
      </div>
      <div class="separator">
        <hr>
      </div>
      <div>
        <input type="text" v-model="url" name="url" placeholder="url"> 
      </div>
      <div>Or</div>
      <div>
        <textarea name="comment" cols="30" v-model="comment" rows="10" placeholder="comment"></textarea>
      </div>
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
    comment: '',
  }),
  methods: {
    submit: async function() {
      var res = await createTopic({
        title: this.title,
        url: this.url,
        comment: this.comment,
      })
      this.title = this.url = this.comment = ''
      console.log(res)
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
