import * as actions from "./index";

describe("actions", () => {
  it("should have a type of LOAD_LISTS", () => {
    //setup
    const lists = { items: [ 1, 2, 3] };
    const expectedAction = {
      type: "LOAD_LISTS",
      lists: { items: [ 1, 2, 3] }
    };

    //execution
    const result = actions.loadLists(lists);
    //expectation
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of LOAD_TASKS", () => {
    //setup
    const tasks = { items: [ 1, 2, 3] };
    const expectedAction = {
      type: "LOAD_TASKS",
      tasks: { items: [ 1, 2, 3] }
    };

    //execution
    const result = actions.loadTasks(tasks);
    //expectation
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of LOAD_PROFILE", () => {
    //setup
    const profile = { name: "Katie" };
    const expectedAction = {
      type: "LOAD_PROFILE",
      profile: { name: "Katie" }
    };

    //execution
    const result = actions.loadProfile(profile);
    //expectation
    expect(result).toEqual(expectedAction);
  });
  
  it("should have a type of LOG_IN", () => {
    //setup
    const user = { name: "Katie" };
    const expectedAction = {
      type: "LOG_IN",
      user: { name: "Katie" }
    };

    //execution
    const result = actions.logIn(user);
    //expectation
    expect(result).toEqual(expectedAction);
  });
  
});