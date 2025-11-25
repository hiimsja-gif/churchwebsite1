import React from 'react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Notice } from '../types';

interface NoticeDetailPageProps {
  notice: Notice;
  onBack: () => void;
}

const NoticeDetailPage: React.FC<NoticeDetailPageProps> = ({ notice, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-slate-500 hover:text-primary-600 transition font-medium"
      >
        <ArrowLeft size={20} className="mr-2" /> 목록으로 돌아가기
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              notice.category === '행사' ? 'bg-orange-100 text-orange-700' : 
              notice.category === '모임' ? 'bg-green-100 text-green-700' :
              'bg-primary-100 text-primary-700'
            }`}>
              {notice.category}
            </span>
            <span className="flex items-center text-slate-500 text-sm">
              <Calendar size={14} className="mr-1" /> {notice.date}
            </span>
          </div>
          <h1 className="font-serif-heading text-3xl font-bold text-slate-900 leading-tight">
            {notice.title}
          </h1>
        </div>
        
        <div className="p-8 min-h-[400px]">
          {notice.content ? (
            <div className="prose prose-slate max-w-none whitespace-pre-line leading-relaxed text-slate-700">
              {notice.content}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p>본문 내용이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;