import { profileReducer } from './profileReducer';

describe('profileReducer', () => {
  
  it('should return default state', () => {
    const expected = {};
    const result = profileReducer(undefined, {});
    
    expect(result).toEqual(expected);
  })

  it('should set profile to state on LOAD_PROFILE', () => {
    const profile = { name: "Jane" }
    const actionObject = {
      type: 'LOAD_PROFILE',
      profile: profile
    }

    const result = profileReducer(undefined, actionObject)

    expect(result).toEqual(profile)
  })
})