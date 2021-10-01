import * as dropdown from './dropdown.js'
import * as card from './cardBuilder.js'

const request = new XMLHttpRequest()
request.open(
    'GET',
    'http://localhost:3004/players',
    true
)
request.setRequestHeader("Accept", "application/json");
request.send()

export let playersList = {}

request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
        const status = request.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            playersList = JSON.parse(request.response)
            dropdown.buildDropdown()
            addDisplayableStats()
            calculationStatsAddition()
            populatePage(playersList[0])
        }
    }
}

export function populatePage(selectedPlayer) {
    card.buildNameAndPosition(selectedPlayer)
    card.buildStatItemsList(selectedPlayer)
    card.addPlayerPortrait(selectedPlayer)
    card.addTeamLogo(selectedPlayer)
}

const statisticMapping = {
    'appearances': 'Appearances',
    'goals': 'Goals',
    'goal_assist': 'Assists'
}

function addDisplayableStats() {
    playersList.forEach(playerObject => {
        playerObject.displayableStats = []
        playerObject.stats.forEach(stat => {
            if (statisticMapping[stat.name]) {
                let displayableStat = {}
                displayableStat['name'] = statisticMapping[stat.name]
                displayableStat['value'] = stat.value
                playerObject.displayableStats.push(displayableStat)
            }
        })
    })
}

/*
 * Creating stats which require calculation
 */
function calculationStatsAddition() {
    playersList.forEach(playerObject => {
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
