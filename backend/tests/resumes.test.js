require("./setup");
const request = require("supertest");
const app = require("../server");

async function authedAgent() {
  const user = { name: "Sam Rivera", email: "sam@example.com", password: "secret123" };
  const res = await request(app).post("/api/auth/register").send(user);
  return res.body.token;
}

describe("Resumes", () => {
  test("creates, lists, updates, and deletes a resume", async () => {
    const token = await authedAgent();
    const auth = { Authorization: `Bearer ${token}` };

    const create = await request(app).post("/api/resumes").set(auth).send({
      title: "My first resume",
      template: "classic",
      data: { name: "Sam Rivera", summary: "Engineer" },
    });
    expect(create.status).toBe(201);
    const id = create.body._id;

    const list = await request(app).get("/api/resumes").set(auth);
    expect(list.status).toBe(200);
    expect(list.body.total).toBe(1);

    const update = await request(app).put(`/api/resumes/${id}`).set(auth).send({ title: "Renamed" });
    expect(update.status).toBe(200);
    expect(update.body.title).toBe("Renamed");

    const del = await request(app).delete(`/api/resumes/${id}`).set(auth);
    expect(del.status).toBe(200);
  });

  test("rejects an invalid template value", async () => {
    const token = await authedAgent();
    const res = await request(app)
      .post("/api/resumes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Bad", template: "fancy" });
    expect(res.status).toBe(400);
  });

  test("a user cannot access another user's resume", async () => {
    const tokenA = await authedAgent();
    const create = await request(app).post("/api/resumes").set("Authorization", `Bearer ${tokenA}`).send({ title: "Private" });
    const id = create.body._id;

    const other = await request(app).post("/api/auth/register").send({ name: "Other", email: "other@example.com", password: "secret123" });
    const res = await request(app).get(`/api/resumes/${id}`).set("Authorization", `Bearer ${other.body.token}`);
    expect(res.status).toBe(404);
  });
});
