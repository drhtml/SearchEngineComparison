import React, { useState } from 'react'
import "./ComparisonSearch.css";
import axios from 'axios';

export default function GoogleSearch() { 
  const [searchtext, setSearchtext] = useState("");
  const [googleresults, setGoogleResults] = useState([]);
  const [bingresults, setBingResults] = useState([]);

  function GoogleSearchAPI() {
    //console.log(searchtext);
    const options = {
      method: 'GET',
      url: 'https://google-search74.p.rapidapi.com/',
      params: { query: `${searchtext}`, limit: '30', related_keywords: 'true' },
      headers: {
        'X-RapidAPI-Key': '708e3145abmshcae274586e3b04fp10b043jsn2d09253f8e7a',
        'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) { 
      console.log(response.data.results); 
      setGoogleResults(response.data.results)       
    }).catch(function (error) {
      console.error(error);
    }); 
  }

  function BingSearchAPI() {
    //console.log(searchtext);
    const options = {
      method: 'GET',
      url: 'https://bing-web-search1.p.rapidapi.com/search',
      params: {
        q: `'${searchtext}'`,  
        'responseFilter[0]': 'Webpages',         
        mkt: 'en-us',
        safeSearch: 'Off',
        textFormat: 'Raw',
        freshness: 'Day'
      },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '708e3145abmshcae274586e3b04fp10b043jsn2d09253f8e7a',
        'X-RapidAPI-Host': 'bing-web-search1.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data.value);
      setBingResults(response.data.value); 
    }).catch(function (error) {
      console.error(error);
    });
  }

  function SerchWeb() {
    GoogleSearchAPI();
    BingSearchAPI();
  }

  

  return (
    <>

      <div className='comparison-search'>
        <div className='search-box'>
          <div className="input-group">
            <input type="text" className="form-control" value={searchtext} onChange={(e) => setSearchtext(e.target.value)} placeholder="Type here..." aria-label="Search" aria-describedby="SeachBtnaddon2" />
            <button className="search-btn" type="button" id="SeachBtn" onClick={SerchWeb}>Search</button>
          </div>
        </div>
        <div className='comparison-search-result'>
          <div className='google-result'>
            <div className='search-head'>GOOGLE SEARCH</div>
            <ul>
              {
                googleresults.map((google) =>
                  <li>
                    <a href={google.url}>
                      <span>{google.url}</span>
                      <h2>{google.title}e</h2>
                    </a>
                    <span className='search-info'>{google.description}</span>
                  </li>
                )
              }
            </ul>
          </div>
          <div className='bing-result'>
            <div className='search-head'>BING SEARCH</div>
            <ul>
              {
                bingresults.map((bing) =>
                  <li> 
                    <a href={bing.url}>
                      <span>{bing.url}</span>
                      <h2>{bing.name}</h2>
                    </a>
                    <span className='search-info'>{bing.description}</span>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
