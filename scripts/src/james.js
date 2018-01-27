/*
play.js

A web playground for testing new ideas...
*/


import {el, go, log, inspect, __} from 'elementsJS'



const toggler =(l)=> {
  log(l.visibility());
// Set visibility according to current setting...
  (l.visibility() == 'visible')?
    l.viz('hidden')
  :
    l.viz('visible')
}

const showHeader =()=>
// Set timers for toggle function...
  setTimeout(()=> {
    <'#head'/>
      .class('show', '+');
  }, 300)


const lick =()=>
// Set timers for toggle function...
  setTimeout(()=> {
    <'#licker'/>
      .viz('visible');
    setTimeout(()=> {
      <'#licker'/>
        .viz('hidden');
      showHeader();
    }, 800)
  }, 700)


const blinkLickNShowHeader =()=>
// Set timers for toggle function...
  setTimeout(()=> {
    <'#hero'/>
      .viz('hidden');
    setTimeout(()=> {
      <'#hero'/>
        .viz('visible');
      lick();
    }, 200)
  }, 3000)



go(
  ()=>
    {
      blinkLickNShowHeader();
    }
  )


log("hello there you.", ["red", "bold"]);
