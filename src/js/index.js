const request = new XMLHttpRequest()
request.open(
    'GET',
    'http://localhost:3004/players',
    true
)
request.setRequestHeader("Accept", "application/json");
request.send()

request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
        const status = request.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            console.log(JSON.parse(request.response));
            populatePage(JSON.parse(request.response))
        }
    }
}
const positionMapping = {
    'D': 'Defender',
    'M': 'Midfielder',
    'F': 'Striker'
}
    // statisticMapping = {
    //     'goals': 'Goals',
    //     'goal_assist': 'Assists',
    //     'appearances': 'Appearances'
    // }

function populatePage(playerStats) {
    // const select = document.getElementById('PlayerSelect'),
    //     portrait = document.getElementById('PlayerPortrait'),
    //     teamLogo = document.getElementById('TeamLogo')

    buildNameAndPosition(playerStats[0])
    buildStatItemsList(playerStats[0])
}

// function buildSelect(playerStats) {}

function buildNameAndPosition({ player }) {
    const name = document.getElementById('PlayerName'),
        position = document.getElementById('PlayerPosition')

    name.innerHTML = `${player.name.first} ${player.name.last}`
    position.innerHTML = `${positionMapping[player.info.position]}`
}

function buildStatItemsList(player) {
    const statList = document.getElementById('StatItemList'),
        { stats } = player

    stats.forEach(stat => {
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
        statList.appendChild(itemBox)
    })

}
