type CallbackFunction<TArgs extends unknown[], TResult> = (...args: [...TArgs, (result?: TResult) => void]) => void

export const promisify =
  <TArgs extends unknown[], TResult = void>(fn: CallbackFunction<TArgs, TResult>) =>
  (...args: TArgs): Promise<TResult | void> =>
    new Promise((resolve) => {
      fn(...args, (result: TResult | void) => {
        resolve(result)
      })
    })
