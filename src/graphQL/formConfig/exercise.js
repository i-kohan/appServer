export default {
  fields: [
    {
      fieldType: 'stepper',
      fields: [
        {
          lable: 'Fill title of exercise',
          inputs: [{
            accessor: 'name',
            fieldType: 'text',
            initialValue: '',
            validation: 'empty',
          }],
        },
        {
          lable: 'Fill description of exercise',
          inputs: [{
            accessor: 'desctiption',
            fieldType: 'text',
            initialValue: '',
            validation: 'empty',
          }],
        },
      ],
    },
  ],
}
