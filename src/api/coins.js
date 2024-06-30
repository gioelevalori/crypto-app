const baseUrl = "https://api.coingecko.com/api/v3";
const markets = "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";
const coinsId = "coins/";

export const getMarkets = async () => {
    const responce = await fetch(`${baseUrl}/${markets}`);
    return await responce.json();
}

export const getCoinDetail = async (id) => {
    const responce = await fetch(`${baseUrl}/${coinsId}${id}`);
    return await responce.json();
}