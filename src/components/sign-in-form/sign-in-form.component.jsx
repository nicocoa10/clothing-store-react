import { useState } from 'react'
import Button from '../button/button.component'
import FormInput from "../form-input/form-input.component"
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    console.log(formFields)

    const logEmailPasswordUser = async (event) => {
        event.preventDefault()
        console.log(1)
        try {
            //second see if youve authenticated with email and password
            const response = await signInAuthWithEmailAndPassword(email, password)
            console.log(response)
            //create an user document from the return
            // const userDocRef = await createUserDocumentFromAuth(response.user, { displayName })
            // resetFormFields()

        } catch (error) {
            console.log(error.code)
            const errorCode = error.code;
            const errorMessage = error.message;

            switch (errorCode) {
                case 'auth/wrong-password':
                    alert('incorrect password')
                    break

                case 'auth/user-not-found':
                    alert('User does not exist')
                    break

                default:
                    console.log(errorCode)
            }

            if (errorCode === 'auth/wrong-password') {
                alert('incorrect password')
            }

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)

    }

    return (
        <div className='sign-up-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={logEmailPasswordUser}>
                {/* <FormInput label='Display Name' type="text" required onChange={handleChange} name='displayName' value={displayName} /> */}
                <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password} />


                <div className='buttons-container'>
                    <Button type="submit" >Sign In</Button>
                    <Button type='button' buttonType='google' onClick={logGoogleUser} >Sign In with Google</Button>
                </div>


            </form>
        </div>
    )

}

export default SignInForm