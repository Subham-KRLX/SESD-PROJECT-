import { useState } from 'react';

export default function Login() {
  const [isVendor, setIsVendor] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800/80 border border-slate-700 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Welcome Back
          </h2>
          <p className="text-slate-400 mt-2">Sign in to your TechSpark account</p>
        </div>

        <div className="flex mb-6 bg-slate-900 rounded-lg p-1">
          <button 
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${!isVendor ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            onClick={() => setIsVendor(false)}
          >
            Customer
          </button>
          <button 
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${isVendor ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            onClick={() => setIsVendor(true)}
          >
            Tech Vendor
          </button>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 bg-slate-900 border-slate-700 rounded text-blue-500 focus:ring-blue-500" />
              <label className="ml-2 block text-sm text-slate-400">Remember me</label>
            </div>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Register here</a>
        </p>
      </div>
    </div>
  );
}
