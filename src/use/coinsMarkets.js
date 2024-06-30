import { getMarkets } from '@/api/coins';
import { ref, onMounted, computed } from 'vue';

export default function useCoinsMarkets()
{
    const coins = ref([]);
    const searchQuery = ref("");
    const sortDesc = ref(false);

    async function getAPIdata() {
        coins.value = await getMarkets();
    }
  
    onMounted(getAPIdata);

    function sortByPriceChange() {
        sortDesc.value = !sortDesc.value;
        coins.value.sort((a, b) => {
          if (sortDesc.value) {
            return b.price_change_24h - a.price_change_24h;
          } else {
            return a.price_change_24h - b.price_change_24h;
          }
        });
    }


    const filteredCoins = computed(() => {
        return coins.value.filter(coin =>
          coin.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });

      function formatNumber(number) {
        return new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'eur',
          maximumSignificantDigits: 20
        }).format(number);
      }

      return { coins, searchQuery, sortDesc, sortByPriceChange, filteredCoins, formatNumber }
}