<template>
  <div>
    <div class="section-top">
      <router-link class="link-back" to="/">
        <v-icon size="40px">mdi-arrow-left</v-icon>
      </router-link>

      <div class="buttons-container">
        <v-btn
          @click="loadArticles(ListType.Headlines)"
          :color="currentSearchType === ListType.All ? '#fff' : '#E5E5E5'"
          height="60px"
          large
          :loading="isLoading && currentSearchType === ListType.Headlines"
          >Top Headlines</v-btn
        >

        <v-btn
          @click="loadArticles(ListType.All)"
          :color="currentSearchType === ListType.All ? '#E5E5E5' : '#fff'"
          height="60px"
          large
          :loading="isLoading && currentSearchType === ListType.All"
          >All</v-btn
        >
      </div>
    </div>

    <div class="section-articles">
      <div class="articles-list">
        <v-card
          max-width="344"
          v-for="article of articles"
          :key="article.title"
        >
          <a :href="article.url" target="_blank" rel="noopener noreferrer">
            <v-img :src="getImgUrl(article)" height="200px"></v-img>
            <v-card-subtitle>
              {{ article.source.name }}
            </v-card-subtitle>
            <v-card-title class="body-1">
              {{ article.title | cutText('title') }}
            </v-card-title>
            <v-card-text>
              {{ article.description | cutText('description') }}
            </v-card-text>
          </a>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ListType, Article } from '@/types';
import { mapState } from 'vuex';

@Component({
  computed: { ...mapState(['articles']) },
  filters: {
    cutText: (value: string, type: string): string => {
      if (!value) {
        return '';
      }
      if (type === 'title') {
        return value.length > 120 ? `${value.slice(0, 120)}...` : value;
      }
      return value.length > 180 ? `${value.slice(0, 180)}...` : value;
    }
  }
})
export default class ArticleList extends Vue {
  @Prop()
  sourceName: string;

  ListType = ListType;
  articles: Article[];
  currentSearchType = ListType.Headlines;
  isLoading = false;

  created(): void {
    this.loadArticles(ListType.Headlines);
  }

  getImgUrl(article: Article): string {
    const url =
      article.urlToImage && article.urlToImage !== 'null'
        ? article.urlToImage
        : require('../assets/img_placeholder.png');

    return url;
  }

  async loadArticles(type: ListType): Promise<void> {
    this.currentSearchType = type;
    this.isLoading = true;
    await this.$store.dispatch('loadArticles', {
      source: this.sourceName,
      type
    });
    this.isLoading = false;
  }
}
</script>

<style scoped lang="scss">
.section-top {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff00000a;

  .buttons-container {
    display: flex;
    justify-content: space-between;
    width: 270px;
  }

  .link-back {
    position: absolute;
    top: 5px;
    left: 5px;
    text-decoration: none;
  }
}

.section-articles {
  display: flex;
  justify-content: center;

  .articles-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 60px;
    justify-content: flex-start;
    width: 1480px;

    a {
      text-decoration: none;
      color: #000;
    }

    .v-card {
      margin: 0 20px 30px;
      cursor: pointer;
      width: 330px;
      height: 495px;
    }
  }
}
</style>
