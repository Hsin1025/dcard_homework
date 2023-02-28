import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
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
              <Image width={30} height={30} src='/github.svg' alt='Github Logo' className='mr-2'/>
              GitHub
            </Link>
            {session && <a onClick={handleSignout} href='#'>SignOut</a>}
            {!session && <a onClick={handleSignin} href='#'>SignIn</a>}
        </div>
    )
}
