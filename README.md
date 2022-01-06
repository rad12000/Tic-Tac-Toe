# TIC-TAC-TOE mini-project
The goal here is to write the logic for a tic-tac-toe game. You have the basic outline for what you'll need below. The handleBoxClick function will be called each time the user clicks a box. Your code should do the following when a box is clicked:

1. Check if the box already has been assigned. If so, don't do anything.
2. Check if someone has already won. If so, don't do anything.
3. Update the gamebox for the correct box to either an `xMark` or `oMark`. Be sure to call `refreshView()` each time you update the `gamebox` variable!
4. Check if there is a winner or if it's a Cat game. If so, output the result using the `displayMessage("some message...")` function.

------
Out of the box, the user is already able to reset the board. There should be no need to update any CSS or HTML to complete this project––only Javascript. To get started, open the `index.html` file in the `start/` folder, and then start changing the `tic-tac-toe.js` file. Good luck!