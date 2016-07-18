var should = require('chai').should(),
request = require("supertest"),
app = require("../bin/www"),
url = request("http://localhost:8080/movies");

describe.skip("Checking insertion",function () {
    it("should return success msg",function (done) {
      var movie ={"Title":"Star Wars","Year":"1983","Rated":"N/A","Released":"01 May 1983","Runtime":"N/A","Genre":"Action, Adventure, Sci-Fi","Director":"N/A","Writer":"N/A","Actors":"Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones","Plot":"N/A","Language":"English","Country":"USA"
      ,"Awards":"N/A","Poster":"http://ia.media-imdb.com/images/M/MV5BMWJhYWQ3ZTEtYTVkOS00ZmNlLWIxZjYtODZjNTlhMjMzNGM2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg","Metascore":"N/A","imdbRating":"7.8","imdbVotes":"347","imdbID":"tt0251413","Type":"game","Response":"True"};

      url.post("/add")
         .send(movie)
         .expect(200)
         .end(function (err,res) {
           if (err) {
           throw err;
            }
          res.text.should.be.equal("saving of "+movie.Title+" success");
          done();
         })
    });
});
describe("checking updating",function() {
  it("should return success msg",function (done) {
    url.put("/updatemovie/tt0251413")
       .send({"Year":"2016"})
       .expect(200)
       .end(function (err,res) {
         if (err) {
         throw err;
          }
        res.text.should.be.equal("successfully updated");
        done();
      });
  });
  it("should return error msg",function (done) {
    url.put("/updatemovie/tt02514")
       .send({"Year":"2016"})
       .expect(200)
       .end(function (err,res) {
         if (err) {
         throw err;
          }
        res.text.should.be.equal("That Id doesn't exist");
        done();
      });
  });
});
