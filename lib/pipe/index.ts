export interface PipeAsync<S> {
  pipe<U>(callback: (v: S, ...parameters: any[]) => U, ...parameters: any[]) : PipeAsync<U>
  value() : Promise<S>
}

export interface PipeSync<S> {
  pipe<U>(callback: (v: S, ...parameters: any[]) => U, ...parameters: any[]) : PipeSync<U>
  value() : S
}

function _pipe_async<T, S>(value: T | Promise<T>, action: (v: T, ...parameters: any[]) => S | Promise<S>, parameters?: any[]) : PipeAsync<S> {
  const _params = parameters || []

  const promise = new Promise<S>((resolve) => {
    if (value instanceof Promise) {
      value.then((newValue) => {
        resolve(action(newValue, ..._params))
      })
    } else {
      resolve(action(value, ..._params))
    }
  })

  return {
    pipe<U>(callback: (v: S, ...parameters: any[]) => U, ...params: any[]) {
      return _pipe_async(promise, callback, params)
    },

    value: () => promise
  }
}

function _pipe_sync<T, S>(value: T, action: (v: T, ...parameters: any[]) => S, parameters?: any[]) : PipeSync<S> {
  parameters = parameters || []

  const result = action(value, ...parameters)

  return {
    pipe<U>(callback: (v: S, ...parameters: any[]) => U, ...parameters: any[]) {
      return _pipe_sync(result, callback, parameters)
    },

    value: () => result
  }
}

export function pipe_async<T>(value: T) {
  return _pipe_async(value, (v) => v)
}

export function pipe_sync<T>(value: T) {
  return _pipe_sync(value, (v) => v)
}