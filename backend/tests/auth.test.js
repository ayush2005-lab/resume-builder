require("./setup");
const request = require("supertest");
const app = require("../server");

describe("Auth", () => {
  const user = { name: "Jordan Lee", email: "jordan@example.com", password: "secret123" };

  test("registers a new user and returns a token", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.email).toBe(user.email);
  });

  test("rejects duplicate email registration", async () => {
    await request(app).post("/api/auth/register").send(user);
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.status).toBe(409);
  });

  test("rejects registration with a short password", async () => {
    const res = await request(app).post("/api/auth/register").send({ ...user, password: "123" });
    expect(res.status).toBe(400);
  });

  test("logs in with correct credentials", async () => {
    await request(app).post("/api/auth/register").send(user);
    const res = await request(app).post("/api/auth/login").send({ email: user.email, password: user.password });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("rejects login with wrong password", async () => {
    await request(app).post("/api/auth/register").send(user);
    const res = await request(app).post("/api/auth/login").send({ email: user.email, password: "wrong" });
    expect(res.status).toBe(401);
  });

  test("blocks protected routes without a token", async () => {
    const res = await request(app).get("/api/resumes");
    expect(res.status).toBe(401);
  });
});
