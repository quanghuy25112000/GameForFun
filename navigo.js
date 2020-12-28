var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);
import {getItemLocalStorage} from './ultis.js'
router
  .on({
    'login': function () {
      redirect('login')
    },
    'register': function () {
      redirect('register')
    },
    // 'main': function () {
    //   redirect('main')
    // },
    'main':async function () {
      const check=await checkAuthen()
      if(check){
        redirect('main')
      }
      else router.navigate('login')
      },
    'mode': function(){
      redirect(`mode`)
    },
    'easy': function(){
      redirect(`easy`)
    },
    'hard': function(){
      redirect(`hard`)
    },
    'difficult': function(){
      redirect(`difficult`)
    },
    'end': function(){
      redirect(`end`)
    },
    'victory': function(){
      redirect(`victory`)
    },
    'rank': function(){
      redirect(`rank`)
    },
    '*': function () {
     router.navigate('login')
    }
  })
  .resolve();
  function redirect(screenName){
    if(screenName == 'register'){
        document.getElementById('game').innerHTML = `
            <register-screen></register-screen>
        `
    }else if(screenName == 'login'){
        document.getElementById('game').innerHTML = `
        <login-screen></login-screen>
        `
    }else if(screenName == 'main'){
        document.getElementById('game').innerHTML=`
            <main-screen></main-screen>
        `
    }
    else if(screenName == 'mode'){
      document.getElementById('game').innerHTML=`
          <mode-screen></mode-screen>
      `
    }
    else if(screenName == 'easy'){
      document.getElementById('game').innerHTML=`
          <gameplay1-screen></gameplay1-screen>
      `
    }
    else if(screenName == 'hard'){
      document.getElementById('game').innerHTML=`
          <gameplay2-screen></gameplay2-screen>
      `
    }
    else if(screenName == 'difficult'){
      document.getElementById('game').innerHTML=`
          <gameplay3-screen></gameplay3-screen>
      `
    }
    else if(screenName == 'end'){
      document.getElementById('game').innerHTML=`
          <end-screen></end-screen>
      `
    }
    else if(screenName == 'victory'){
      document.getElementById('game').innerHTML=`
          <victory-screen></victory-screen>
      `
    }
    else if(screenName == 'rank'){
      document.getElementById('game').innerHTML=`
          <rank-screen></rank-screen>
      `
    }
}

async function checkAuthen(){
    const user = getItemLocalStorage('currentUser');
    if(user){
        const res = await firebase.firestore().collection('user').where('gmail','==',user.gmail).where('password','==',user.password).get();
            if(res.empty ) {
                return false
            } else {
                return true
            }
    }
    else {
         return false
    }
}
window.router=router