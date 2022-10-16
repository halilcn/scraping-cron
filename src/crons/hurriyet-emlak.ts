import { Element } from "cheerio";

const cheerio = require('cheerio');
const axios = require('axios');


const hurriyetEmlakCron=async ()=>{
    const { data }=await axios.get('https://www.hepsiemlak.com/istanbul-kiralik')

    const $ = cheerio.load(data);

    $(".img-link").each((_:number,element:Element)=>{
        console.log(element.attribs.href);
    })


}

export default hurriyetEmlakCron;
