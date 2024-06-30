<template>
    <div class="bg-white" v-if="coin">
      <div class="pt-6">
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          
          <!-- Header -->
          <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8" style="display: flex;">
            <img :src="coin.image.small" class="object-cover object-center" style="width: 50px; height: 50px;"/>
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl" style="margin-left: 20px;">
              {{ coin.name }} ({{ coin.symbol.toUpperCase() }}) explorer
            </h1>
          </div>
  
          <!-- Sidebar -->
          <div class="mt-4 lg:row-span-3 lg:mt-0">
            <h2 class="sr-only">Product information</h2>
  
            <!-- Reviews (Placeholder) -->
            <div class="mt-6">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center">
                  <!-- Stars or rating could be added here -->
                </div>
              </div>
            </div>
  
            <!-- Categories -->
            <form class="mt-10">
              <div>
                <h3 class="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                <span v-for="category in coin.categories" :key="category" class="inline-flex items-center rounded-md bg-gray-300 px-2 py-1 text-xs font-medium text-black-400 mr-2 mb-2">
                  {{ category }}
                </span>
              </div>
              <!-- Go to site button -->
              <a :href="cleanUrl(coin.links.homepage)" target="_blank">
                <button type="button" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Go to site
                </button>
              </a>
            </form>
          </div>
  
          <!-- Main Content -->
          <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div class="flex mb-5">
              <!-- Current price -->
              <div class="w-1/2 rounded overflow-hidden shadow-md bg-white">
                <div class="space-y-3 p-6">
                  <h3 class="text-lg font-semibold">Current price</h3>
                  <p class="text-base text-gray-900">{{ formatNumber(coin.market_data.current_price.eur) }}</p>
                </div>
              </div>
  
              <!-- Price change 24h -->
              <div class="w-1/2 ml-6 rounded overflow-hidden shadow-md bg-white">
                <div class="space-y-3 p-6">
                  <h3 class="text-lg font-semibold">Current price change 24h</h3>
                  <span v-if="coin.market_data.price_change_24h <= 0" class="inline-flex items-center rounded-md bg-red-300 px-2 py-1 text-xs font-medium text-black-600">
                    {{ coin.market_data.price_change_24h }}
                  </span>
                  <span v-else-if="coin.market_data.price_change_24h > 0" class="inline-flex items-center rounded-md bg-green-300 px-2 py-1 text-xs font-medium text-black-400">
                    +{{ coin.market_data.price_change_24h }}
                  </span>
                  <span v-else class="inline-flex items-center rounded-md bg-gray-300 px-2 py-1 text-xs font-medium text-black-600">
                    {{ coin.market_data.price_change_24h }}
                  </span>
                </div>
              </div>
            </div>
  
            <div class="flex mb-5">
              <!-- Market Cap -->
              <div class="w-1/2 rounded overflow-hidden shadow-md bg-white">
                <div class="space-y-3 p-6">
                  <h3 class="text-lg font-semibold">Market Cap</h3>
                  <p class="text-base text-gray-900">{{ formatNumber(coin.market_data.market_cap.eur) }}</p>
                </div>
              </div>
  
              <!-- Total Volume -->
              <div class="w-1/2 ml-6 rounded overflow-hidden shadow-md bg-white">
                <div class="space-y-3 p-6">
                  <h3 class="text-lg font-semibold">Total Volume</h3>
                  <p class="text-base text-gray-900">{{ formatNumber(coin.market_data.total_volume.eur) }}</p>
                </div>
              </div>
            </div>
  
            <div class="flex mb-5">
              <!-- Placeholder - You can add more details here -->
              <div class="w-1/2 rounded overflow-hidden shadow-md bg-white">
                <div class="space-y-3 p-6">
                  <h3 class="text-lg font-semibold">Sentiment votes up percentage</h3>
                  <p class="text-base text-gray-900">+{{ coin.sentiment_votes_up_percentage }}%</p>
                </div>
              </div>
  
              <div class="w-1/2 ml-6 rounded overflow-hidden shadow-md bg-white">
                <div class="space-y-3 p-6">
                  <h3 class="text-lg font-semibold">Sentiment votes down percentage</h3>
                  <p class="text-base text-gray-900">-{{ coin.sentiment_votes_down_percentage }}%</p>
                </div>
              </div>
            </div>
  
            <!-- Details -->
            <div class="mt-10">
              <h2 class="text-sm font-medium text-gray-900">Details</h2>
              <div class="mt-4 space-y-6">
                <p class="text-sm text-gray-600" v-html="coin.description.en"></p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute } from "vue-router";
  import { getCoinDetail } from '../api/coins';
  import { ref, onMounted } from 'vue';
  import useCoinsMarkets from "@/use/coinsMarkets";
  
  
  export default {
    setup() {
      const coin = ref(null);
      const route = useRoute();
      const coinsMarkets = useCoinsMarkets();
  
      async function getAPIdata() {
        coin.value = await getCoinDetail(route.params.id);
      }
  
      function cleanUrl(homepage) {
        if (Array.isArray(homepage) && homepage.length > 0) {
          const url = homepage[0];
          return url.replace(/[,\s]+/g, '');
        } else if (typeof homepage === 'string') {
          return homepage.replace(/[,\s]+/g, '');
        } else {
          return ''; 
        }
      }

      onMounted(getAPIdata);
  
      return { coin, cleanUrl, ...coinsMarkets };
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Add scoped styles here */
  </style>
  