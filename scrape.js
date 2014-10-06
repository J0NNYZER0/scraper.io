var request = require('request'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  ws = fs.createWriteStream('file.json'),
  restaurants = [],
  alphabet = ['a']
  website = 'http://san.francisco.diningchannel.com/',
  //alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','w','x','y']
  detailUrls = [];


for (var letter in alphabet) {
  //  console.log('in for loop');
  request(website+'restaurants_'+alphabet[letter]+'.htm', function(err, resp, body){
    if(!err && resp.statusCode == 200) {
      var $ = cheerio.load(body);
      var i = 0;
      var num;
      $('.restaurant_link').each(function(){
        num = i++;
        var detailPath = this.attr('href');
        var url = '\''+website + detailPath+'\'\,\n';
        ws.write(url);
        detailUrls.push(url);
      }, console.log('test'));
    }
  });
};

/*for (var url in detailUrls) {
  console.log('fail');
  request(detailUrls[url], function(err, resp, body){
    console.log('almost success');
    if(!err && resp.statusCode == 200) {
      console.log('success');
      //var $ = cheerio.load(body);
    }
  });
}*/
