<template>
<div class="wrapper">
    <div class="upvotes">
        <div class="upvote" :class="{ upvoted: index%2 == 0 }">
            <icon class="absolute-center" scale="1.3" name="sort-asc"></icon>
        </div>
        <div class="score">
            {{ topic.score }}
        </div>
    </div>
    <div class="card" @click="clicked">
        <div class="header">
            <div class="title">
                <a @click.prevent="open(topic.url, $event)" :href="topic.url" target="_blank">
                    {{ topic.title }}
                </a>
            </div>
            <div class="domain" v-if="topic.url">
                {{ topic.url | domainiz }}
            </div>
        </div>
        <div class="footer">
            <div class="comments">
                {{ topic.descendants | commentiz }}
            </div>
            <div class="author">
                submited by <span>{{ topic.by }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data: () => ({

    }),
    props: ['topic', 'index'],
    filters: {
        domainiz (url) {
            return url.split('/')[2].replace('www.', '')
        },
        commentiz (num) {
            return num + ( num != 1 ? " comments" : " comment" )
        }
    },
    methods: {
        clicked () {
            this.$emit('clicked')
        },
        open (url, e) {
            window.open(url, '_blank');
            e.stopPropagation()
        }
    },
    mounted(){
    }
};
</script>

<style scoped>

.wrapper {
    display: grid;
    grid-template-columns: 60px auto;
    /* border-radius: 5px; */
    font-weight: 200;
    font-family: 'Source Sans Pro';
    font-size: 10pt;
}

.card {
    min-height: 30px;
    border-radius: 1px;
    background-color: white;
    padding: 30px;
    box-shadow: 2px 4px 5px 0px #ececec;
    color: #bcbcbc;
    /* cursor: pointer; */
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
a {
    text-decoration: none;
    color: inherit
}
a:visited {
    color: #949494;
}
a:hover {
    color: black;
}

</style>


