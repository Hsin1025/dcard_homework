import Link from "next/link";
import Image from "next/image";

export default function Custom500() {
    return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="flex">
        <Image 
          width={30} 
          height={30} 
          src='/github.svg' 
          alt='Github Logo' 
          className='mr-2'
        />
        <h1 className="text-xl">404 - Page Not Found</h1>
      </div>
      <Link href="/" className="text-lg text-center">Home</Link>
    </div>
    )
}