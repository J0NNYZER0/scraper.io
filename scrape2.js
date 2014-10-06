var request = require('request'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  ws = fs.createWriteStream('file2.json'),
  detailUrls = ['http://www.yelp.com/search?find_desc=san+francisco+restaurants&find_loc=Dallas%2C+TX&ns=1'
  ];
var restaurants = [];

var outputFilename = 'file2.json';

for (var url in detailUrls) {
  request(detailUrls[url], function(err, resp, body){
    if(!err && resp.statusCode == 200) {
      var $ = cheerio.load(body);
      $('.search-result').each(function(){
        var restaurant =
        {
          name: this.find('.biz-name').text(),
          category: this.find('.category-str-list').text().replace(/\s{2,}/g,''),
          phone: this.find('.biz-phone').text().replace(/\s{2,}/g,''),
          address: this.find('address').text().replace(/\s{2,}/g,'')
        };
        restaurants.push(restaurant);
      })
    }
    fs.writeFile(outputFilename, JSON.stringify(restaurants, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
    });
  });
}
