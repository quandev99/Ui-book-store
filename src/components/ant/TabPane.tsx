export const TabPane = (tabContent,TableComponent) => {
  return tabContent.map((item) => {
    return {
      key: item.key,
      label: item.title,
      children: <TableComponent  />
    }
  })
}
