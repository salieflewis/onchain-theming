This implementation of a drawer component, including the file structure, is heavily inspired from the code found [here](https://github.com/dblodorn/blocksyncer/tree/df57a483ccea9bd20ba1297b49479b821e0aab44/%40popout)

# Documentation

`DrawerProvider`
Allows the state of the drawer to be accessed via the `useDrawer` hook.

`DrawerPortal`

`document.querySelector()` searches the DOM for the first element that matches the specified CSS selector and returns `null` if no matching element is found. In this case the code is searching for an html element with the id of `drawer-root` which is specified in the `DrawerProvider`.
