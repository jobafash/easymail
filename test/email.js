// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Emails", () => {
    describe("POST /api/email", () => {
        // Test to send an email
        it("should send an email to the recipient", (done) => {
             chai.request(app)
                 .post('/api/email')
                 .send({
                    email: 'fashogbonoluwajoba@gmail.com',
                    text: 'Tests',
                  })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});
