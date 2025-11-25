import React from 'react';
import { ArrowLeft, Clock, MapPin, Users, Calendar, MessageCircle } from 'lucide-react';
import { MinistryInfo } from '../types';

interface MinistryDetailPageProps {
  ministry: MinistryInfo;
  onBack: () => void;
  onInquiry: (ministryName: string, ministryId: string) => void;
}

const MinistryDetailPage: React.FC<MinistryDetailPageProps> = ({ ministry, onBack, onInquiry }) => {
  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Hero Header */}
      <div className="relative h-[300px] md:h-[400px] bg-slate-900">
        <img 
          src={ministry.image} 
          alt={ministry.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <button 
            onClick={onBack}
            className="text-white/80 hover:text-white mb-6 flex items-center text-sm font-bold transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> 목록으로 돌아가기
          </button>
          <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-3">
            {ministry.target}
          </span>
          <h1 className="font-serif-heading text-4xl md:text-5xl font-bold text-white mb-2 shadow-sm">
            {ministry.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <h2 className="font-serif-heading text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
                부서 소개 및 비전
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                {ministry.longDescription || ministry.description}
              </div>
              
              {!ministry.longDescription && (
                 <p className="mt-8 text-sm text-slate-400 bg-slate-50 p-4 rounded text-center">
                   * 상세 소개글이 아직 등록되지 않았습니다. 관리자 페이지에서 내용을 추가해주세요.
                 </p>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 sticky top-24">
              <h3 className="font-bold text-lg text-slate-800 mb-6">부서 정보</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="text-primary-600 mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase">예배 시간</span>
                    <span className="text-slate-800 font-medium">{ministry.time}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="text-primary-600 mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase">장소</span>
                    <span className="text-slate-800 font-medium">{ministry.location || '교회 내 지정 장소'}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="text-primary-600 mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase">섬기는 분들</span>
                    <span className="text-slate-800 font-medium">{ministry.leaders || '담당 교역자 및 부장'}</span>
                  </div>
                </div>

                <div className="flex items-start">
                   <Calendar className="text-primary-600 mt-1 mr-3 flex-shrink-0" size={20} />
                   <div>
                     <span className="block text-xs font-bold text-slate-500 uppercase">주요 활동</span>
                     <span className="text-slate-600 text-sm">
                       주일예배, 반별 공과공부, 여름/겨울 수련회, 절기 행사 등
                     </span>
                   </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button 
                  onClick={() => onInquiry(ministry.name, ministry.id)}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-primary-700 transition flex items-center justify-center"
                >
                  <MessageCircle size={18} className="mr-2" /> 사역 문의하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryDetailPage;