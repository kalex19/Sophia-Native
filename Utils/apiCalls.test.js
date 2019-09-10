import { fetchLists } from './apiCalls';

describe("apiCalls", () => {
  describe("fetchLists", () => {
    let mockLists;

    beforeEach(() => {
      mockLists = [
        { name: "test list 1" },
        { name: "test list 2" },
        { name: "test list 3" }
      ];

      window.fetch = jest.fn().mockImplementation(() => {
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
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(fetchLists()).rejects.toEqual(
        Error("Could not fetch projects")
      );
    });
  });

})
