/* This will take the data from the PHP backend
and use it for displaying my Steam information */
let elementArray = {
  avatar: document.createElement('img'),
  name: document.createElement('h1'),
}

fetch('./ajax.php?action=steam', {
  method: 'GET',
})
  .then(res => res.json())
  .then(res => {
    console.log(res)
    return res
  })
  .then(res => {
    const dataPath = res.response.players[0]
    const steamInfo = {
      avatarImg: dataPath.avatarfull,
      nameString: dataPath.personaname,
      timestamp: dataPath.timecreated,
    }
    const image_div = document.querySelector('.img__div')
    const timeCreated = convertTimestamp(steamInfo.timestamp)
    image_div.appendChild(elementArray.name)
    image_div.appendChild(elementArray.avatar)
    elementArray.name.textContent = `${
      steamInfo.nameString
    } has been a member of Steam since ${timeCreated}`
    elementArray.avatar.setAttribute('src', steamInfo.avatarImg)
    console.log(timeCreated)
  })
  .catch(e => console.error(`Something is bad ${e}`))
  
  // Second Request
  fetch('./ajax.php?action=owned', {
    method: 'GET',
  })
  .then(res => res.json())
  .then(res => {
    const gameData = res.response.games
    const sortGameData = gameData.sort((a, b) => {
      return a.playtime_forever - b.playtime_forever
    })
    let topTen = sortGameData.slice(Math.max(sortGameData.length - 10, 10))
    console.log(topTen)
    displayGames(topTen)
  })
  .catch(e => console.error(`The player request did not go through. ${e}`))

function convertTimestamp(timestamp) {
  let d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
    ampm = 'AM',
    time

  if (hh > 12) {
    h = hh - 12
    ampm = 'PM'
  } else if (hh === 12) {
    h = 12
    ampm = 'PM'
  } else if (hh == 0) {
    h = 12
  }

  // ie: 2013-02-18, 8:35 AM
  time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm

  return time
}

function displayGames(sortedGames) {
  const baseImgUrl =
    'http://media.steampowered.com/steamcommunity/public/images/apps/'
  const imgEl = document.createElement('img')
  const imgDiv = document.querySelector('.img__div')

  const gameDisplay = sortedGames.map(game => {
    const appId = game.appid
    const hash = game.img_logo_url
    imgEl.innerHTML += `<img src=${baseImgUrl}${appId}/${hash}.jpg />`
    imgDiv.appendChild(imgEl)
  })
}
