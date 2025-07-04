function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function waitRandom(min, max) {
  return wait(min + Math.round(Math.random() * Math.max(0, max - min)))
}

/**
 * This error is thrown if the function is cancelled before completing
 */
function CancelledError() {
  this.name = 'CancelledError'
  this.message = 'Cancelled'
  this.isCancelledError = true
}
CancelledError.prototype = Error.prototype

/**
 * Throw this error if the function should retry
 */
export function RetryableError() {
  this.name = 'RetryableError'
  this.isRetryableError = true
}
RetryableError.prototype = Error.prototype

/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */
export function retry(fn, { n, minWait, maxWait }) {
  let completed = false
  let rejectCancelled
  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise(async (resolve, reject) => {
    rejectCancelled = reject
    // eslint-disable-next-line no-constant-condition
    while (true) {
      let result
      try {
        result = await fn()
        if (!completed) {
          resolve(result)
          completed = true
        }
        break
      } catch (error) {
        if (completed) {
          break
        }
        if (n <= 0 || !error.isRetryableError) {
          reject(error)
          completed = true
          break
        }
        n--
      }
      await waitRandom(minWait, maxWait)
    }
  })
  return {
    promise,
    cancel: () => {
      if (completed) return
      completed = true
      rejectCancelled(new CancelledError())
    },
  }
}
