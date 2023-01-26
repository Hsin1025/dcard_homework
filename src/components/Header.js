import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';

export default function Header () {
    const handleSignin = (e) => {
        e.preventDefault()
        signIn()
    }

    const handleSignout = (e) => {
        e.preventDefault()
        signOut()
    }

    const { data: session } = useSession();

    return(
        <div className='flex justify-around items-center py-5'>
            <Link className='flex items-center font-semibold text-2xl' href='/'>
              <img src='/github.svg'/>
              GitHub
            </Link>
            {session && <a onClick={handleSignout} href='#'>SignOut</a>}
            {!session && <a onClick={handleSignin} href='#'>SignIn</a>}
        </div>
    )
}
