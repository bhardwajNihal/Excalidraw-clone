
"use client"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center relative px-4">
      <div className="nav absolute top-0 flex w-full justify-between px-4  md:px-20 pt-6" >
        <div className="logo font-black text-xl"><span className="text-cyan-500">Sketch</span><span>Vibe</span></div>

        <div className="space-y-1 cursor-pointer pt-2 md:hidden">
          <div className="w-4 h-[2px] bg-cyan-500 rounded"></div>
          <div className="w-4 h-[2px] bg-cyan-500 rounded"></div>
          <div className="w-4 h-[2px] bg-cyan-500 rounded"></div>
        </div>


        <div className="md:flex gap-4 hidden">
          <div className="signup px-6 py-2 bg-cyan-600 rounded cursor-pointer hover:bg-cyan-500 duration-200"
            onClick={() => router.push("/signup")}
          >Sign Up</div>
          <div className="signin px-6 py-2 border border-cyan-500 text-cyan-500 rounded cursor-pointer hover:bg-cyan-500 hover:text-white duration-200"
            onClick={() => router.push("/signin")}
          >Sign In</div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-black">Give shape to your Ideas!</h1>
        <h2 className="text-xl font-extralight text-gray-400 mt-4">Draw shapes, add texts, Chat and collaborate. Bring thoughts to life.</h2>
        <div className="signup w-fit px-6 py-2 bg-cyan-600 rounded mt-4 cursor-pointer hover:bg-cyan-500 duration-200"
          onClick={() => router.push("/signup")}
        >Get started</div>
      </div>
    </div>
  );
}
