# doordash
    A app for chat

# Node configuration for this project
    snv-bpatel:drds bpatel$ nvm version 
    v8.16.0
    bpatel:doordash bpatel$ npm -v 
    6.4.1
    
    
    You will need to install node modules first. Do the following.
    
    bpatel:doordash bpatel$ npm install 
    
 # Resolve error 
 
 If you get error about "npm rebuild node-sass".
 
 Please run that commnand.

# Unit testing 

jest and enzyme is used for unit testing in this project.   To run unit test do the following.   
    
    bpatel:doordash bpatel$ jest test 

To check the code coverage by unit tests run the following comamnd.

     bpatel:doordash bpatel$ jest --coverage -u
      
------------------------|----------|----------|----------|----------|-------------------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------------|----------|----------|----------|----------|-------------------|
All files               |    87.67 |    66.67 |    91.38 |     87.5 |                   |
 components/chat-window |    88.89 |    66.67 |       80 |    88.89 |                   |
  chatwindow.js         |    88.89 |    66.67 |       80 |    88.89 |         22,47,101 |
  index.js              |        0 |        0 |        0 |        0 |                   |
 components/group-chat  |    81.03 |    65.71 |       85 |    81.03 |                   |
  groupchat.js          |    81.03 |    65.71 |       85 |    81.03 |... 30,137,142,154 |
  index.js              |        0 |        0 |        0 |        0 |                   |
 components/login       |      100 |    83.33 |      100 |      100 |                   |
  index.js              |        0 |        0 |        0 |        0 |                   |
  login.js              |      100 |    83.33 |      100 |      100 |                24 |
 components/rooms       |      100 |      100 |      100 |      100 |                   |
  index.js              |        0 |        0 |        0 |        0 |                   |
  room.js               |      100 |      100 |      100 |      100 |                   |
 services               |    84.62 |       50 |      100 |    84.62 |                   |
  apiService.js         |    84.62 |       50 |      100 |    84.62 |       18,40,70,93 |
------------------------|----------|----------|----------|----------|-------------------|
        

# Run the application

This is a node and webpack based project. npm command can be used to run the application. 

    bpatel:doordash bpatel$ npm run start
    

If built/compiled successfully the app will run on http://localhost:8082

    Built at: 12/04/2019 4:57:56 PM
         Asset       Size  Chunks                   Chunk Names
     bundle.js   1.47 MiB    main  [emitted]        main
    bundle.map   2.62 MiB    main  [emitted] [dev]  main
    index.html  806 bytes          [emitted]        
    Entrypoint main = bundle.js bundle.map


# Future enhancements

The redux integration is done successfully and it was working. The final changes do not have the redux piece in working condition.


