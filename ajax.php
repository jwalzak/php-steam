<?php
/* A simple app to using CURL to retrieve my Steam Account Data from the Steam servers */

  $config = parse_ini_file('./api-keys.ini', true); // Gets the API keys
  $ACCESS_KEY = $config['ACCESS_KEY']; // Steam API key
  $STEAM_ID = $config['STEAM_ID']; // My steam ID

// The URL to send use in the cURL request
$playerSummarySteam = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='.$ACCESS_KEY.'&steamids='.$STEAM_ID;
$playedGames = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key='.$ACCESS_KEY.'&steamid='.$STEAM_ID.'&format=json';
$gamesList = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?include_appinfo=1&include_played_free_games=1&key='.$ACCESS_KEY.'&steamid='.$STEAM_ID.'&format=json';


if(isset($_GET['action'])) {
  header('Content-Type: application/json');
  if($_GET['action'] == 'steam'){
    getSteamData($playerSummarySteam);
  }
  if($_GET['action'] == 'played'){
    getSteamData($playedGames);
  }
  if($_GET['action'] == 'owned'){
    getSteamData($gamesList);
  }
}

function getSteamData($url){
  $curl = curl_init();
  // $file = 'data.json';
  
  curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $url
  ));
  
  $resp = curl_exec($curl);
  curl_close($curl);
  
  echo $resp;
}

?>
