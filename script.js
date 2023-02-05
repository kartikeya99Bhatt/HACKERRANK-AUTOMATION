const codeObj=require('./codeAns.js')
// puppeteer : it is used in automation , webscrapping and it allows us to control Chrome or Chromium 
const puppeteer=require('puppeteer'); // importing puppeter

// personal details
const email='kartikeyabhatt0@gmail.com';
const password='8449045248'
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let browserOpen=puppeteer.launch({// initialize the chrome the chrome get open but it will not visible right now 
    headless:false, // with it the chrome is visible to us 
    args:['--start-maximized'], // it will open in full screen
    defaultViewport:null
});

const login='https://www.hackerrank.com/auth/login';  // link of hackerrank login page
let page;

browserOpen.then(function(browserobj){
    let browserOpenPromise=browserobj.newPage(); //it will open new page 
    return browserOpenPromise;
}).then(function(newTab){ // hackerrank login page open
   page=newTab;
   let hackerRankOpenPromise=newTab.goto(login);
   return hackerRankOpenPromise;
}).then(function(){ //inputing the email/Username
    let emailEntered=page.type("input[id='input-1']",email,{delay:50})
    return emailEntered;
 })
.then(function(){
    let passEntered=page.type("input[id='input-2']",password,{delay:50})
    return passEntered;
}).then(function(){
    let logInPage=page.click("button[data-analytics='LoginPassword']",{delay:50})
    return logInPage;
}).then(function(){
    let clickOnAlgo=WaiteAndClick(".topic-card a[data-attr1='algorithms']",page);
    return clickOnAlgo
}).then(function(){
    let clickOnWarmup=WaiteAndClick("input[value='warmup']",page);
    return clickOnWarmup;
}).then(function(){
    /*
      $=querySelector
      $$=querySelectorAll
    */
    let allChallagesProblems=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay:50});
    return allChallagesProblems;
}).then(function(questionsArray){
    console.log("The length is ",questionsArray.length);
    let questionWillBeSolved=questionSolver(page,questionsArray[0],codeObj.ans[0]);
    return questionWillBeSolved;
})


function WaiteAndClick(selector,currPage){
    return new Promise(function(resolve,reject){
        let waitfotpromice=currPage.waitForSelector(selector); // waitForSelector is a function 
        waitfotpromice.then(function(){
            let clickModel=currPage.click(selector);
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClick=question.click();
        questionWillBeClick.then(function(){
          let EditorInFocus= WaiteAndClick('.monaco-editor.no-user-select.vs',page);
          return EditorInFocus;
        }).then(function(){
            return WaiteAndClick(".checkbox-input",page);
        }).then(function(){
            return WaiteAndClick("textarea.custominput",page);
        }).then(function(){
            return page.type("textarea.custominput","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",/*{delay:50}*/);
        }).then(function(){
            let controlIsPressed=page.keyboard.down("Control");
            return controlIsPressed;
        }).then(function(){
            let controlAndApress=page.keyboard.press('A',/*{delay:100}*/);
            return controlAndApress;
          }).then(function(){
            let controlAndApress=page.keyboard.press('C',/*{delay:100}*/);
            return controlAndApress;
         })
         .then(function(){
            let controlAndXpress=page.keyboard.press('X',/*{delay:10}*/);
            return controlAndXpress;
         })
         .then(function(){
            let cntIsUnpress=page.keyboard.up("Control");
             return cntIsUnpress;
         })
         .then(function(){
            return WaiteAndClick('.monaco-editor.no-user-select.vs',page,{delay:50});
         })
        .then(function(){
            let controlIsPressed=page.keyboard.down("Control");
            return controlIsPressed;
         })
        .then(function(){
            console.log("My name is kartikeya bhatt");
            let controlAndApress=page.keyboard.press('A');
            return controlAndApress;
          })
          
         .then(function(){
            let controlAndXpress=page.keyboard.press('V',/*{delay:10}*/);
            return controlAndXpress;
        })
        .then(function(){
           let summitPage= page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
           return summitPage;
        })
        .then(function(){
            let cntIsUnpress=page.keyboard.up("Control");
             return cntIsUnpress;
         })
        
    })
}



