# Instock BrainStation Project - Backend/Server

## Instock BrainStation Project - Frontend
https://github.com/saksham1236/brnstn_instock-mp2-frontend

## Instock BrainStation Project - Backend
https://github.com/mikesdc/brnstn_instock-mp2-server

## Jira Board:
https://brainstationeducation.atlassian.net/jira/software/c/projects/MP2/boards/524

## Figma File:
https://www.figma.com/file/qLdwhUjqq5bKxoNYZ6v5Ze/U---InStock-Mockups?type=design&node-id=1196-0&mode=design


## Collaborators: Arjun, Micheal, Kate, Saksham

<img src = "https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg" alt = "meme">

## Stop it and git some help

Handy git cheatsheets i’ve been collecting:
https://education.github.com/git-cheat-sheet-education.pdf
https://gitexplorer.com/
https://web.archive.org/web/20230330012035/https://gitsheet.wtf/

### Credits Arjun

To set up databases locally:
1. Clone the server repo.
2. Install dependencies
3. On your MySQL server: `CREATE DATABASE instockmp2;`
4. On VSCode/terminal: `npx knex migrate:latest`
5. On VSCode/terminal: `npx knex seed:run`

Test if server is working:
1. VSCode/terminal: `nodemon server.js`
2. Browser: `localhost:8080/warehouses`
3. Browser: `localhost:8080/inventories`
