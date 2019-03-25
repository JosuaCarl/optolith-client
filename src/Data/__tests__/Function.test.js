// @ts-check
const { cnst, ident, thrush, join, on, flip, blackbird, blackbirdF } = require ('../Function')
const { fromJust, Just } = require ('../Maybe')
const { add, multiply } = require ('../../App/Utilities/mathUtils')

test ('ident', () => {
  expect (ident (5)) .toEqual (5)
})

test ('cnst', () => {
  // @ts-ignore
  expect (cnst (5) ('test')) .toEqual (5)
})

test ('thrush', () => {
  expect (thrush (5) (add (3))) .toEqual (8)
})

test ('join', () => {
  expect (join (add) (2)) .toEqual (4)
  expect (join (add) (4)) .toEqual (8)
})

test ('on', () => {
  expect (on (add) (fromJust) (Just (1)) (Just (2))) .toEqual (3)
})

test ('flip', () => {
  expect (flip (a => b => a + b) ('cde') ('ab')) .toEqual ('abcde')
})

test ('blackbird', () => {
  expect (blackbird (multiply (3)) (add) (3) (4)) .toEqual (21)
})

test ('blackbirdF', () => {
  expect (blackbirdF (add) (multiply (3)) (3) (4)) .toEqual (21)
})
