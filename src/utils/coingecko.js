export const CoingeckoCurrencyId = {
  ETH: 'ethereum',
}

export class CoingeckoMarketItem {
  constructor({
    id,
    symbol,
    name,
    image,
    current_price,
    total_volume,
    high_24h,
    low_24h,
    price_change_24h,
    price_change_percentage_24h,
    circulating_supply,
    total_supply,
    last_updated,
  }) {
    this.id = id
    this.symbol = symbol
    this.name = name
    this.image = image
    this.current_price = current_price
    this.total_volume = total_volume
    this.high_24h = high_24h
    this.low_24h = low_24h
    this.price_change_24h = price_change_24h
    this.price_change_percentage_24h = price_change_percentage_24h
    this.circulating_supply = circulating_supply
    this.total_supply = total_supply
    this.last_updated = last_updated
  }
}

export class CoingeckoMarketQuery {
  /**
   * @param {string[]} coingeckoIds List of Coingecko API currency IDs
   * @param {number} expireAfterHours How long to cache data from API
   */
  constructor(coingeckoIds, expireAfterHours = 2) {
    this.coingeckoIds = coingeckoIds
    this._expirationInSeconds = expireAfterHours * 60 * 60
  }

  _getCacheKey() {
    return `${this.coingeckoIds.join('_')}_market_data`
  }

  _getCachedData() {
    const data = JSON.parse(localStorage.getItem(this._getCacheKey()))
    return data?.marketData ?? []
  }

  _cacheData(marketItems) {
    const timestampNow = Math.floor(Date.now() / 1000)
    localStorage.setItem(
      this._getCacheKey(),
      JSON.stringify({ cachedAt: timestampNow, marketData: marketItems })
    )
  }

  _hasCacheExpired() {
    const data = JSON.parse(localStorage.getItem(this._getCacheKey()))
    const cachedAtTimestamp = data?.cachedAt

    if (!cachedAtTimestamp) {
      return true
    }

    const timestampNow = Math.floor(Date.now() / 1000)
    const hasCacheExpired = cachedAtTimestamp + this._expirationInSeconds < timestampNow
    return hasCacheExpired
  }

  /**
   * @returns {CoingeckoMarketItem[]}
   */
  async fetch() {
    if (this._hasCacheExpired()) {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${this.coingeckoIds.join(',')}`
        )
        const apiData = await response.json()
        const marketItems = apiData.map(item => new CoingeckoMarketItem(item))
        this._cacheData(marketItems)

        return this._getCachedData()
      } catch (error) {
        console.error(`Could not fetch ${this.coingeckoIds} market data:`, error)
        return this._getCachedData()
      }
    }

    return this._getCachedData()
  }
}
