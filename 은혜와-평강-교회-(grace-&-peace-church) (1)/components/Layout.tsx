import React, { useState } from 'react';
import { Menu, X, Church, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Lock } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '홈으로', value: Page.HOME },
    { label: '교회소개', value: Page.ABOUT },
    { label: '말씀과 찬양', value: Page.SERMONS },
    { label: '교육/부서', value: Page.MINISTRY },
    { label: '교회소식', value: Page.GALLERY }, // Combined gallery/notices for simplicity in nav
    { label: '오시는 길', value: Page.CONTACT },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700">
      {/* Top Bar - Quick Info */}
      <div className="bg-primary-900 text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="opacity-90">하나님을 기쁘시게, 사람을 행복하게 하는 교회</span>
          <div className="flex space-x-4">
            <span className="flex items-center"><Phone size={12} className="mr-1" /> 02-1234-5678</span>
            <span className="flex items-center"><MapPin size={12} className="mr-1" /> 서울특별시 은혜구 평강동 123</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => handleNavClick(Page.HOME)}
            >
              <Church className="h-8 w-8 text-primary-600 mr-2" />
              <div className="flex flex-col">
                <span className="font-serif-heading font-bold text-xl text-slate-900 leading-none">은혜와평강교회</span>
                <span className="text-xs text-slate-500 mt-1">Grace & Peace Church</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.value
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-slate-500 hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 hover:text-slate-700 p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                    currentPage === item.value
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-serif-heading text-lg font-bold mb-4">은혜와평강교회</h3>
              <p className="text-sm leading-relaxed mb-4 text-slate-400">
                우리는 지역 사회를 섬기며, 예수 그리스도의 사랑을 실천하는 믿음의 공동체입니다.
                언제든지 편안하게 방문해주세요.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition"><Youtube size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition"><Instagram size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition"><Facebook size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">예배 안내</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="opacity-75">주일 대예배</span> <span>오전 11:00</span></li>
                <li className="flex justify-between"><span className="opacity-75">주일 오후예배</span> <span>오후 2:00</span></li>
                <li className="flex justify-between"><span className="opacity-75">수요기도회</span> <span>오후 7:30</span></li>
                <li className="flex justify-between"><span className="opacity-75">새벽기도회</span> <span>오전 5:30</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">오시는 길</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <MapPin size={16} className="mt-1 mr-2 flex-shrink-0" />
                  <span>서울특별시 은혜구 평강동 123<br/>(평강역 3번 출구 도보 5분)</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  <span>02-1234-5678</span>
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span>contact@gracepeace.church</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <span>&copy; {new Date().getFullYear()} Grace & Peace Church. All rights reserved.</span>
            <button 
              onClick={() => onNavigate(Page.ADMIN)} 
              className="opacity-20 hover:opacity-100 transition-opacity p-1"
              title="관리자 페이지"
            >
              <Lock size={10} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;