<template>
  <div class="search-container">
    <div class="select">
      <v-select
        class="title category-select"
        height="60px"
        loader-height="5"
        v-model="selectedCategory"
        :items="categories"
        label="Category"
        outlined
        background-color="#fff"
      >
        <template v-slot:item="{ item }">
          <div class="select-item">{{ item.text }}</div>
        </template>
      </v-select>
    </div>

    <v-btn
      @click="onSearch()"
      color="#fff"
      height="60px"
      large
      :loading="isLoading"
      >Search</v-btn
    >

    <v-btn
      @click="onToggleFavorites()"
      :color="$store.state.showFavorites ? '#E5E5E5' : '#fff'"
      height="60px"
      large
      >Favorites</v-btn
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Articles extends Vue {
  categories = [
    { text: 'All', value: '' },
    { text: 'Business', value: 'business' },
    { text: 'Entertainment', value: 'entertainment' },
    { text: 'General', value: 'general' },
    { text: 'Health', value: 'health' },
    { text: 'Science', value: 'science' },
    { text: 'Sports', value: 'sports' },
    { text: 'Technology', value: 'technology' }
  ];

  isLoading = false;
  selectedCategory = '';

  async onSearch(): Promise<void> {
    this.isLoading = true;
    await this.$store.dispatch('loadSources', this.selectedCategory);
    this.isLoading = false;
  }

  onToggleFavorites(): void {
    this.$store.dispatch('toggleShowFavorites');
  }
}
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  justify-content: space-between;
  width: 600px;
  height: 61px;
}

.select {
  width: 300px;
}

.select-item {
  font-size: 1.1rem;
  margin: 10px 25px 0 5px;
}
</style>
