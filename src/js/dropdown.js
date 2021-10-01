import * as index from './index.js'

export function buildDropdown() {
    const dropdownMenu = document.getElementById('DropDownMenu')

    index.playersList.forEach(({ player }) => {
        let menuOption = document.createElement('div')

        let optionClasses = ['option', 'grey-box']
        menuOption.classList.add(...optionClasses)
        menuOption.innerHTML = `${player.name.first} ${player.name.last}`

        dropdownMenu.appendChild(menuOption)
    })

    // Get elements
    const dropdownTitle = document.getElementById('SelectedPlayerName'),
        dropdownOptions = document.querySelectorAll('#DropDownMenu .option')

    // Bind listeners to these elements
    dropdownTitle.addEventListener('click', toggleMenuDisplay)
    dropdownOptions.forEach(option => option.addEventListener('click', handleOptionSelected))
}

export function toggleClass(element, className){
    if (element.className.indexOf(className) !== -1) {
        element.className = element.className.replace(className,'')
    }
    else{
        element.className = element.className.replace(/\s+/g,' ') + 	' ' + className
    }

    return element
}

export function toggleMenuDisplay() {
    const menu = document.getElementById('DropDownMenu'),
        icon = document.getElementById('Caret')

    toggleClass(menu,'hide')
    toggleClass(icon,'rotate-90')
}

export function handleOptionSelected(event) {
    toggleClass(event.target.parentNode, 'hide')

    const newValue = event.target.textContent
    index.populatePage(index.playersList.find(({ player }) => newValue === `${player.name.first} ${player.name.last}`))
    const titleElement = document.getElementById('SelectedPlayerName')
    const icon = document.getElementById('Caret')


    titleElement.textContent = newValue
    titleElement.appendChild(icon)

    // Trigger custom event
    titleElement.dispatchEvent(new Event('change'))
    // SetTimeout is used so transition is properly shown
    setTimeout(() => toggleClass(icon,'rotate-90'),0)
}
