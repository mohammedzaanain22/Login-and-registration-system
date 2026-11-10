"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
      const router = useRouter();

    const [form, setForm] = useState({
        email : "",
        password : ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    function handleChange(e) { 
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
       
          
    async  function handleSubmit(e) {
        e.preventDefault();
         setLoading(true);
          setMessage("");

        try{
            const res = await fetch("/api/login", {
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(form)
            });
             const data = await res.json();
         if (!res.ok) {
            setMessage(data.message);
             return;
        }

           router.push("/dashboard");

        }catch(error) {
            setMessage("error , Please try again.");
        } finally {
            setLoading(false);
        }
        
    }
    return (
        <div>
             <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080812] px-4 py-10 text-white">

            {/* Background Glow */}
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-purple-950/30 backdrop-blur-2xl sm:p-10">

                {/* Logo */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 text-2xl font-bold shadow-lg shadow-purple-500/30">
                        M
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome Back
                    </h1>

                    <p className="mt-3 text-sm text-gray-400">
                        Login to continue your journey.
                    </p>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            required
                            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        />
                    </div>

                    {message && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3.5 font-semibold shadow-lg shadow-purple-600/20 transition hover:scale-[1.02] hover:shadow-purple-600/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-purple-400 transition hover:text-purple-300"
                    >
                        Create Account
                    </Link>
                </p>

            </div>
        </main>
        </div>
    );
}