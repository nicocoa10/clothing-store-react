import {initializeApp} from 'firebase/app';

import {
    getAuth,signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider} 
    from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDxXQXLq5LP71CUVa6g2oQcbBLrHWYMu3g",
    authDomain: "crwn-clothing-db-aafc7.firebaseapp.com",
    projectId: "crwn-clothing-db-aafc7",
    storageBucket: "crwn-clothing-db-aafc7.appspot.com",
    messagingSenderId: "935265116598",
    appId: "1:935265116598:web:b99be43c87b630c4f3a117"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider)

  export const db = getFirestore()


  export const createUserDocumentFromAuth = async (userAuth) => {

    const userDocRef = doc(db,'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

        //firs check if user data exists
    //return userDocRef

    //if user data does not exist
    //create / sset the document with the data from userAuth in my collection

    if (!userSnapshot.exists()){
      const {displayName, email} = userAuth
      const createdAt = new Date()

      try{
        await setDoc(userDocRef, 
          {
            displayName,email,createdAt
          })
      } catch (error){

        console.log('error creating the us', error.message)

      }

    }

    return userDocRef

  }