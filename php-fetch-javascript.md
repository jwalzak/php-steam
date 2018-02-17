# How to get Information from you PHP backend to your JavaScript front end.

When you do an API call to a different server sometimes the API owner doesn't want you to use it with a front end language such as JavaScript. APIs like the Steam API, something I've been wanting to use for a very long time. My current host doesn't support NodeJS so my choice is PHP. 

For me it's been a few months since last using PHP so my memory wasn't so great on it. I always forget to initialize the PHP file with `<?php`.

I've never used PHP for an API call before so the first thing I have to look up, is how to make a remote call with PHP. My application is going to be pretty simple and I don't want to use any helper libaries. The first solution I find is cURL. I don't know anything about cURL so let's go to Wikipedia to find out more:

> cURL is a command line tool for getting or sending files using URL syntax.

So let's get into the cURL portion of the code

`function getSteamData($url){
  $curl = curl_init();
  // $file = 'data.json';

  curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $url
  ));

  $resp = curl_exec($curl);
  curl_close($curl);
  
  echo $resp;
}`

curl_init() and curl_close() are used as you might imagine to begin and finish your cURL session.

`curl_setopt_array()` will set your options for the cURL transfer. The first argument is the cURL resource. The second argument is an array setting the values that you want.
