import {initializeApp} from 'firebase/app';

import {
    getAuth,signInWithRedirect,signInWithEmailAndPassword,
    signInWithPopup, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged} 
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)
  // export const signInWithGoogleRedirect= () => signInWithRedirect(auth,googleProvider) //take an auth and a provider(google in this case)

  export const db = getFirestore()


  export const createUserDocumentFromAuth = async (userAuth,additionalInformation) => {
    if (!userAuth) return
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
            displayName,
            email,
            createdAt,
            ...additionalInformation,
          })
      } catch (error){

        console.log('error creating the us', error.message)

      }

    }

    return userDocRef

  }

  export const createAuthUserWithEmailAndPassword = async (email,password) => {

    if (!email || !password) return 

   return await createUserWithEmailAndPassword(auth,email,password)
  }

  export const signInAuthWithEmailAndPassword = async (email,password) => {

    if (!email || !password) return 

   return await signInWithEmailAndPassword(auth,email,password)
  }

  export const signOutUser = async () => signOut(auth)


  export const onAuthStateChangedListener = (callback) => 
    // onAuthStateChanged(auth, callback,errorCallback,completedCallback)
    onAuthStateChanged(auth, callback)

  

    // {
    //   next: callback,
    //   error: error
    // }