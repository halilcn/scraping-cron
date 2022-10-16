const cheerio = require('cheerio');


const hurriyetEmlakCron=()=>{
    const $ = cheerio.load('<h2 class="title">Hello world</h2>');

    $('h2.title').text('Hello there!');
    $('h2').addClass('welcome');

    console.log( $.html());

}

export default hurriyetEmlakCron;
