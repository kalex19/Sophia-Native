import { postCaretaker } from "./postCaretaker";

  describe("postCaretaker", () => {
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
      const result = await postCaretaker(mockProfile);

      expect(result).toEqual(mockResponse);
    });

    it("SAD: should return an error if status is not ok", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockResponse)
        });
      });

      expect(postCaretaker(mockProfile)).rejects.toEqual(
        Error("Could not add new Caretaker")
      );
    });

    it("SAD: should return an error if promise rejects", () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "Could not add new Caretaker"
        });
      });

      expect(postCaretaker(mockProfile)).rejects.toEqual({
        message: "Could not add new Caretaker"
      });
    });
  });