"use client"
import { useRouter } from "next/navigation";
export default function Signup() {

    const router = useRouter()

    return <div className="h-screen w-full flex justify-center items-center relative">

        <div className="logo font-black text-xl absolute top-0 left-0 pt-8 pl-20"><span className="text-cyan-500">Sketch</span><span>Vibe</span></div>

        <div className="h-64 w-64 border border-cyan-800 rounded-xl p-4">

            <input className="w-full border border-gray-500 placeholder:text-gray-500 h-10 rounded-lg mt-5 pl-2" type="email" placeholder="email" />
            <input className="w-full border border-gray-500 placeholder:text-gray-500 h-10 rounded-lg mt-3 pl-2" type="password" placeholder="password" />
            <button className="w-full bg-cyan-600 h-10 rounded-lg mt-6 cursor-pointer hover:bg-cyan-500">Sign In</button>
            <p className="text-xs text-center mt-2">Haven't registered! <span className="text-blue-500 cursor-pointer" 
            onClick={()=>router.push("/signup")}
            ><u>Sign Up</u></span></p>
        </div>
    </div>
}