const supertest = require("supertest");
const colorize = require("json-colorizer");
const chalk = require("chalk");
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const host = "http://localhost:3000";
const request = supertest(host);

// Setup Mocked Users
const mockedUsers = [
  {
    id: 1,
    name: "Ron Smith",
    email: "rsmith@mailinator.com",
    department: "engineering"
  },
  {
    id: 2,
    name: "Jim Conroy",
    email: "jconry@mailinator.com",
    department: "business"
  }
];
// Setup a test suite

describe("Users API Test Suite", () => {
  //Manipulate Jest Timeout
  // jest.setTimeout(10000);

  it("should get all users ", async () => {
    const response = await request.get("/users");
    const json = response;

    //console.log(colorize(json, { pretty: true }));

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
    //expect(response.body).toEqual(mockedUsers);
  });

  it("should get a single user by id", async () => {
    const response = await request.get("/users/2");
    const json = response.body;
    console.log(colorize(json, { pretty: true }));

    expect(response.statusCode).toBe(200);
    expect(response.body[0].name).toContain("Conroy");
    //expect(response.body[0].department).toEqual("business");
  });

  it("should create a user", async () => {
    const users = await request.get("/users");
    const countBefore = users.body.length;

    const response = await request.post("/users").send({
      name: "Faisal Humayun",
      email: "faisal@mailinator.com",
      department: "QA"
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.length).toEqual(countBefore + 1);
    const json = response.body;
    //console.log(colorize(json, { pretty: true }));
  });
  it("should update a single user by id", async () => {
    const response = await request.put("/users/2").send({
      department: "IT"
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.user.department).toEqual("IT");
    const json = response.body;
    console.log(colorize(json, { pretty: true }));
  });
  it("should delete a single user by id", async () => {
    const response = await request.delete("/users/3");
    expect(response.statusCode).toBe(200);
    response.body.users.forEach(user => {
      if (user.name === "Faisal Humayun") {
        throw new Error("user not was note deleted successfully");
      }
    });
    const json = response.body;
    console.log(colorize(json, { pretty: true }));
  });

  it("should return 404 getting a user with invalid id", async () => {
    const response = await request.get("/users/x");
    expect(response.statusCode).toBe(404);

    const json = response.body;
    console.log(colorize(json, { pretty: true }));
  });

  it("should return 404 updating a user with invalid id", async () => {
    const response = await request.put("/users/x").send({
      department: "QA"
    });
    expect(response.statusCode).toBe(404);

    const json = response.body;
    console.log(colorize(json, { pretty: true }));
  });

  it("should return 400 updating a user with invalid body", async () => {
    const response = await request.post("/users").send({
      abcd: "blah"
    });
    expect(response.statusCode).toBe(400);

    const json = response.body;
    console.log(colorize(json, { pretty: true }));
  });

  it("should return 404 deleting a user with invalid id", async () => {
    const response = await request.delete("/users/y");
    expect(response.statusCode).toBe(404);

    const json = response.body;
    console.log(colorize(json, { pretty: true }));
  });
});
