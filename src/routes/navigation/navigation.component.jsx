import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react'; //component that renders to nothing
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { UserContext } from '../../contexts/user.context';
import '../navigation/navigation.styles.scss'
import { signOutUser } from '../../utils/firebase/firebase.utils'
const Navigation = () => {

    const { currentUser } = useContext(UserContext)

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'></CrwnLogo>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        //when there is a current user show signout link instead of signin
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                        )
                            :
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                    }

                </div>
            </div>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Navigation;