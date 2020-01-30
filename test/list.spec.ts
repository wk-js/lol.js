import { assertEquals, runIfMain, test } from "https://deno.land/std/testing/mod.ts"
import { List } from "../lib/list.ts"

test(function insert_and_count() {
  const l = new List<string>()

  l.push("l")
  assertEquals(l.length, 1)

  l.unshift("h")
  assertEquals(l.length, 2)

  l.insertAt(1, "e")
  assertEquals(l.length, 3)

  l.add("l")
  assertEquals(l.length, 4)

  assertEquals(l.toArray(), ["h", "e", "l", "l"])
})

test(function remove_and_count() {
  const l = new List<number>()

  l.push(0)
  l.push(1)
  l.push(2)
  l.push(3)
  l.push(4)
  assertEquals(l.length, 5)

  l.shift()
  l.pop()
  assertEquals(l.length, 3)

  l.remove(2)
  l.removeAt(0)
  assertEquals(l.length, 1)

  l.pop()
  assertEquals(l.length, 0)

  l.pop()
  assertEquals(l.length, 0)
})

test(function insert_and_remove() {
  const l = new List<string>()

  l.push("l")
  l.push("l")
  l.push("o")
  assertEquals(l.toArray(), ["l", "l", "o"])

  l.unshift("h")
  assertEquals(l.toArray(), ["h", "l", "l", "o"])

  l.insertAt(1, "e")
  assertEquals(l.toArray(), ["h", "e", "l", "l", "o"])

  l.pop()
  assertEquals(l.toArray(), ["h", "e", "l", "l"])

  l.shift()
  assertEquals(l.toArray(), ["e", "l", "l"])

  l.removeAt(1)
  assertEquals(l.toArray(), ["e", "l"])
})

test(function index_of() {
  const l = new List<string>()

  l.push("l")
  l.push("l")
  l.push("o")
  assertEquals(l.indexOf("l"), 0)

  l.unshift("h")
  l.insertAt(1, "e")
  assertEquals(l.indexOf("l"), 2)
  assertEquals(l.indexOf("o"), 4)
})

test(function inverse() {
  const l = new List<string>()
  l.add("h")
  l.add("e")
  l.add("l")
  l.add("l")
  l.add("o")

  l.inverse()
  assertEquals(l.toArray(), ["o", "l", "l", "e", "h"])
})

test(function iterator() {
  const l = new List("hello".split(""))

  const it = l.values()
  assertEquals(it.next(), { done: false, value: "h" })
  assertEquals(it.next(), { done: false, value: "e" })
  assertEquals(it.next(), { done: false, value: "l" })
  assertEquals(it.next(), { done: false, value: "l" })
  assertEquals(it.next(), { done: false, value: "o" })
  assertEquals(it.next(), { done: true, value: null })
  assertEquals(it.next(), { done: true, value: null })
})

runIfMain(import.meta)