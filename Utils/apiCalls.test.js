import {
  fetchLists,
  postList,
  deleteList,
  patchList,
  fetchTasks,
  postTask,
  patchTask,
  deleteTask,
  fetchProfile
} from "./apiCalls";

describe("apiCalls", () => {
  describe("fetchLists", () => {
    let mockLists;

    beforeEach(() => {
      mockLists = [
        { name: "test list 1" },
        { name: "test list 2" },
        { name: "test list 3" }
      ];

      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLists)
        });
      });
    });

    it("HAPPY: should return with a parsed response", async () => {
      const result = await fetchLists();
      expect(result).toEqual(mockLists);
    });

    it("SAD: should return an error if the answer is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(fetchLists()).rejects.toEqual(Error("Could not fetch lists"));
    });
  });

  describe("postList", () => {
    let mockList;
    let mockResponse;

    beforeEach(() => {
      mockList = {
        name: "Sample 1"
      };

      mockResponse = { id: 1 };

      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it("HAPPY: should return a parsed response", async () => {
      const result = await postList(mockList);

      expect(result).toEqual(mockResponse);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockResponse)
        });
      });

      expect(postList(mockList)).rejects.toEqual(
        Error("Could not add new list")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "Could not add new list"
        });
      });

      expect(postList(mockList)).rejects.toEqual({
        message: "Could not add new list"
      });
    });
  });

  describe("deleteList", () => {
    const mockClientId = 1;
    const mockListId = 2;
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true
        });
      });
    });

    it("should call fetch with correct data", () => {
      const expected = [
        "https://sophia-be.herokuapp.com/api/v1/clients/1/lists/2",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ];
      deleteList(mockClientId, mockListId);

      expect(global.fetch).toHaveBeenCalledWith(...expected);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(deleteList(mockClientId, mockListId)).rejects.toEqual(
        Error("Could not delete list")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "There was an error with the server"
        });
      });

      expect(deleteList(mockClientId, mockListId)).rejects.toEqual({
        message: "There was an error with the server"
      });
    });
  });

  describe("patchList", () => {
    let mockList;
    let mockResponse;

    beforeEach(() => {
      mockList = { name: "Sample 1" };

      mockResponse = { name: "Changed name" };

      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it("HAPPY: should return a parsed response", async () => {
      const result = await patchList(mockList);

      expect(result).toEqual(mockResponse);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(patchList(mockList)).rejects.toEqual(
        Error("Could not edit name of list")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "There was an error with the server"
        });
      });

      expect(patchList(mockList)).rejects.toEqual({
        message: "There was an error with the server"
      });
    });
  });

  describe("fetchTasks", () => {
    let mockTasks;

    beforeEach(() => {
      mockTasks = [
        { name: "test list 1" },
        { name: "test list 2" },
        { name: "test list 3" }
      ];

      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTasks)
        });
      });
    });

    it("HAPPY: should return with a parsed response", async () => {
      const result = await fetchTasks();
      expect(result).toEqual(mockTasks);
    });

    it("SAD: should return an error if the answer is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(fetchTasks()).rejects.toEqual(Error("Could not fetch tasks"));
    });
  });

  describe("postTask", () => {
    let mockTask;
    let mockResponse;

    beforeEach(() => {
      mockTask = {
        name: "Sample 1"
      };

      mockResponse = { id: 1 };

      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it("HAPPY: should return a parsed response", async () => {
      const result = await postTask(mockTask);

      expect(result).toEqual(mockResponse);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockResponse)
        });
      });

      expect(postTask(mockTask)).rejects.toEqual(
        Error("Could not add new task")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "Could not add new task"
        });
      });

      expect(postTask(mockTask)).rejects.toEqual({
        message: "Could not add new task"
      });
    });
  });

  describe("patchTask", () => {
    let mockTask;
    let mockResponse;

    beforeEach(() => {
      mockTask = { name: "Sample 1" };

      mockResponse = { name: "Changed name" };

      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it("HAPPY: should return a parsed response", async () => {
      const result = await patchTask(mockTask);

      expect(result).toEqual(mockResponse);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(patchTask(mockTask)).rejects.toEqual(
        Error("Could not edit name of task")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "There was an error with the server"
        });
      });

      expect(patchTask(mockTask)).rejects.toEqual({
        message: "There was an error with the server"
      });
    });
  });

  describe("deleteTask", () => {
    const mockClientId = 1;
    const mockListId = 2;
    const mockTaskId = 1;
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true
        });
      });
    });

    it("should call fetch with correct data", () => {
      const expected = [
        "https://sophia-be.herokuapp.com/api/v1/clients/1/lists/2/tasks/1",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ];
      deleteTask(mockListId, mockTaskId, mockClientId);

      expect(global.fetch).toHaveBeenCalledWith(...expected);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(deleteTask(mockListId, mockTaskId, mockClientId)).rejects.toEqual(
        Error("Could not delete task")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "There was an error with the server"
        });
      });

      expect(deleteTask(mockListId, mockTaskId, mockClientId)).rejects.toEqual({
        message: "There was an error with the server"
      });
    });
  });

  describe("fetchProfile", () => {
    let mockProfile;

    beforeEach(() => {
      mockProfile = { name: "test list 1", email: "test@test.com" };

      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProfile)
        });
      });
    });

    it("HAPPY: should return with a parsed response", async () => {
      const result = await fetchProfile();
      expect(result).toEqual(mockProfile);
    });

    it("SAD: should return an error if the answer is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(fetchProfile()).rejects.toEqual(Error("Could not fetch profile"));
    });
  });
});
