WELCOME

Before you start running the tests in this project, there are a few things you need to do. 

1.) Install node. 
    You can download and install node from here https://nodejs.org/en/download/
    Also feel free to install node with whatever package manager you might prefer

1.a) Although typescript was not implemented in ths project for time reasons, feel free to add it in anticipation of future improvements to this project. If you so desire, of course... 
    cd into project folder
    npm install --save-dev typescript
    or install globally
    npm install -g typescript

2.) clone the repo from here https://github.com/jamesmmorin/cypress-automation to an appropriate location

3.) in your command prompt, cd into the folder which contains the cloned repo and 
    npm i

4.) cd into project folder and install cypress. 
    npm install cypress --save-dev
NOTE: for future installs (if using VSC), with project open click on Terminal -> new terminal and execute commands from there

5.) you should be able to open the cypress test GUI by typing npx cypress open

6.) this project typically executes tests from the cypress test runner (test GUI). The way this project is set up, you open the test runner in a particular environment. For example, if you want to execute your tests in the development environment you would open the terminal in VSC and type the following command;
    npm run cy:dev
This command executes the following script npx cypress open --env fileConfig=dev. Addition scripts can be found in the 
package.json file. 
If you wanted to execute your tests in the qa environment, you would;
    npm run cy:qa
Etc. This gives the tester a lot of control over specific environment variables, and for this project is the recommended way to execute these tests. 

7.) As this is a mock test framework, these tests have all been executed in the development environment by running the command
    npm run cy:dev
The author suggests you do the same

If, however, you want to run them headless locally, you can do so by running the following command
    cy:local-dev
    this will run the tests locally, headless, in the dev environment. Please see the package.json file for additional scripts

8.) The api tests test this web page https://www.automationexercise.com/api_list and are just a couple of quick api verifications

