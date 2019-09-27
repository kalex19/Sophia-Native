import { postClient } from "./postClient";

  describe("postClient", () => {
    let mockProfile;
    let mockResponse;

    beforeEach(() => {
      mockProfile = {
        name: "test",
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
      const result = await postClient(mockProfile);

      expect(result).toEqual(mockResponse);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockResponse)
        });
      });

      expect(postClient(mockProfile)).rejects.toEqual(
        Error("Could not add new Caretaker")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "Could not add new Caretaker"
        });
      });

      expect(postClient(mockProfile)).rejects.toEqual({
        message: "Could not add new Caretaker"
      });
    });
  });