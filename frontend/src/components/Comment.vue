<template>
  <div class="wrapper">
    <div class="upvotes">
        <div class="upvote" :class="{ upvoted: false }">
            <icon class="absolute-center" scale="1.3" name="sort-asc"></icon>
        </div>
        <div class="score">
            {{ comment.score }}
        </div>
    </div>
    <div class="card">
        <div class="header">
            <div class="title">
                    {{ comment.text }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { fetchComment } from '@/api'
export default {
  props: ['id'],
  data: () => ({
    comment: {}
  }),
  beforeMount: async function() {
    this.comment = (await fetchComment(this.id)).data
  }
}
</script>

<style scoped>
.wrapper {
    display: grid;
    width: 100%;
    grid-template-columns: 60px auto;
    /* border-radius: 5px; */
    font-weight: 200;
    font-family: 'Source Sans Pro';
    font-size: 10pt;
}

.header {
    margin-bottom: 10px;
    text-align: left;
}
.title {
    color: #444444;
    display: inline;
    font-size: 16pt;
    font-weight: 600;
    margin-right: 5px;
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
    text-align: right;
}
.author span {
    font-weight: 600;
    color: #e96262;
}
.upvotes {
    text-align: center;
}
.upvote {
    background-color: #ffffff;
    color: #cecece;
    width: 30px;
    height: 34px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.upvote:hover {
    box-shadow: 2px 4px 5px 0px #ececec;
}
.upvoted {
    background-color: #f06200;
    color: #ffffff;
}

.score {
    font-size: 14pt;
    font-weight: 600;
    margin-top: 5px;
}
.title {
  color: white
}

</style>
