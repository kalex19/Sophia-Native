import { logInUser } from "./logInUser";

  describe("logInUser", () => {
    let mockUser;
    let mockResponse;

    beforeEach(() => {
      mockUser = {
        username: "test",
        password: 'lolo'
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
      const result = await logInUser(mockUser);

      expect(result).toEqual(mockResponse);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockResponse)
        });
      });

      expect(logInUser(mockUser)).rejects.toEqual(
        Error("Could not add new User")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "Could not add new User"
        });
      });

      expect(logInUser(mockUser)).rejects.toEqual({
        message: "Could not add new User"
      });
    });
  });