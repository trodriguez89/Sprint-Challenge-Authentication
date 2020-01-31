const db = require("../database/dbConfig");
const server = require("../api/server");
const request = require("supertest");

const Users = require("./users-model");

describe("users model", function () {
  beforeEach(async () => {
    await db("users").truncate();
  })

  describe("test environment", function () {
    it("should use testing environment", function () {
      expect(process.env.DB_ENV).toBe("testing");
    })
  })

  //Testing Registering new users
  describe("/register", function(){

    it("adds new users to db", async function(){
      await Users.add({ username: "Darth Vader", password: "1234" })
      await Users.add({ username: "Luke Skywalker", password: "1234" })

      const users = await db("users");
      expect(users).toHaveLength(2)
    })
    it("returns 201 status code when registering", function(){
      return request(server)
      .post("/api/auth/register")
      .send({ username: "Obi-Wan", password: "1234" })
      .then(response => {
        expect(response.status).toBe(201)
      })
    })
    it("returns token when registering", function(){
      return request(server)
      .post("/api/auth/register")
      .send({ username: "Darth Vader", password: "1234"})
      .then(response => {
        expect(response.body.token)
      })
    })
  })

  //Testing Logging In
  describe("/login", function(){

    it("returns 200 status code when logging in", function(){
      return request(server)
      .post("/api/auth/register")
      .send({ username: "Darth Vader", password: "1234" })
      .then(response => {
        return request(server)
        .post("/api/auth/login")
        .send({ username: "Darth Vader", password: "1234"})
        .then(response => {
          expect(response.status).toBe(200)
        })
      })
    })
    it("returns the user ID when logging in", function(){
      return request(server)
      .post("/api/auth/login")
      .send({ username: "Darth Vader", password: "1234"})
      .then(response => {
        expect(response.body.id);
      })
    })
  })
});