<template>
  <div class="container">
    <transition>
      <topic-card
        :key="topic.id"
        :topic="topic"
        class="separated"></topic-card>  
    
    </transition>
    <div class="comment-input" v-if="isLoggedIn">
      <form v-on:submit.prevent="submitComment">
        <div class="reply" >
          <input :class="{ error: commentError }" type="text" v-model="comment" placeholder="Write a comment">
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
    <div class="comments">
        <div v-if="!topic.descendants">
          No comments yet
        </div>
        <div v-else>
          <comment v-for="id in topic.kids" :key="id" :id="id" :level="0"></comment>
        </div>
    </div>
  </div>
</template>

<script>
import { fetchTopic, createComment } from '@/api'
import TopicCard from '@/components/TopicCard'
import Comment from '@/components/Comment'

export default {
  data: () => ({
   topic: {},
   showErrors: false,
   comment: '',
  }),
  methods: {
    getTopic: async function(id)  {
      // search in top topics
      var res = this.$store.state.topics.top.filter(elem => elem.id === id)
      if(res.length)
        return res[0]
      // if not found in top search in new
      res = this.$store.state.topics.new.filter(elem => elem.id === id)
      if(res.length)
        return res[0]
      // if not found in new search in favorite
      res = this.$store.state.topics.new.filter(elem => elem.id === id)
      if(res.length)
        return res[0]
      // if not found get it from api
      res = (await fetchTopic(id)).data
      return res
    },

    submitComment: async function() {
      // check if the user is logged in
      if(!this.$store.state.user){
        this.$router.push('/login')
        return
      }

      // validate the comment length
      this.showErrors = true
      if(this.commentError){
        return
      }

      try {
        await createComment({
          text: this.comment,
          parent: this.topic.id,
          type: 'sup'
        })
            
        this.comment = ''
        console.log(this.topic.id)
        this.topic = await this.getTopic(this.topic.id)
        this.showErrors = false
      } catch (error) {
        console.log(error)
      }

    }
  },
  computed: {
    commentError() {
      return this.showErrors && !this.comment.length
    },
    isLoggedIn(){
      return this.$store.state.user
    }
  },
  beforeMount: async function () {
    var id = this.$route.params.id
    this.topic = await this.getTopic(id)
    console.log(this.topic)
  },
  components: {
    TopicCard,
    Comment
  }
}
</script>

<style scoped>

.container {
    margin: 80px 20%;
    width: 60%;
    border-radius: 5px;
    /* box-shadow: 1px 2px 50px 10px #ececec */
}

.comments, .comment-input{
  background-color: #fff;
  margin: 20px 0 0 60px;
  box-shadow: 2px 4px 5px 0px #ececec;
  border-radius: 5px;
}


@media screen and (max-width: 768px){
  .container {
    width: 90%;
    margin: 80px 5%;
  }
}

.reply {
  display: grid;
  grid-template-columns: 80% auto;
  background-color: #e3e3e3ff;
  padding: 2px;
  border-radius: 3px;
}

.error {
  border: 1px solid red;
}

button, input {
  height: 30px;
  color: #000;
  background-color: white;
  border-radius: 3px;
  border-style: none;
  margin: 2px;
}

</style>
