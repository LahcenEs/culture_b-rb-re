const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../app'); // Your main Express app
const { expect } = chai;

chai.use(chaiHttp);

describe("Authentication Routes", () => {
    const validCredentials = { email: "test@example.com", password: "password" };
    const invalidCredentials = { email: "wrong@example.com", password: "wrong" };
    const SECRET_KEY = "your_secret_key";
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    it("should return a token on successful login", (done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send(validCredentials)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("token");
                done();
            });
    });

    it("should return 401 for invalid credentials", (done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send(invalidCredentials)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property("message", "Invalid credentials");
                done();
            });
    });

    it("should allow access to protected route with valid token", (done) => {
        const token = jwt.sign({ email: validCredentials.email }, SECRET_KEY, { expiresIn: "1h" });
        chai.request(app)
            .get('/api/auth/protected')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("message", "Access granted");
                done();
            });
    });

    it("should deny access to protected route without a token", (done) => {
        chai.request(app)
            .get('/api/auth/protected')
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property("message", "Authorization header missing");
                done();
            });
    });

    it("should deny access to protected route with an invalid token", (done) => {
        chai.request(app)
            .get('/api/auth/protected')
            .set('Authorization', 'Bearer invalidtoken')
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property("message", "Invalid or expired token");
                done();
            });
    });
});