const request = new XMLHttpRequest()
request.open(
    'GET',
    'http://localhost:3004/players',
    true
)
request.setRequestHeader("Accept", "application/json");
request.send()

let playersObject = {}

request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
        const status = request.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            playersObject = JSON.parse(request.response)
            addDisplayableStats()
            calculationStatsAddition()
            console.log(playersObject);
            populatePage(playersObject)
        }
    }
}
const positionMapping = {
    'D': 'Defender',
    'M': 'Midfielder',
    'F': 'Striker'
},
    statisticMapping = {
        'appearances': 'Appearances',
        'goals': 'Goals',
        'goal_assist': 'Assists'
    }

function populatePage(playerStats) {
    // const select = document.getElementById('PlayerSelect'),
    //     teamLogo = document.getElementById('TeamLogo')

    buildNameAndPosition(playerStats[0])
    buildStatItemsList(playerStats[0])
    addPlayerPortrait(playerStats[0])
}

function addPlayerPortrait({ player }) {
    const portraitWrapper = document.getElementById('PlayerPortrait'),
        portraitImgTag = document.createElement('img')

    portraitImgTag.setAttribute('src', `../assets/images/${player.name.first}${player.name.last}.png`)
    portraitImgTag.setAttribute('alt', `${player.name.first} ${player.name.last} Portrait`)

    portraitWrapper.appendChild(portraitImgTag)

}

// function buildSelect(playerStats) {}

function buildNameAndPosition({ player }) {
    const name = document.getElementById('PlayerName'),
        position = document.getElementById('PlayerPosition')

    name.innerHTML = `${player.name.first} ${player.name.last}`
    position.innerHTML = `${positionMapping[player.info.position]}`
}

function addDisplayableStats() {
    playersObject.forEach(playerObject => {
        playerObject.displayableStats = []
        playerObject.stats.forEach(stat => {
            if (statisticMapping[stat.name]) {
                let displayableStat = {}
                displayableStat['name'] = statisticMapping[stat.name]
                displayableStat['value'] = stat.value
                playerObject.displayableStats.push(displayableStat)
            }
        })


        // Calculate goal
    })
}

/*
 * Creating stats which require calculation
 */
function calculationStatsAddition() {
    playersObject.forEach(playerObject => {
        let totalGoals = playerObject.displayableStats.find(stat => stat['name'] === 'Goals'),
            appearances = playerObject.displayableStats.find(stat => stat['name'] === 'Appearances'),
            fwdPass = playerObject.stats.find(stat => stat['name'] === 'fwd_pass'),
            backwardPass = playerObject.stats.find(stat => stat['name'] === 'backward_pass'),
            minutesPlayed = playerObject.stats.find(stat => stat['name'] === 'mins_played'),
            goalPerMatchObject = {},
            passesPerMinute = {}

        goalPerMatchObject['name'] = 'Goals per match'
        goalPerMatchObject['value'] = (totalGoals['value'] / appearances['value']).toFixed(2)
        playerObject.displayableStats.push(goalPerMatchObject)

        passesPerMinute['name'] = 'Passes per minute'
        passesPerMinute['value'] = ((fwdPass['value'] + backwardPass['value']) / minutesPlayed['value']).toFixed(2)
        playerObject.displayableStats.push(passesPerMinute)

    })

}

function buildStatItemsList({ displayableStats }) {
    displayableStats.forEach(stat => {
        let itemBox = document.createElement('div'),
            statName = document.createElement('span'),
            statValue = document.createElement('span')


        statName.innerHTML = stat.name
        statName.className = 'stat-name'

        statValue.innerHTML = stat.value
        statValue.className = 'stat-value'

        const itemBoxClasses = ['stat-item-box', 'grey-box']
        itemBox.classList.add(...itemBoxClasses)
        itemBox.appendChild(statName)
        itemBox.appendChild(statValue)
        document.getElementById('StatItemList').appendChild(itemBox)
    })
}
