<template>
  <ArticleList :sourceName="name" />
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'

export default {
  name: 'Articles',
  components: {
    ArticleList
  },
  props: ['name']
}
</script>
