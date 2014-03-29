var request = require('request'),
    URI = require('URIjs');

var API_ENDPOINT = URI('http://api.trakt.tv/'),
	MOVIE_PATH = 'movie',
	API_KEY = '7b7b93f7f00f8e4b488dcb3c5baa81e1619bb074';

function MovieCollection(imdbIDs) {
	this.ids = imdbIDs;
	return this;
}

MovieCollection.prototype.getSummaries = function(callback) {
	if(this.ids.length === 0) {
		callback([]);
		return;
	}

	var uri = API_ENDPOINT.clone()
				.segment([
					MOVIE_PATH,
					'summaries.json',
					API_KEY,
					this.ids.sort().join(','),
					'full'
				]);

	request(uri.toString(), {json: true}, function(err, res, body) {
		callback(body);
	});
};

exports.MovieCollection = MovieCollection;

exports.resizeImage = function(imageUrl, width) {
	var uri = URI(imageUrl),
		ext = uri.suffix();
		file = uri.filename().split('.' + ext)[0];

	return uri.filename(file + '-' + width + '.' + ext).toString();
};