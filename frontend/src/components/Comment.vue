<template>
  <div class="wrapper">
    <div class="card" v-bind:style="{ borderLeftColor: border }">
      <div class="header">
        <div class="author">{{ comment.user_name }}</div>
        • {{ comment.createdAt | humaniz }}
        <div class="score">{{ comment.score }}</div>
      </div>
      <div class="title wordwrap">
          {{ comment.text }}
      </div>
      <div class="menu">
        <div :class="{ upvoted: comment.liked }" @click="like">
          <icon class="absolute-center" scale="1.3" name="caret-up"></icon>
        </div>
        <div @click="toggleReply">
          <icon class="absolute-center" scale="1" name="reply"></icon>
        </div>

        <!-- only show the expand buttons if there are kids -->
        <div v-if="comment.ascendents" @click="toggleSubs" class="subs-toggle">
          <icon v-if="showSubs" class="absolute-center" scale="1" name="minus-square"></icon>
          <icon v-else class="absolute-center" scale="1" name="plus-square"></icon>
        </div>
      </div>
      <form v-on:submit.prevent="submitReply">
        <div class="reply" v-if="showReply">
          <input :class="{ error: replyError }" type="text" v-model="reply" placeholder="write a reply">
          <button type="submit">reply</button>
        </div>
      </form>
    </div>
    <div class="sub" v-if="showSubs">
      <comment v-for="id in comment.kids" :key="id" :id="id" :level="level+1"></comment>
    </div>
</div>
</template>

<script>
import { fetchComment, createComment, createLike } from '@/api'
import Comment from '@/components/Comment'
import twas from 'twas'

export default {
  name: "comment",
  props: ['id', 'level'],
  data: () => ({
    comment: {},
    showSubs: true,
    showReply: false,
    reply: '',
    showErrors: false,
    // comments in the same level will have the same border color
    colors: ["#a00043", "#d63e51", "#f56c42", "#fcad62", "#ffe08b", "#e8f698", "#abdea3", "#69c2a6", "#3587bd"]
  }),
  methods: {
    toggleReply() {
      // if not loggin in redirect to login screen
      if(!this.$store.state.user){
        this.$router.push('/login')
        return
      }
      this.showReply = !this.showReply
    },
    toggleSubs(){
      this.showSubs = !this.showSubs
    },
    submitReply: async function() {
      // if not loggin in redirect to login screen
      if(!this.$store.state.user){
        this.$router.push('/login')
        return
      }
      this.showErrors = true
      if(this.replyError){
        return
      }
      
      try {
        await createComment({
          text: this.reply,
          parent: this.id,
          type: 'sub'
        })
            
        this.comment = ''
        // console.log(this.id)
        // update the comments
        this.comment = (await fetchComment(this.id)).data
        this.showErrors = false
      } catch (error) {
        console.log(error)
      }
      
      // finally hide the reply input
      this.showReply = false
      this.reply = ''
    },
    like: async function() {
      // check if the user is logged in
      if(!this.$store.state.user){
        this.$router.push('/login')
        return
      }

      // if already liked just return
      if(this.comment.liked){
        return
      }

      try {
        await createLike({
          type: 'comment',
          cid: this.comment.id
        })
        this.comment.liked = true
        this.comment.score++
      } catch (error) {
        
      }
    }
  },
  computed: {
    border() {
      return this.colors[this.level]
    },
    replyError() {
      return this.showErrors && !this.reply.length
    }
  },
  beforeMount: async function() {
    this.showSubs = this.level < 8
    this.comment = (await fetchComment(this.id)).data
  },
  filters: {
    humaniz (createdAt) {
      return twas((new Date(createdAt)).getTime())
    }
  },
  components: {
    Comment
  }
}
</script>

<style scoped>
.wrapper {
    font-weight: 200;
    font-family: 'Source Sans Pro';
    font-size: 10pt;
    /* padding: 5px; */
    border-top: .1px solid #ffffffa0;
}
.card {
  border-left-width: 3px;
  border-left-style: solid;
}
.sub {
  margin-left: 3px;
}
.header {
    text-align: left;
}
.title {
    color: #fff;
    display: inline;
    margin: 5px;
}
.domain {
    display: inline
}

.footer {
    display: grid;
    grid-template-columns: auto auto;
}
.comments {
    text-align: left;
}
.author {
    font-size: 10pt;
    color: #f06200;
    display: inline-block;
    margin: 5px;
}

.upvote:hover {
    color: #f06200;
}
.upvoted {
    color: #f06200;
}

.score {
  float: right;
  margin: 5px;
}
.title {
  color: black;
}

/* Source: http://snipplr.com/view/10979/css-cross-browser-word-wrap */
.wordwrap { 
   word-wrap: break-word;      /* IE */
}

.menu {
  height: inherit;
  background-color: #e3e3e3;
  text-align: right;
}

.menu div {
  display: inline-block;
  padding: 2px;
  cursor: pointer;
  margin: 0px 10px;
}

.menu div:hover {
  color: #f06200;
}

.error {
  border: 1px solid red;
}
.subs-toggle {
  float: left;
  margin: 5px 0 0 2px !important;
  padding: 0 !important;
  height: fit-content;

}
.reply {
  display: grid;
  grid-template-columns: 90% auto;
  background-color: #e3e3e3ff;
  padding: 2px;
}
/* input, button {
  height: 30px;
  border-radius: 3px;
  background-color: white;
  color: #000;
  border-style: none;
} */
button, input {
  height: 30px;
  color: #000;
  background-color: white;
  border-radius: 3px;
  border-style: none;
  margin: 2px;
}
</style>
