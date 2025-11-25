import React, { useState } from 'react';
import { Sparkles, Heart, Loader2, RefreshCcw, ArrowLeft } from 'lucide-react';
import { generateSpiritualComfort } from '../services/geminiService';

const GraceAssistant: React.FC = () => {
  const [mood, setMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ verse: string; prayer: string } | null>(null);

  const moods = [
    { label: "마음이 지쳐요", value: "지침/피곤", icon: "😫" },
    { label: "불안해요", value: "불안/걱정", icon: "😰" },
    { label: "감사해요", value: "감사/기쁨", icon: "🙏" },
    { label: "외로워요", value: "외로움", icon: "🍂" },
  ];

  const handleRequest = async (selectedMood: string) => {
    setMood(selectedMood);
    setLoading(true);
    setResult(null);
    try {
      const response = await generateSpiritualComfort(selectedMood);
      setResult(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!mood) return;
    setLoading(true);
    // Keep result visible while loading specifically for regeneration or clear it? 
    // Clearing it gives better feedback that "something is happening"
    setResult(null); 
    try {
      const response = await generateSpiritualComfort(mood);
      setResult(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-indigo-100 my-8 relative overflow-hidden">
      <div className="flex items-center mb-4 relative z-10">
        <Sparkles className="text-primary-600 mr-2" />
        <h3 className="font-serif-heading text-xl font-bold text-slate-800">AI 신앙 도우미</h3>
      </div>
      
      {!result && !loading && (
        <>
          <p className="text-slate-600 mb-6 text-sm relative z-10">
            오늘 당신의 마음은 어떠신가요? 현재 감정을 선택해주시면, 위로의 말씀과 기도를 전해드립니다.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => handleRequest(m.value)}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:bg-primary-50 transition-all border border-slate-100 group"
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{m.icon}</span>
                <span className="text-sm font-medium text-slate-700">{m.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 relative z-10">
          <Loader2 className="animate-spin text-primary-600 h-8 w-8 mb-3" />
          <p className="text-sm text-slate-500 font-medium">
            {result ? '다른 말씀을 찾고 있습니다...' : '당신을 위한 말씀을 찾고 있습니다...'}
          </p>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100 animate-fade-in relative z-10">
          <div className="mb-6">
            <h4 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">오늘의 말씀</h4>
            <p className="font-serif-heading text-lg text-slate-800 leading-relaxed italic">
              "{result.verse}"
            </p>
          </div>
          <div className="border-t border-slate-100 pt-4 mb-6">
            <h4 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2 flex items-center">
              <Heart size={12} className="mr-1" /> 짧은 기도
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {result.prayer}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              onClick={handleRegenerate}
              className="flex-1 flex items-center justify-center py-2 px-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition text-sm font-bold"
            >
              <RefreshCcw size={16} className="mr-2" /> 다른 말씀 보기
            </button>
            <button 
              onClick={() => { setResult(null); setMood(null); }}
              className="flex-1 flex items-center justify-center py-2 px-4 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition text-sm font-medium"
            >
              <ArrowLeft size={16} className="mr-2" /> 감정 다시 선택
            </button>
          </div>
        </div>
      )}
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"></div>
    </div>
  );
};

export default GraceAssistant;