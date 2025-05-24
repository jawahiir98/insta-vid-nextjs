import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <img
            src="/login.webp"
            alt="Login"
            className="w-full h-screen object-cover"
        />
        <div className="flex justify-center items-center">
          <SignIn />
        </div>
      </div>
  )
}
