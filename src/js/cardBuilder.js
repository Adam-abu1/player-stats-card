const positionMapping = {
        'D': 'Defender',
        'M': 'Midfielder',
        'F': 'Striker'
    }

export function addPlayerPortrait({ player }) {
    const portraitImgTag = document.getElementById('PlayerPortrait')

    portraitImgTag.setAttribute('src', `../assets/images/${player.name.first}${player.name.last}.png`)
    portraitImgTag.setAttribute('alt', `${player.name.first} ${player.name.last} Portrait`)
}

export function buildNameAndPosition({ player }) {
    const name = document.getElementById('PlayerName'),
        position = document.getElementById('PlayerPosition')

    name.innerHTML = `${player.name.first} ${player.name.last}`
    position.innerHTML = `${positionMapping[player.info.position]}`
}

export function addTeamLogo({ player }) {
    const teamLogo = document.getElementById('TeamLogo')

    teamLogo.setAttribute('class', `${ player.currentTeam.name.replace(' ', '')}`)
}

export function buildStatItemsList({ displayableStats }) {
    const statItemList =  document.getElementById('StatItemList')
    statItemList.innerHTML = ""

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
        statItemList.appendChild(itemBox)
    })
}
