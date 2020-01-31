const db = require("../database/dbConfig");

const Users = require("./users-model");

describe("users model", function () {

  describe("test environment", function () {
    it("should use testing environment", function () {
      expect(process.env.DB_ENV).toBe("testing");
    })
  })

  // describe("add()", function(){
  //   beforeEach(async () => {
  //     await db("users").
  //   })
  // })

});