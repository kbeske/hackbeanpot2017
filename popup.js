// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/**
function renderTabs(tabs) {
  var statuses = document.getElementById('status');

  tabs.forEach(function(tab) {
    var status = document.createElement("div");
    var container = document.createElement("div");
      var favIconImage = document.createElement("img");
        var titleText = document.createElement("span");
          var xbutton = document.createElement("button");
            var xImage = document.createElement("img");
              var tabButton = document.createElement("button");
    xImage.src = "http://www.91-cdn.com/wap/images/cross-icon.png";
    xbutton.appendChild(xImage);
    titleText.textContent = tab.title;
    favIconImage.src = tab.favIconUrl;
    container.setAttribute('class', 'contain');
    container.appendChild(xbutton);
    container.appendChild(favIconImage);
    tabButton.appendChild(titleText);
    container.appendChild(tabButton);



    favIconImage.setAttribute('class', 'iconbox')


    titleText.setAttribute('class', 'span');


    //status.appendChild(button);
  
    //status.appendChild(favIconImage);
    //status.appendChild(titleText);
    status.appendChild(container);
    statuses.appendChild(status);
        xbutton.addEventListener("click", function(){
          chrome.tabs.remove(tab.id);
          status.removeChild(container);
        });
        tabButton.addEventListener("click", function(){
          chrome.tabs.update(tab.id, {active: true});
        })
  })
}**/

function renderTabs(tabs) {
  var statuses = document.getElementById('status');

  tabs.forEach(function(tab) {
    var status = document.createElement("div");
    var container = document.createElement("div");
      var favIconImage = document.createElement("img");
        var titleText = document.createElement("span");
          var xbutton = document.createElement("button");
            var xImage = document.createElement("img");
    xImage.src = "http://www.91-cdn.com/wap/images/cross-icon.png";
    xbutton.appendChild(xImage);
    titleText.textContent = tab.title;
    favIconImage.src = tab.favIconUrl;
    container.setAttribute('class', 'contain');
    container.appendChild(xbutton);
    container.appendChild(favIconImage);
    container.appendChild(titleText);



    favIconImage.setAttribute('class', 'iconbox')


    titleText.setAttribute('class', 'span');


    //status.appendChild(button);
  
    //status.appendChild(favIconImage);
    //status.appendChild(titleText);
    status.appendChild(container);
    statuses.appendChild(status);
        xbutton.addEventListener("click", function(){
          chrome.tabs.remove(tab.id);
          status.removeChild(container);
        });
  })
}


document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({}, function(tabs) {

  var visitPromises = tabs.map(function(tab){
    return new Promise(function(resolve, reject){
      chrome.history.getVisits({url: tab.url}, function(results) {
        
        if(results.length === 0) {
          tab.visitTime = 0;
        }
        else {
        tab.visitTime = results[0].vistTime;
      }
        resolve(tab);
      
      })
    })
  })

  Promise.all(visitPromises).then(function(allTabs){
    allTabs = allTabs.sort(function(t1, t2){
      return t1.visitTime - t2.visitTime;
    })
    renderTabs(allTabs);
  })
  })  
});


/*
function renderTabs(tabs) {
  var statuses = document.getElementById('status');
  tabs.forEach(function(tab) {
    var status = document.createElement("div");
      var favIconImage = document.createElement("img");
        var titleText = document.createElement("span");
          var button = document.createElement("button");
            var xImage = document.createElement("img");
    xImage.src = "http://www.91-cdn.com/wap/images/cross-icon.png";
    button.appendChild(xImage);
    titleText.textContent = tab.title;
    favIconImage.src = tab.favIconUrl;
    status.appendChild(button);
    status.appendChild(favIconImage);
    status.appendChild(titleText);
    statuses.appendChild(status);
        button.addEventListener("click", function(){
      chrome.tabs.remove(tab.id);
      status.removeChild(button);
      status.removeChild(favIconImage);
      status.removeChild(titleText);
    });
  })
}

function sortTabs(tabs) {
  //tabs.sort();
  //chrome.history.getVisits(tabs.get[0]);
  tabs.sort(function(a, b) {
    return (chrome.history.getVisits({url : a.url},
      function(visitItems) {
        return visitItems[0].visitTime;
      }) -
      chrome.history.getVisits({url : b.url},
        function(visitItems) {
          return visitItems[0].visitTime;
    }));
    console.log(tabs);
  })
      // return (chrome.history.getVisits(a, getVisitTime() -
      // chrome.history.getVisits(b, getVisitTime));
  //var tabs[];
  //tabs.forEach(function(tab) {

  //})
}

function getVisitTime(visitItems) {
  visitItems.getVisitTime;
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({}, function(tabs) {
    sortTabs(tabs);
    renderTabs(tabs);
    //renderTabs(sortTabs(tabs));
  })

});
*/
