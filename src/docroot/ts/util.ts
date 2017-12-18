export const debounde: Function = (fn: Function, interval: number): Function => {
  let timer: number

  return function (): void {
    if (timer) clearTimeout(timer)

    const args: any = arguments

    timer = setTimeout(() => {
      fn(...args)
    }, interval)
  }
}
