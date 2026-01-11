import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-surface-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">

      {/* LEFT IMAGE SECTION */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD7UqeetfC8NbfcNgG21sfgO7T_9uvd9rzrnaMBgTrjhGlHE_a2BHtW39KIY_mPi1_oMtVYmnk-4uyml88tyOyt5U87UwmuO-dSqINs_zdpIBM3da9F_ckwpWWb7jUOVRbjaVlSH28A5XLaIKsoeL-wMQvfKcpN5DQ3zF6CXudMkQ1k3zkORtWAMBtRdwfCWiE9sermqj7UiIp96dbofC67a1-xn74MarQoOpx6MpHXUBs-xTyUy5UxiP9mb0uzmlSpQVRJdfShHM?q=80&w=2600&auto=format&fit=crop"
          alt="Modern library interior"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>

        <div className="relative z-10 flex flex-col justify-end h-full p-12 text-white space-y-3">
          <div className="space-y-1.5">
           

            <h2 className="text-4xl font-extrabold leading-tight">
              Curate your <br />
              <span className="text-emerald-400">Intellectual Haven</span>
            </h2>

            <p className="text-base text-slate-200 max-w-md">
              Join thousands of readers who manage their personal collections and
              track reading habits with Libri.
            </p>
          </div>

          <div className="pt-4 border-t border-white/20">
            <p className="italic text-slate-300">
              "A room without books is like a body without a soul."
            </p>
            <p className="text-sm text-slate-400 mt-1">— Cicero</p>
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-surface-light dark:bg-surface-dark overflow-y-auto">
        <div className="w-full max-w-[400px] space-y-4">

         

          {/* HEADER */} 
          <div className="space-y-1 text-center lg:text-left">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter your details to start your journey.
            </p>
          </div>

          {/* GOOGLE LOGIN */}
            <button className="gsi-material-button w-full flex justify-center mx-auto">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{display: "block"}}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Sign up with Google</span>
              <span style={{display: "none"}}>Sign up with Google</span>
            </div>
          </button>

          {/* DIVIDER */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-surface-light dark:bg-surface-dark text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
                Or with email
              </span>
            </div>
          </div>

          {/* FORM */}
          <form className="space-y-3">
            <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">person</span>
                    </div>
                    <input
                    type="text"
                    placeholder="John Doe"
                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm font-medium"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email address</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">mark_email_read</span>
                    </div>
                    <input
                    type="email"
                    placeholder="name@company.com"
                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm font-medium"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">lock</span>
                    </div>
                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="block w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm font-medium"
                    />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                    >
                    <span className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-[18px]">
                        {showPassword ? "visibility" : "visibility_off"}
                    </span>
                    </button>
                </div>
                 <p className="text-[10px] text-slate-500 mt-1 ml-1">Must be at least 8 characters.</p>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-lg shadow-primary/20 text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignUp;