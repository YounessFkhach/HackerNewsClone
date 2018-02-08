<template>
  <div class="paginator">
    <!-- <div @click="goLeft"> -->
    <div @click="goLeft" v-if="this.page > 1">
      <icon name="chevron-left"></icon>
    </div>
    <div class="active">{{ page }}</div>
    <!-- <div @click="goRight"> -->
    <div @click="goRight" v-if="this.page < this.max">
      <icon name="chevron-right"></icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['page', 'max'],
  methods: {
    goLeft() {
      if(this.page === 1)
        return
      this.$emit('left')
    },
    goRight() {
      if(this.page === this.max)
        return
      this.$emit('right')
    },
  }
}
</script>

<style>
.paginator {
  text-align: center;
  margin: 10px 0 50px 0;
}

.paginator div {
  display: inline-block;
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
  cursor: auto;
}
</style>
