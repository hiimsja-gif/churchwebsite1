import React from 'react';
import { Heart, Users, BookOpen, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/122/1920/1080" 
            alt="Church Building" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <p className="text-church-accent font-bold tracking-widest uppercase mb-4">Since 1964</p>
          <h1 className="font-serif-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
            60년의 은혜,<br/>
            세상을 향한 새로운 섬김
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto">
            은혜와평강교회는 지난 60년간 지역 사회와 호흡하며<br/>
            하나님의 사랑을 실천해 온 믿음의 공동체입니다.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif-heading text-3xl font-bold text-slate-800 mb-4">교회 비전</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary-600">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">60년 전통의 뿌리</h3>
            <p className="text-slate-600 leading-relaxed">
              1964년 설립되어 한결같은 마음으로 예배의 자리를 지켜왔습니다. 
              변하지 않는 복음의 진리 위에 굳건히 서서, 
              세대를 이어가는 믿음의 유산을 만들어갑니다.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-red-500">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">지역을 섬기는 교회</h3>
            <p className="text-slate-600 leading-relaxed">
              교회의 담장을 넘어 지역 사회의 필요를 채우고, 
              소외된 이웃에게 예수 그리스도의 사랑을 전합니다. 
              세상의 빛과 소금이 되는 것이 우리의 사명입니다.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-blue-600">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">말씀으로 하나되는 공동체</h3>
            <p className="text-slate-600 leading-relaxed">
              오직 성경 말씀만이 우리 삶의 기준임을 고백합니다. 
              온 교인이 말씀을 배우고, 묵상하며, 삶으로 살아내어 
              예수님을 닮아가는 제자가 되기를 힘씁니다.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values / History Divider */}
      <section className="bg-primary-900 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif-heading text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
            "하나님을 기쁘시게, 사람을 행복하게"<br/>
            <span className="text-primary-300">은혜와평강교회가 걸어온 길입니다.</span>
          </h2>
          <p className="opacity-80">
            우리는 화려한 건물이 아닌, 건강한 신앙 인격을 자랑합니다.<br/>
            한 영혼을 천하보다 귀하게 여기는 마음으로 여러분을 섬기겠습니다.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif-heading text-3xl font-bold text-slate-800 mb-4">섬기는 분들</h2>
          <p className="text-slate-600">교회를 사랑하고 성도들을 섬기는 일꾼들을 소개합니다.</p>
        </div>

        {/* Senior Pastor */}
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden mb-16 border border-slate-100">
          <div className="md:w-1/3 bg-slate-200 relative min-h-[300px]">
            <img 
              src="https://picsum.photos/id/1012/600/800" 
              alt="Senior Pastor" 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
            />
          </div>
          <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-primary-600 font-bold tracking-wider text-sm uppercase">Senior Pastor</span>
              <h3 className="font-serif-heading text-3xl font-bold text-slate-900 mt-1">담임목사 김은혜</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg italic font-serif-heading">
              "교회는 건물이 아니라, 예수 그리스도를 구주로 고백하는 사람들의 모임입니다. 
              은혜와평강교회는 상처 입은 치유자들이 모여 서로를 보듬고 세상을 향해 축복의 통로가 되기를 꿈꿉니다."
            </p>
            <div className="text-sm text-slate-500 space-y-1">
              <p>• 총신대학교 신학대학원 졸업 (M.Div)</p>
              <p>• 미국 풀러신학교 목회학 박사 (D.Min)</p>
              <p>• 전) 사랑나눔교회 부목사 시무</p>
            </div>
          </div>
        </div>

        {/* Other Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Associate Pastor */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-slate-100 group-hover:border-primary-500 transition-colors">
              <img src="https://picsum.photos/id/1005/300/300" alt="Pastor" className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-lg text-slate-900">이평강</h4>
            <p className="text-primary-600 text-sm font-medium mb-3">부목사 (교육/행정)</p>
            <p className="text-xs text-slate-500">"다음 세대를 말씀으로 세우는 일에 헌신합니다."</p>
          </div>

          {/* Elders */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-slate-100 group-hover:border-primary-500 transition-colors">
              <img src="https://picsum.photos/id/1055/300/300" alt="Elder" className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-lg text-slate-900">박믿음</h4>
            <p className="text-slate-500 text-sm font-medium mb-3">시무장로 (관리위원장)</p>
            <p className="text-xs text-slate-500">교회 살림을 책임지며 묵묵히 섬깁니다.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-slate-100 group-hover:border-primary-500 transition-colors">
              <img src="https://picsum.photos/id/1066/300/300" alt="Elder" className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-lg text-slate-900">최소망</h4>
            <p className="text-slate-500 text-sm font-medium mb-3">시무장로 (재정위원장)</p>
            <p className="text-xs text-slate-500">정직과 투명함으로 교회를 섬깁니다.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-slate-100 group-hover:border-primary-500 transition-colors">
              <img src="https://picsum.photos/id/1074/300/300" alt="Elder" className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-lg text-slate-900">정사랑</h4>
            <p className="text-slate-500 text-sm font-medium mb-3">시무장로 (선교위원장)</p>
            <p className="text-xs text-slate-500">지역과 열방을 향한 하나님의 마음을 품습니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;