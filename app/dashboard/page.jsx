
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function handleLogout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }


    useEffect(() => {
        async function getUser() {
            try {
                const res = await fetch("/api/dashboard");
                const data = await res.json();

                if (!res.ok) {
                    router.push("/login");
                    return;
                }

                setUser(data.user);

            } catch (error) {
                console.error("DASHBOARD ERROR:", error);
                router.push("/login");

            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

                    <h1 className="text-xl font-bold text-gray-900">
                        My Dashboard
                    </h1>

                    <span className="text-sm text-green-600 font-medium">
                        ● Active
                    </span>

                    <div> 
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                         Logout
                        </button>
                          </div>
                

                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">

                {/* Welcome */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Here is an overview of your account.
                    </p>
                </div>

                {/* Profile */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">

                    <div className="flex items-center gap-5 pb-8 border-b border-gray-100">

                        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {user.name}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                                Account Information
                            </p>
                        </div>

                    </div>

                    {/* User Details */}
                    <div className="pt-8">

                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Personal Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="bg-gray-50 rounded-lg p-5">
                                <p className="text-sm text-gray-500 mb-2">
                                    Full Name
                                </p>

                                <p className="text-gray-900 font-medium">
                                    {user.name}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-5">
                                <p className="text-sm text-gray-500 mb-2">
                                    Email Address
                                </p>

                                <p className="text-gray-900 font-medium break-all">
                                    {user.email}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Status */}
                    <div className="mt-8 p-5 rounded-lg border border-green-200 bg-green-50">
                        <p className="text-green-700 font-medium">
                            Your account is active
                        </p>

                        <p className="text-green-600 text-sm mt-1">
                            You are successfully logged in.
                        </p>
                    </div>

                </div>

                <footer className="text-center text-gray-400 text-sm mt-10">
                    © 2026 My Dashboard. All rights reserved.
                </footer>

            </div>
        </main>
    );
}
