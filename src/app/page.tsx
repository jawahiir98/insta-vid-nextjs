"use client"

import React from 'react';
import { Play, Sparkles, Video, Zap, Star, ArrowRight, Clock, Palette, Film, UserPlus } from 'lucide-react';
import Image from "next/image";

export default function Home() {
    const genres = [
        { name: "Thriller", icon: "🎬", color: "from-red-500 to-red-700" },
        { name: "Comedy", icon: "😄", color: "from-yellow-500 to-orange-500" },
        { name: "Romance", icon: "💕", color: "from-pink-500 to-rose-500" },
        { name: "Adventure", icon: "🗺️", color: "from-green-500 to-emerald-600" },
        { name: "Sci-Fi", icon: "🚀", color: "from-blue-500 to-cyan-500" },
        { name: "Bedtime Stories", icon: "🌙", color: "from-purple-500 to-indigo-600" }
    ];

    const themes = [
        { name: "Cartoon", preview: "🎨", desc: "Animated style" },
        { name: "GTA Style", preview: "🎮", desc: "Game-inspired" },
        { name: "Realistic", preview: "📸", desc: "Lifelike visuals" },
        { name: "Custom", preview: "✨", desc: "Your imagination" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Background Image Overlays - Replace src with your generated images */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80"/>
                <Image
                    width={1280}
                    height={1920}
                    src="/main-hero.png"
                    alt="AI Video Creation Background"
                />
            </div>

            {/* Video thumbnails floating in background */}
            <div className="absolute top-20 right-20 w-48 h-32 rounded-lg overflow-hidden opacity-30 transform rotate-12 shadow-2xl">
                <Image
                    width={400}
                    height={300}
                    src="/thumbnail-1.png"
                    alt="Sample Video 1"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute bottom-40 left-20 w-40 h-28 rounded-lg overflow-hidden opacity-30 transform -rotate-12 shadow-2xl">
                <Image
                    width={400}
                    height={300}
                    src="/thumbnail-2.png"
                    alt="Sample Video 1"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute top-1/2 left-10 w-36 h-24 rounded-lg overflow-hidden opacity-20 transform rotate-45 shadow-2xl">
                <Image
                    width={400}
                    height={300}
                    src="/thumbnail-3.png"
                    alt="Sample Video 1"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Header */}
            <header className="relative z-10 px-6 py-4">
                <nav className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Video className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Insta Vid</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.location.href = '/sign-in'}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => window.location.href = '/sign-up'}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
                        >
                            Get Started
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative px-6 py-20">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-200">AI-Powered Video Creation</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Create Stunning
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Short Videos</span>
                        <br />in Seconds
                    </h1>

                    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Transform your ideas into captivating 30-60 second videos with AI. Choose from multiple genres,
                        select your visual style, or create something completely custom.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <button
                            onClick={() => window.location.href = '/sign-up'}
                            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/25 flex items-center space-x-2"
                        >
                            <Play className="w-5 h-5" />
                            <span>Start Creating</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all flex items-center space-x-2 backdrop-blur-sm">
                            <Film className="w-5 h-5" />
                            <span>Watch Demo</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">30-60s</div>
                            <div className="text-gray-400">Perfect Duration</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">∞</div>
                            <div className="text-gray-400">Unlimited Creativity</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">AI</div>
                            <div className="text-gray-400">Powered Generation</div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>

            {/* Features Section */}
            <section className="relative px-6 py-20 bg-black/20 backdrop-blur-sm">
                {/* Background image for features section */}
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/features-bg.png"
                        height={1920}
                        width={1280}
                        alt="AI Technology Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Style</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            From thrilling adventures to bedtime stories, create videos in any genre with your preferred visual style
                        </p>
                    </div>

                    {/* Genres */}
                    <div className="mb-20">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-2">
                            <Zap className="w-6 h-6 text-yellow-400" />
                            <span>Popular Genres</span>
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {genres.map((genre, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-6 hover:from-white/20 hover:to-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                >
                                    {/* Genre background image */}
                                    <div className="absolute inset-0 opacity-20">
                                        {/*<img*/}
                                        {/*    src={`/api/placeholder/300/200`}*/}
                                        {/*    alt={`${genre.name} genre background`}*/}
                                        {/*    className="w-full h-full object-cover rounded-2xl"*/}
                                        {/*/>*/}
                                    </div>
                                    <div className="relative z-10 text-center">
                                        <div className="text-3xl mb-3">{genre.icon}</div>
                                        <div className="text-white font-semibold">{genre.name}</div>
                                    </div>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${genre.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Themes */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-2">
                            <Palette className="w-6 h-6 text-blue-400" />
                            <span>Visual Themes</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {themes.map((theme, index) => (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer text-center relative overflow-hidden"
                                >
                                    {/* Theme background image */}
                                    <div className="absolute inset-0 opacity-30">
                                        {/*<img*/}
                                        {/*    src={`/api/placeholder/400/300`}*/}
                                        {/*    alt={`${theme.name} style example`}*/}
                                        {/*    className="w-full h-full object-cover rounded-2xl"*/}
                                        {/*/>*/}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-4xl mb-4">{theme.preview}</div>
                                        <h4 className="text-white font-bold text-lg mb-2">{theme.name}</h4>
                                        <p className="text-gray-200 text-sm font-medium">{theme.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative px-6 py-20">
                {/* Background image for CTA */}
                <div className="absolute inset-0 opacity-15">
                    {/*<img*/}
                    {/*    src="/api/placeholder/1920/600"*/}
                    {/*    alt="Creative workspace background"*/}
                    {/*    className="w-full h-full object-cover"*/}
                    {/*/>*/}
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
                        <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Create Magic?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of creators who are already making stunning AI-powered videos.
                            Your next viral hit is just one click away.
                        </p>
                        <button
                            onClick={() => window.location.href = '/sign-up'}
                            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/25 flex items-center space-x-3 mx-auto"
                        >
                            <Clock className="w-6 h-6" />
                            <span>Create Your First Video</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Additional Sign Up Option */}
                        <div className="mt-6">
                            <p className="text-gray-300 mb-4">New to Insta Vid?</p>
                            <button
                                onClick={() => window.location.href = '/sign-up'}
                                className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-2 mx-auto transition-colors"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Sign up for free</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Video className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Insta Vid</span>
                    </div>
                    <p className="text-gray-400">
                        © 2025 Insta Vid. Powered by AI, crafted with creativity.
                    </p>
                </div>
            </footer>
        </div>
    );
}