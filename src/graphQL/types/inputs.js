import { gql } from 'apollo-server-express'

export default gql`

  type Field {
    accessor: String
    fieldType: String!
    initialValue: String
    validation: String
    fields: [[Field]]
  }

  type StepperFields {
    lable: String
    inputs: [Field]
  }

  type Stepper {
    fieldType: String
    fields: [StepperFields]
  }
`
