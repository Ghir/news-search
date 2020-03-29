<template>
  <div v-if="sources.length">
    <v-text-field v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  clearable
                  solo
                  class="search-field"></v-text-field>

    <v-data-table :headers="headers"
                  :items="currentSources"
                  :search="search"
                  class="elevation-1"
                  hide-default-footer
                  hide-default-header
                  disable-pagination
                  :sort-by="sort">
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th v-for="header of headers"
                :key="header.value"
                @click="sort = header.value">
              {{ header.text }}
            </th>
            <th>Favorite</th>
          </tr>
        </thead>
      </template>

      <template v-slot:item="{ item }">
        <tr @click="navigate(item.id)">
          <td v-for="el of headers"
              :key="el.value">
            {{ item[el.value] | capitalize }}
          </td>
          <td>
            <v-icon @click.stop="toggleFavorite(item)">
              {{ isFavorite(item) ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </td>
        </tr>
      </template>

    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import { Source } from '@/types';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState(['sources', 'favorites', 'showFavorites'])
  },
  filters: {
    capitalize: (value: string): string =>
      value.charAt(0).toUpperCase() + value.slice(1)
  }
})
export default class Sources extends Vue {
  headers: DataTableHeader[] = [
    { value: 'name', text: 'Name', class: 'sortable' },
    { value: 'category', text: 'Category' },
    { value: 'language', text: 'Language' },
    { value: 'country', text: 'Country' }
  ];

  sources: Source[];
  favorites: Source[];
  showFavorites: boolean;
  search = '';
  sort = '';

  get currentSources(): Source[] {
    return this.showFavorites ? this.favorites : this.sources;
  }

  navigate(name: string): void {
    this.$router.push({ name: 'Articles', params: { name } });
  }

  toggleFavorite(source: Source): void {
    this.$store.dispatch('toggleFavorite', source);
  }

  isFavorite(source: Source): boolean {
    return !!this.favorites.find((fav: Source) => fav.id === source.id);
  }
}
</script>

<style scoped lang="scss">
.search-field {
  width: 300px;
}

.v-data-table {
  width: 1300px;
  margin: 40px 0;

  tr {
    cursor: pointer;
    height: 70px;

    td,
    th {
      font-size: 1rem;
    }
  }
}
</style>
