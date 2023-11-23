const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../App");

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect('mongodb+srv://Hadwa:Hadwa@cluster0.hpstsct.mongodb.net/?retryWrites=true&w=majority');
  });

 /* Closing database connection after each test. */
 afterEach(async  () => {
  await mongoose.connection.close();

});   
/* Test for getting  user by id. */
describe("GET users/:id", () => {
    test("Get user by Id", (done) => {
      request(app)
        .get("/users/654b574dfe8cc5b5881fa37a")
        .expect(200)
        .expect((res) => {
         expect(res.body.name).toBe("Hadwa");
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });


/* Test for creating a new user. */
describe("POST signup", () => {
    test("Post user", (done) => {
      request(app)
        .post("/signup")
        .send({
          email: "test@gmail.com",
          password: "1234",
          name: "Salman"
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe("test@gmail.com")
          expect(res.body.name).toBe("Salman")
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    })
})