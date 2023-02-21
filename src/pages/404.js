import Link from "next/link"

export default function Custom404() {
    return (
    <div className='h-screen w-screen grid place-content-center'>
      <h1 className='text-xl'>404-Page Not Found</h1>
      <Link href='/' className='text-lg text-center'>Go Back 🔙</Link>
    </div>
    )
}