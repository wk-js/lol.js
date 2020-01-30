import { assertEquals, runIfMain, test } from "https://deno.land/std/testing/mod.ts"
import { pipe_async } from "../lib/pipe/index.ts"
import { toUnderscore } from "../lib/string/index.ts"

test(async function pipe() {

  const hello = pipe_async('Hello World')

  assertEquals(
    await hello
    .pipe(toUnderscore)
    .value(),
    'hello_world'
  )

  assertEquals(
    await hello
    .pipe((v) => v.toLowerCase())
    .value(),
    'hello world'
  )

  assertEquals(
    await hello
    .pipe((v) => v.toLowerCase())
    .pipe((v) => { return { value: v } })
    .value(),
    {
      value: 'hello world'
    }
  )

  function doSomething(s: string, ss: string) {
    return s.replace(ss, '')
  }

  assertEquals(
    await hello
    .pipe(doSomething, "World")
    .value(),
    'Hello '
  )
})

runIfMain(import.meta)