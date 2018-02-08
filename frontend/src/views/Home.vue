<template>
<div class="tabs">
    <!-- nav -->
    <div class="nav">
      <div class="pages">
        <div :class="{ active: isActiveTab('top')}" @click="setActive('top')">Top</div>
        <div :class="{ active: isActiveTab('new')}" @click="setActive('new')">New</div>
        <div v-if="isLoggedIn" :class="{ active: isActiveTab('favorites')}" @click="setActive('favorites')">Favorites</div>
      </div>
      <div class="align-right">
        <router-link to="/submit">
          <div class="float-right nav-btn submit">
            <a href="/submit">Submit</a>
          </div>
        </router-link>
      </div>
    </div>

    <!-- content -->
    <div class="content">
        <transition name="fade">
            <topics key="1" class="list" v-if="isActiveTab('top')" tab="top"></topics>
            <topics key="2" class="list" v-if="isActiveTab('new')" tab="new"></topics>
            <topics key="3" class="list" v-if="isActiveTab('favorites')" tab="favorites"></topics>            
        </transition>
    </div>
</div>
</template>

<script>
import Topics from "../components/Topics";

export default {
  data: () => ({}),
  computed: {
    activeTab() {
      return this.$store.state.activeTab;
    },
    isLoggedIn() {
      return this.$store.state.user;
    }
  },
  methods: {
    setActive(val) {
      // if the user tries to reach favorites without loggin, we will redirect him to the loggin page
      if (!this.isLoggedIn && val === "favorites") {
        this.$router.push("/login");
        return;
      }
      this.$store.commit({
        type: 'SET_ACTIVE_TAB',
        activeTab: val
      })
      //update the route
      this.$router.push(`/home/${val}`)
      
      // toggle a new fetch
      this.$store.dispatch({
        type: "FETCH",
        activeTab: val,
      });
    },
    isActiveTab(val) {
      return this.activeTab === val;
    }
  },
  components: {
    Topics
  },
  beforeMount() {
    this.setActive(this.$route.params.tab || 'top');
  }
};
</script>

<style scoped>
.tabs {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1px;
  font-family: "Source Sans Pro";
}


.nav {
  margin: 30px 0px 30px 60px;
  font-size: 9pt;
  color: #444444;
  display: grid;
  grid-template-columns: auto 20%;
}
.pages {
  height: 100%;
  width: 100%;
}
.pages div,
.nav-btn {
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
  transition: all 0.5s ease-in-out;
}
.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.submit {
  width: fit-content;
  background-color: #f06200;
  color: white;
  font-weight: 600;
}
.align-right {
  text-align: right;
}

a,
a:visited {
  text-decoration: none;
  color: inherit;
}

.float-right {
  float: right;
}

@media screen and (max-width: 900px) {
  .tabs {
    width: 95%;
  }
}

@media screen and (max-width: 600px) {
  .nav {
    width: 95%;
    grid-template-columns: auto 30%;
    margin: 30px 0px 30px 32px;
  }
  .pages div, .nav-btn {
    display: block;
  }

}



@media screen and (max-width: 400px) {
  .nav {
    width: 90%;
    grid-template-columns: auto 40%;
  }

}

</style>
