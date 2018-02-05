<template>
<div class="tabs">
    <!-- nav -->
    <div class="nav">
        <div :class="{ active: isActiveTab('top')}" @click="setActive('top')">Top</div>
        <div :class="{ active: isActiveTab('new')}" @click="setActive('new')">New</div>
        <div :class="{ active: isActiveTab('favorites')}" @click="setActive('favorites')">Favorites</div>
        blabla
        <div class="float-right submit">
          <router-link to="/submit">
            <a href="/submit">Submit</a>
          </router-link>
        </div>
    </div>

    <!-- content -->
    <div class="content">
        <transition name="fade">
            <topics key="1" class="list" v-if="isActiveTab('top')" :topics="topTopics"></topics>
            <topics key="2" class="list" v-if="isActiveTab('new')" :topics="newTopics"></topics>
            <!-- <div v-if="isActiveTab('favorites')">favorites</div> -->
        </transition>
    </div>
</div>
</template>

<script>
import Topics from '../components/Topics'

export default {
    data: () => ({

    }),
    computed: {
        topTopics(){
            return this.$store.state.topics.top
        },
        newTopics(){
            return this.$store.state.topics.new
        },
        activeTab(){
            return this.$route.params.tab || 'top'
        }
    },
    methods: {
        setActive(val){
            this.$store.dispatch({
                type: 'FETCH',
                activeTab: val,
                route: this.$route
            })
            this.$router.push({ path: `/home/${val}` })
        },
        isActiveTab(val){
            return this.activeTab === val
        }
    },
    components: {
        Topics
    },
    beforeMount () {
        this.$store.dispatch({
            type: 'FETCH',
            activeTab: this.activeTab,
            route: this.$route
        })
    },
}
</script>

<style scoped>
.tabs {
    width: 60%;
    margin-left: auto; margin-right: auto;
    padding-top: 1px;
    font-family: 'Source Sans Pro';
}

@media screen and (max-width: 768px){
    .tabs {
        width: 90%;
    }
}
.nav {
    margin: 30px 60px;
    font-size: 9pt;
    color: #444444;
}
.nav div {
    display: inline;
    background-color: #ffffff;
    border: 0;
    padding: 10px 25px;
    margin: 0 5px;
    cursor: pointer;
    box-shadow: 1px 2px 5px 0px #ececec;
}

.active {
    background-color: #ececec !important;
    box-shadow: 0 0 0 0 !important;
}

.list {
    transition: all .5s ease-in-out;
}
.fade-enter {
    opacity: 0;
}

.fade-leave-to {
    opacity: 0;
}

.flaot-right {
  float: right;
}
.submit {
  background-color: #ececec;
}

</style>
