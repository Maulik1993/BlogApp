var express = require('express');
var router = express.Router();

var imdbObj = require('node-movie');
var Movie = require('../../modal/movie');



router.get('/',function(request,respond){
  Movie.find({})
  .exec(function(err,books){
    if(err){
      respond.send("error has occured");
    }
    else {

      respond.json(books);
    }
  });
});


router.post('/getMovieDetails', function(req,res){
     imdbObj(req.param('movie'), function (err, data) {
       res.send(data);
     });
   });
// Search and save the movie
  router.post('/addMovie', function(req, res) {
    var movie = new Movie();
 console.log(req.body.Title);
     movie.Title = req.body.Title;
     movie.Year =  req.body.Year;
     movie.Rated = req.body.Rated;
     movie.Released = req.body.Released;
     movie.Runtime = req.body.Runtime;
     movie.Genre = req.body.Genre;
     movie.Director = req.body.Director;
     movie.Writer = req.body.Writer;
     movie.Actors = req.body.Actors;
     movie.Plot = req.body.Plot;
     movie.Language = req.body.Language;
     movie.Country = req.body.Country;
     movie.Awards = req.body.Awards;
     movie.Poster = req.body.Poster;
     movie.Metascore = req.body.Metascore;
     movie.imdbRating = req.body.imdbRating;
     movie.imdbVotes = req.body.imdbVotes;
     movie.imdbID = req.body.imdbID;
     movie.Type = req.body.Type;
     movie.Response = req.body.Response;
     movie.save(function(err) {
         if (err)
             res.send(err);
         res.json({ message: 'Movie added!' });
           });
        });


            router.delete('/',function(req, res) {
                  Movie.remove({
                    _id: req.body.movie_id
                                }, function(err, movie) {
                                    if (err)
                                        res.send(err);
                                    res.json({ message: 'Successfully deleted' });
                                });
                            });






// Route to get all movies and save a movie
// router.route('/')
// // Get all movies
//     .get(function(req, res){
//       Movie.find(function(err, movies) {
//             if (err)
//                 res.send(err);
//             res.json(movies);
//         });
//     })
// // Search and save the movie
//   .post(function(req, res) {
//     console.log("inside   "+req.body.name);
//         imdbObj(req.body.name, function (err, data) {
//         if (data){
//         var movie = new Movie();
//         movie.Title = data.Title;
//         movie.Year =  data.Year;
//         movie.Rated = data.Rated;
//         movie.Released = data.Released;
//         movie.Runtime = data.Runtime;
//         movie.Genre = data.Genre;
//         movie.Director = data.Director;
//         movie.Writer = data.Writer;
//         movie.Actors = data.Actors;
//         movie.Plot = data.Plot;
//         movie.Language = data.Language;
//         movie.Country = data.Country;
//         movie.Awards = data.Awards;
//         movie.Poster = data.Poster;
//         movie.Metascore = data.Metascore;
//         movie.imdbRating = data.imdbRating;
//         movie.imdbVotes = data.imdbVotes;
//         movie.imdbID = data.imdbID;
//         movie.Type = data.Type;
//         movie.Response = data.Response;
//         movie.save(function(err) {
//             if (err)
//                 res.send(err);
//             res.json({ message: 'Movie added!' });
//               });
//             }else {
//               res.send(err);
//             }
//             });
//         });
// // Route to get all movies and save a movie
//     router.route('/movies/:movie_id')
// // Get the movie by id
//           .get(function(req, res) {
//             Movie.findById(req.params.movie_id, function(err, movie) {
//                 if (err)
//                     res.send(err);
//                 res.json(movie);
//             });
//         })
// // Update the movie by id
//         .put(function(req, res) {
//         Movie.findById(req.params.movie_id, function(err, movie) {
//             if (err)
//                 res.send(err);
//             movie.Title = 'Hello';
//             movie.save(function(err) {
//                 if (err)
//                     res.send(err);
//                 res.json({ message: 'Movie updated!' });
//             });
//         });
//     })
// // Delete the movie by id
//     .delete(function(req, res) {
//         Movie.remove({
//             _id: req.params.movie_id
//         }, function(err, movie) {
//             if (err)
//                 res.send(err);
//             res.json({ message: 'Successfully deleted' });
//         });
//     });

module.exports= router;
