<template>
    <UserLayout>
      <v-main>
        <v-container class="px-0 py-12 background-color-fafafa" fluid>
          
          <v-row class="pb-10 my-0" justify="center" align="center">
            <v-col cols="11">
              <v-card>
                <v-card-title>
                  <div class="playfair-38-700">Artworks Table</div>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    background-color="white"
                    append-icon="mdi-magnify"
                    label="Search"
                    color="#333333"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :loading="!fetched"
                  @current-items="filteredTable"
                  loading-text="Loading... Please wait"
                  sort-by="last_name"
                  :headers="[
                      { text: 'Link', value: 'url', sortable: false, filterable: false },
                      { text: 'Thumbnail', value: 'thumbnail', sortable: false, filterable: false },
                      { text: 'Last Name', value: 'last_name'},
                      { text: 'First Name', value: 'first_name'},
                      { text: 'Title', value: 'title' },
                      { text: 'Type', value: 'type' },
                      { text: 'Medium', value: 'tags' },
                      { text: 'Size', value: 'size' },
                      { text: 'Artist\'s Price', value: 'value' },
                      { text: 'Sale Price', value: 'salePrice' },
                      { text: 'Rent Price', value: 'rentPrice' },
                    ]"
                    :items="gallery"
                    :search="search"
                  >
                    <template v-slot:item.url="{ item }">
                      <a
                        class="mr-2"
                        :href="item.url"
                        target="_blank"
                      >
                        link
                      </a>
                  </template>
                  <template v-slot:item.thumbnail="{ item }">
                    <v-img class="my-1" :src="item.thumbnail" width="100" />
                </template>
                </v-data-table>
                <v-card-actions>
                  <div v-if="fetched">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#333333"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <download-csv
                            style="width: 100%; height: 100%"
                            :class="$vuetify.breakpoint.mobile ? 'raleway-13-600' : 'raleway-16-600'"
                            class="white--text"
                            :fields="['url', 'last_name', 'first_name', 'title', 'type', 'tags', 'size', 'value', 'salePrice', 'rentPrice']"
                            :labels="{
                              url: 'Link',
                              last_name: 'Last Name',
                              first_name: 'First Name',
                              title: 'Title',
                              type: 'Type',
                              tags: 'Medium',
                              size: 'Size',
                              value: 'Artist\'s Price',
                              salePrice: 'Sale Price',
                              rentPrice: ' Rent Price',
                            }"
                            :data="convertToCSV()"
                            :name="'artworks_table_' + getDateStamp() + '.csv'"
                          >
                            To CSV
                          </download-csv>
                        </v-btn>
                      </template>
                      <span>Exports current page</span>
                    </v-tooltip>
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <!-- Scroll to Top -->
          <scroll-to-top />

        </v-container>
      </v-main>
    </UserLayout>
</template>

<script>
import JsonCSV from 'vue-json-csv';

export default {
  components: {
    ScrollToTop: () => import("~/components/ScrollToTop.vue"),
    downloadCsv: JsonCSV
  },
  async created () {
    this.$auth.getMgUsersInRole('artist')
        .then(artists => {
            Promise.all(artists.map(async (artist) => {
                await this.$imgdb.getArtworks(artist.user_id, 'approved')
                    .then(found => {
                        if (found.total_count> 0) {
                            found.resources.forEach(resource => {
                              var title = '';
                              var value = '';
                              var salePrice = '';
                              var rentPrice = '';
                              var size = '';
                              var type = '';
                              var tags = resource.hasOwnProperty('tags') ? resource.tags : [];
                              if (resource.hasOwnProperty('context')) {
                                // Title
                                if (resource.context.hasOwnProperty('caption')) {
                                  title = resource.context.caption;
                                  title = title.toLowerCase();
                                }
                                // Value
                                if (resource.context.hasOwnProperty('value')) {
                                  value = resource.context.value
                                }
                                // Sale Price
                                if (resource.context.hasOwnProperty('sale_price')) {
                                  salePrice = resource.context.sale_price
                                }
                                // Rent Price
                                if (resource.context.hasOwnProperty('rent_price')) {
                                  rentPrice = resource.context.rent_price
                                }
                                if (resource.context.hasOwnProperty('type')) {
                                  type = resource.context.type;
                                  if (type.toLowerCase() === 'sculpture') {
                                    // it's a sculpture
                                    if (resource.context.hasOwnProperty('dimension') &&
                                        resource.context.hasOwnProperty('height') &&
                                        resource.context.hasOwnProperty('width') &&
                                        resource.context.hasOwnProperty('depth')) {
                                      size = resource.context.height + ' x ' + resource.context.width + ' x ' +
                                        resource.context.depth + ' ' + resource.context.dimension
                                    }
                                  } else if (
                                      type.toLowerCase() === 'painting' ||
                                      type.toLowerCase() === 'drawing' ||
                                      type.toLowerCase() === 'photography' ||
                                      type.toLowerCase() === 'digital'
                                    ) {
                                    // it's a painting/drawing/photography/digital
                                    if (resource.context.hasOwnProperty('dimension') &&
                                        resource.context.hasOwnProperty('height') &&
                                        resource.context.hasOwnProperty('width')) {
                                      size = resource.context.height + ' x ' + resource.context.width + ' ' +
                                        resource.context.dimension
                                    }
                                  }
                                }
                              }
                              var firstName = '';
                              var lastName = '';
                              if (artist.hasOwnProperty("given_name")) {
                                firstName = artist.given_name;
                              } else {
                                firstName = artist.name.split(" ")[0];
                              }
                              if (artist.hasOwnProperty("family_name")) {
                                lastName = artist.family_name;
                              } else {
                                lastName = artist.name.split(" ")[1];
                              }
                              var tagsStr = ''
                              tags.forEach(element => {
                                tagsStr += element +', ';
                              });
                              tagsStr.slice(0, -2);
                              this.gallery.push({
                                user_id: artist.user_id,
                                first_name: firstName,
                                last_name: lastName,
                                url: resource.secure_url,
                                thumbnail: resource.secure_url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/'),
                                title: title.replace(/(^\w{1})|(\s+\w{1})/g, match => match.toUpperCase()),
                                type: type.replace(/(^\w{1})|(\s+\w{1})/g, match => match.toUpperCase()),
                                value: value,
                                salePrice: salePrice,
                                rentPrice: rentPrice,
                                size: size,
                                tags: tagsStr.replace(/(^\w{1})|(\s+\w{1})/g, match => match.toUpperCase())
                              });
                            });
                        }
                    }).catch(err => console.error(err))
                    .finally(() => this.fetched = true)
            }))
        }).catch(() => this.fetched = true)
  },
  data () {
    return {
      fetched: false,
      gallery: [],
      filteredData: '',
      search: '',
    }
  },
  methods: {
    filteredTable (value) {
      this.filteredData = JSON.stringify(value);
    },
    convertToCSV () {
      var convertedFilteredData = [];
      JSON.parse(this.filteredData).forEach((element, i) => {
        convertedFilteredData.push(element);
        convertedFilteredData[i].url = "=HYPERLINK(\"" + convertedFilteredData[i].url + "\", \"clickme\")"
      });
      return convertedFilteredData;
    },
    getDateStamp () {
      const now = new Date();
      var year = now.getFullYear();
      var day = new Date().getDate();
      var month = (parseInt(new Date().getMonth()) + 1).toString();
      return year + month + day;
    }
  },
  metaInfo() {
    return {
      titleTemplate: 'Artworks list',
      meta: [{ name: "description", content: "Admin Application" }],
    };
  },
}
</script>