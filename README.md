# Frontend Development Task - Player Stats Card
![Player Stat Card example](./StatCard.jpg)
### Task

---
The purpose of this exercise is to demonstrate your ability to use front-end
languages to build a data driven component of a website.

Build a stats card component as displayed in the image to function and display accurately in Chrome,
Firefox and Edge. The user is expected to be able to select from a list of players to
view the relevant stats for that player.


In undertaking this task, please consider the following: 
- Semantic and accessible mark-up 
- CSS produced using SASS 
- Concise Javascript solution 
- Avoid using jQuery or an application framework 
- NodeJS for build/task workflow 
- Future reuse and extension of code 
- Any documentation / notes on build


## Project setup
### Starting up the player statistics mock API
```
# Run this command from the project root, add 

json-server --watch player-stats.json --port 3004
```
### Building and running the app
To build the project and run the server run the default task by just typing:
```
gulp
```

### Linting the JavaScript
By default, the project uses the recommended eslint rules
```
gulp jsLint
```

### Generating a new spritesheet
The committed spritesheet should have all necessary sprites on it however if you wish to add more then you must add the image with file extension of .PNG
to `./assets/sprites` directory then run :
```
gulp spriteSheet
```
This will generate and compress a new spritesheet image in `./assets/spritesheet` then also add a `./src/sass/spriteSheet.sass` file
to be used pointing to the different sprites

## My process

### Built with

- HTML5 markup
- SASS 
- Flexbox
- CSS Grid
- Gulp JS + numerous plugins alongside Gulp
- ESLint
- Json-server to serve as a mock API

## Future additions and improvements

When coming back to this project areas that I would like to focus on, features, refactoring and additions that I would make are:

- Become a lot more accustomed to gulp for more in detailed and faster building of task
- Clean up the logo sprites issue that had been commented out  
- Implementing the watch feature to recompile and styling and javascript without rebuild project most likely using compass
- Add in SASS linter and write up a sass lint configuration
- Clean build directory gulp task
- Have the json data served using gulp if possible rather than a different package to save trouble of using a different port
- Build out ESLint configuration deeper rather than just using recommended 
