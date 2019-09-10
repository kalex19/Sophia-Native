import { listsReducer } from './ListsReducer';

describe('listsReducer', () => {
  
  it('should return default state', () => {
    const expected = [];
    const result = listsReducer(undefined, []);
    
    expect(result).toEqual(expected);
  })

  it('should set lists to state on LOAD_LISTS', () => {
    const lists = [{task: "apples"}, {task: "oranges"}]
    const actionObject = {
      type: 'LOAD_LISTS',
      lists: lists
    }

    const result = listsReducer(undefined, actionObject)

    expect(result).toEqual(lists)
  })
})