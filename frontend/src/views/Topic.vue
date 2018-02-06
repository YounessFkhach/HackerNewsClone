<template>
  <div class="container">
    <transition>
      <topic-card
        :key="topic.id"
        :topic="topic"
        class="separated"></topic-card>  
    
    </transition>
    <div class="comments">
        <div v-if="!topic.descendants">
          No comments yet
        </div>
        <div v-else>
          <comment v-for="id in topic.kids" :key="id" :id="id"></comment>
        </div>
    </div>
  </div>
</template>

<script>
import { fetchTopic } from '@/api'
import TopicCard from '@/components/TopicCard'
import Comment from '@/components/Comment'

export default {
  data: () => ({
   topic: {}
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

.comments {
  background-color: #444444;
  margin: 20px 0 0 60px;
}


@media screen and (max-width: 768px){
  .container {
    width: 90%;
    margin: 80px 5%;
  }
}

</style>
