const initial = {
  page: 1,
  pageSize: 20,
  skip: 0,
  shouldUpdate: true,
  done: false,
};

export default function paging(state = initial, action) {
  switch(action.type) {
    case "PAGING.INCREMENT":
      return { ...state, ...{
        page: state.page + 1,
      } }
    case "PAGING.PAUSE":
      return { ...state, ...{
        shouldUpdate: false,
      } }
    case "PAGING.RESUME":
      return { ...state, ...{
        shouldUpdate: true,
      } }
    case "PAGING.RESET":
      return initial;
    default:
      return state;
  }
}
