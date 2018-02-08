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
    <paginator :page="page" :max="totalPages" @left="goLeft" @right="goRight" ></paginator>
</div>
</template>

<script>
import TopicCard from "./TopicCard";
import Paginator from "@/components/Paginator";

export default {
  data: () => ({
    showTopic: false
  }),
  props: ["tab"],
  computed: {
    loading() {
      return this.$store.state.fetching;
    },
    topics() {
      return this.$store.state.topics[this.tab];
    },
    page() {
      return this.$store.state.pages[this.tab].page || 1;
    },
    totalPages() {
      return this.$store.state.pages[this.tab].totalPages;
    }
  },
  methods: {
    update() {
      this.$store.dispatch({
        type: "FETCH",
        activeTab: this.tab,
        page: this.page
      });
      this.$router.push(`/home/${this.tab}/${this.page}`)
    },
    toggleTopic(topic) {
      console.log("topic toggled");
      this.showTopic = !this.showTopic;
    },
    goLeft() {
      this.$store.commit({
        type: "CHANGE_PAGE",
        page: this.page - 1,
        tab: this.tab
      });
      this.update()
    },
    goRight() {
      this.$store.commit({
        type: "CHANGE_PAGE",
        page: parseInt(this.page) + 1,
        tab: this.tab
      });
      this.update()
    }
  },
  beforeMount: async function() {
    this.$store.commit({
      type: "CHANGE_PAGE",
      page: parseInt(this.$route.params.page || this.page),
      tab: this.tab
    })
  },
  components: {
    TopicCard,
    Paginator
  }
};
</script>

<style>
.separated {
  margin: 15px auto;
}
.loader {
  text-align: center;
  animation: all 0.1s ease-in-out;
}
.slide {
  animation: all 0.3s ease-in-out;
  transition: translateY(-10px);
  opacity: 1;
  /* height: 0px; */
}
.flip-list-move {
  transition: transform 1s;
}
</style>
