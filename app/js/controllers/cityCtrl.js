
angular.module('controllers').controller('CityCtrl', function($scope, $routeParams, $log, geoLocation, forecast, news) {
  'use strict';

  this.cityName = $routeParams.city;

  // Need to assign this to another variable in order to use it in nested contexts.
  var self = this;

  // Flatten the promise chain for better readability.
  // http://solutionoptimist.com/2013/12/27/javascript-promise-chains-2/
  geoLocation(this.cityName)
    .then(function(latLong) {
      return forecast(latLong[0], latLong[1]);
    })
    .then(function(forecast) {
      self.forecast = forecast.data;
      self.date = moment.utc(forecast.data.currently.time*1000).zone(forecast.data.offset * -1).format('LLL');
      return news(self.cityName);
    })
    .then(function(news) {
      self.news = news;
    })
    .then(function(map) {
      self.map = "https://www.google.com/maps/embed/v1/view?key=AIzaSyDX6K2U5Wrpv5lCnE7ipnTvwzLn3Sb-hSI&center=-33.8569,151.2152&zoom=18";
    })
    .catch(function(err) {
      $log.error(err);
    });
});