<template>
  <div class="flex justify-center mt-4">
    <div class="w-full max-w-4xl">
      <div class="mb-4">
        <input
          v-model="searchQuery"
          @input="filterCoins"
          type="text"
          placeholder="Search..."
          class="w-full p-2 border rounded-lg shadow-sm"
        />
      </div>
      <table class="w-full bg-white border rounded-lg shadow-md">
        <thead style="text-align: left;">
          <tr>
            <th class="py-2 px-4 border-b">Name</th>
            <th class="py-2 px-4 border-b hidden md:table-cell">Price</th>
            <!-- Nascondi su mobile -->
            <th class="py-2 px-4 border-b hidden md:table-cell">Market Cap</th>
            <th class="py-2 px-4 border-b hidden md:table-cell">Total Volume</th>
            <th class="py-2 px-4 border-b cursor-pointer flex items-center hidden md:table-cell" @click="sortByPriceChange">
              Price Change 24h
              <svg v-if="sortDesc" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </th>
            <th class="py-2 px-4 border-b">Info</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coin in filteredCoins" :key="coin.id">
            <td class="py-2 px-4 border-b flex items-center">
              <img :src="coin.image" style="width: 30px; height: 30px;" class="rounded-full">
              <p class="ml-2 font-semibold">{{ coin.name }}</p>
            </td>
            <td class="py-2 px-4 border-b hidden md:table-cell">{{ formatNumber(coin.current_price) }}</td>
            <!-- Nascondi su mobile -->
            <td class="py-2 px-4 border-b hidden md:table-cell">{{ formatNumber(coin.market_cap) }}</td>
            <td class="py-2 px-4 border-b hidden md:table-cell">{{ formatNumber(coin.total_volume) }}</td>
            <td class="py-2 px-4 border-b hidden md:table-cell">
              <span v-if="coin.price_change_24h <= 0" class="inline-flex items-center rounded-md bg-red-300 px-2 py-1 text-xs font-medium text-black-600">
                {{ coin.price_change_24h }}
              </span>
              <span v-else-if="coin.price_change_24h > 0" class="inline-flex items-center rounded-md bg-green-300 px-2 py-1 text-xs font-medium text-black-400">
                +{{ coin.price_change_24h }}
              </span>
              <span v-else class="inline-flex items-center rounded-md bg-gray-300 px-2 py-1 text-xs font-medium text-black-600">
                {{ coin.price_change_24h }}
              </span>
            </td>
            <td class="py-2 px-4 border-b">
              <button @click="goToCryptoInfo(coin)" class="inline-flex items-center rounded-md bg-gray-300 px-2 py-1 text-xs font-medium text-black-400">
                Info
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import useCoinsMarkets from '@/use/coinsMarkets';
import { useRouter } from "vue-router";

export default {
  setup() {
    const coinsMarkets = useCoinsMarkets();
    const router = useRouter();

    function goToCryptoInfo(coin) {
      router.push({path: `/crypto/${coin.id}`})
    }

    return { ...coinsMarkets, goToCryptoInfo }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}

</style>
