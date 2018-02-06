<template>
<div class="list">
    <transition name="fade">
        <div class="loader" v-show="loading">
            <icon name="spinner" pulse></icon>
        </div>
    </transition>
    <div>
        <transition-group name="flip-list">
            <topic-card v-for="(topic, index) in topics"
                        :key="topic.id"
                        :topic="topic"
                        :index="index"
                        class="separated"></topic-card>
        </transition-group>
    </div>
</div>
</template>

<script>
import TopicCard from './TopicCard'

export default {
    data: ()=>({
        showTopic: false
    }),
    props: ['topics'],
    computed: {
        loading () {
            return this.$store.state.fetching
        }
    },
    methods: {
        toggleTopic (topic) {
            console.log("topic toggled")
            this.showTopic = !this.showTopic;
        }
    },
    components: {
        TopicCard
    }
}
</script>

<style>
.separated {
    margin: 15px auto;
}
.loader {
    text-align: center;
    animation: all .3s ease-in-out;
}
.slide {
    transition: translateY(-10px);
    opacity: 0;
    /* height: 0px; */
}
.flip-list-move {
  transition: transform 1s;
}


</style>
