import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants'

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  }
}

export const decrementCounte = () => {
  return {
    type: DECREMENT_COUNTER
  }
}