export default (data, count) => ({
  data,
  metadata: {
    rowsToShow: ['name', 'description'],
    accessor: 'programs',
    count,
  },
})
