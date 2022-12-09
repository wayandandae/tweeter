# Tweeter Project

Tweeter is a simple, single-page Twitter clone. It is built with Node and Express, using jQuery, AJAX, and CSS to fetch and process stored data.

## Final Product

!["Desktop View"]()
!["Tablet/Mobile View"]()
!["Hidden Input Field"]()
!["140 Character Counter"]()
!["Mouse Hover Effect"]()

## Dependencies

- Express
- Node 5.10.x or above
- Body-parser
- Chance
- MD5
- TimeAgo.js

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node server/index.js` or `npm start` command in root folder.
- Open `localhost:8080/` in your browser with the default port being 8080 (change PORT value in `server/index.js` in case of error).

## Stretches

- Reactive **Write a new tweet** button to toggle hide/reveal input field
- Alternating **Scroll-to-top** button and the toggle button to prompt user input
- ~~**SASS**~~

## Known Issues

- Clicking scroll-to-top button while scrolling the window will interrupt the event execution.
- ESLint returning undefined errors for `$`, `document`, `window`, `alert`, etc., while they are properly loaded and fully operational.