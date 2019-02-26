import { FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers'

export default {
  name: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: val => new RegExp(`^.*${val}.*$`),
  },
}
