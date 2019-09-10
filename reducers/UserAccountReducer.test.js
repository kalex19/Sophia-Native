import { userAccountReducer } from './userAccountReducer';

describe('userAccountReducer', () => {
  
  it('should return default state', () => {
    const expected = null;
    const result = userAccountReducer(undefined, {});
    
    expect(result).toEqual(expected);
  })

  it('should set user to state on LOG_IN', () => {
    const user = { name: "Jane" }
    const actionObject = {
      type: 'LOG_IN',
      user: user
    }

    const result = userAccountReducer(undefined, actionObject)

    expect(result).toEqual(user)
  })
})