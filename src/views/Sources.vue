<template>
  <div>
    <div class="section-search">
      <SearchBar />
    </div>

    <div class="section-list">
      <SourcesList />
    </div>
  </div>
</template>

<script>
import SourcesList from '@/components/SourcesList.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'Home',
  components: {
    SourcesList,
    SearchBar
  }
};
</script>
<style scoped lang="scss">
.section-search,
.section-list {
  display: flex;
  justify-content: center;
}

.section-search {
  height: 200px;
  margin: auto;
  align-items: center;
  background-color: #ff00000a;
}

.section-list {
  padding-top: 50px;
}
</style>
