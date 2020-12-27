var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on({
    'login': function () {
      redirect('login')
    },
    'register': function () {
      redirect('register')
    },
    'main': function () {
        redirect('main')
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
}

async function chekAuthen(){
    const user = getItemLocalStorage('currentUser');
    if(user){
        const res = await firebase.firestore().collection('user').where('email','==',user.email).where('pass','==',user.pass).get();
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