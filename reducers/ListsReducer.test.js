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
  });

  it('should add a new list to state on ADD_LIST', () => {
    const initialLists = [{task: "apples"}, {task: "oranges"}];
    const newList = { task: "bananas" }
    const addedLists = [ ...initialLists, newList].reverse();
    const actionObject = {
      type: 'ADD_LIST',
      list: newList
    }

    const result = listsReducer(initialLists, actionObject)

    expect(result).toEqual(addedLists)
  });

  it('should log out and empty stat on LOG_OUT', () => {
    const actionObject = {
      type: 'LOG_OUT',
      lists: []
    }
  });
})