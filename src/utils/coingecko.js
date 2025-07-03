export class CoingeckoMarketData {
  constructor(coingeckoApiId, expireAfterHours = 2) {
    this.coingeckoApiId = coingeckoApiId
    this._cacheKey = `${coingeckoApiId}_market_data`
    this._expirationInSeconds = expireAfterHours * 60 * 60
  }

  _getCachedData() {
    const data = JSON.parse(localStorage.getItem(this._cacheKey))
    return data?.marketInfo
  }

  _cacheData(coingeckoApiResponse) {
    const timestampNow = Math.floor(Date.now() / 1000)
    localStorage.setItem(this._cacheKey, JSON.stringify({ cachedAt: timestampNow, marketInfo: coingeckoApiResponse }))
  }

  _hasCacheExpired() {
    const data = JSON.parse(localStorage.getItem(this._cacheKey))
    const cachedAtTimestamp = data?.cachedAt

    if (!cachedAtTimestamp) {
      return true
    }

    const timestampNow = Math.floor(Date.now() / 1000)
    const hasCacheExpired = (cachedAtTimestamp + this._expirationInSeconds) < timestampNow
    return hasCacheExpired
  }

  async fetch() {
    if (this._hasCacheExpired()) {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${this.coingeckoApiId}`)
        const responseJson = await response.json()
        const apiData = responseJson[0]

        this._cacheData(apiData)
        return apiData
      } catch (error) {
        console.error(`Could not fetch ${this.coingeckoApiId} market data:`, error)
        return this._getCachedData()
      }
    }

    return this._getCachedData()
  }
}
