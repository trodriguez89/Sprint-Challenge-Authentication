const Users = require("../users/users-model");
const db = require("../database/dbConfig");
const server = require("../api/server");
const request = require("supertest");

describe("jokes endpoints", function () {
  beforeEach(async () => {
    await db("users").truncate();
  })

  it("returns status code 200 for jokes", function () {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "Darth Vader", password: "1234" })
      .then(response => {
        const token = response.body.token;
        return request(server)
          .get("/api/jokes")
          .set("authorization", token)
          .then(response => {
            expect(response.status).toBe(200)
          })
      })
  })
  it("returns 401 for unauthorized GET request for jokes", function () {
    return request(server)
      .get("/api/jokes")
      .then(response => {
        expect(response.status).toBe(401)
      })
  })
});