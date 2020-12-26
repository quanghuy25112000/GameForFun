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
        <gameplay-screen></gameplay-screen>
        `
    }else if(screenName == 'main'){
        document.getElementById('game').innerHTML=`
            <main-screen></main-screen>
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