'use client';

import { Heart, Code, Shield, Zap, Users, TrendingUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Help', href: '#help' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#blog' },
  ];

  const roadmapItems = [
    { icon: Code, title: 'API Developer', desc: 'Build integrations' },
    { icon: Zap, title: 'Real-time Chat', desc: 'WebSocket messaging' },
    { icon: TrendingUp, title: 'Analytics', desc: 'Post insights & stats' },
    { icon: Users, title: 'Communities', desc: 'Group features' },
    { icon: Shield, title: 'Advanced Privacy', desc: 'Enhanced controls' },
    { icon: Heart, title: 'Wellness Hub', desc: 'Mental health tools' },
  ];

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-colors">
      {/* Roadmap Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2 text-black dark:text-white">
            🚀 What's Coming to IN
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Exciting features in development to make your social experience better
          </p>

          {/* Roadmap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all hover:scale-105"
                >
                  <Icon className="w-8 h-8 mb-3 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-black dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Overview */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 border border-blue-200 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
            ✨ Current Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-700 dark:text-gray-300">Username Auth</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-700 dark:text-gray-300">Direct Messaging</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-700 dark:text-gray-300">Posts & Comments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-700 dark:text-gray-300">Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-700 dark:text-gray-300">Follow System</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-700 dark:text-gray-300">Explore Feed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-700 dark:text-gray-300">Notifications</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {footerLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 dark:text-gray-500 text-sm">
            <p>
              CREATED BY MARTIN <Heart className="inline w-4 h-4 text-red-500" /> © {currentYear}
            </p>
            <p className="mt-2">
              <span className="font-semibold">v1.0.0</span> - The modern social network
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
