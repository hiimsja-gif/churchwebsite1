import React, { useState, useEffect } from 'react';
import { PlayCircle, Calendar, Users, ArrowRight, MapPin, ChevronRight, Download, X, UserPlus, Clock } from 'lucide-react';
import Layout from './components/Layout';
import GraceAssistant from './components/GraceAssistant';
import AdminDashboard from './components/AdminDashboard';
import MinistryDetailPage from './components/MinistryDetailPage';
import NoticeDetailPage from './components/NoticeDetailPage';
import AboutPage from './components/AboutPage';
import { Page, Sermon, Notice, MinistryInfo, GalleryItem, NewcomerRegistration, MinistryInquiry } from './types';

// --- INITIAL DATA (기본 데이터) ---
const INITIAL_SERMONS: Sermon[] = [
  {
    id: '1',
    title: '광야에서 길을 찾다',
    preacher: '김은혜 담임목사',
    date: '2023-10-22',
    scripture: '이사야 43:18-21',
    thumbnailUrl: 'https://picsum.photos/id/1015/800/450',
    videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
  },
  {
    id: '2',
    title: '사랑의 우선순위',
    preacher: '김은혜 담임목사',
    date: '2023-10-15',
    scripture: '요한복음 21:15-17',
    thumbnailUrl: 'https://picsum.photos/id/1047/800/450',
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
  },
  {
    id: '3',
    title: '믿음의 눈을 들어라',
    preacher: '이평강 부목사',
    date: '2023-10-08',
    scripture: '창세기 13:14-18',
    thumbnailUrl: 'https://picsum.photos/id/1059/800/450',
    videoUrl: 'https://www.youtube.com/watch?v=lxI1E1h5ZkI'
  }
];

const INITIAL_NOTICES: Notice[] = [
  { id: '1', category: '행사', title: '2023 전교인 가을 야외예배 안내', date: '2023.10.20', content: '가을의 풍요로움을 주신 하나님께 감사하며 전교인 야외예배를 드립니다.\n\n일시: 10월 20일 (주일) 오전 11시\n장소: 평강 시민공원 야외무대\n준비물: 편안한 복장, 도시락(교회 제공), 돗자리\n\n* 우천 시 본당에서 드립니다. 성도님들의 많은 참여 바랍니다.' },
  { id: '2', category: '모임', title: '10월 구역장 권찰 월례회', date: '2023.10.18', content: '10월 구역장 권찰 월례회가 있습니다.\n\n일시: 10월 18일 (수) 수요예배 후\n장소: 소예배실\n안건: 하반기 대심방 일정 논의' },
  { id: '3', category: '일반', title: '새가족 교육 45기 수료식', date: '2023.10.15', content: '지난 4주간의 새가족 교육을 마친 45기 수료식이 이번 주일 2부 예배 시간에 있습니다.\n\n수료자: 홍길동, 이영희, 박철수 성도\n\n축하해주시고 따뜻하게 환영해주시기 바랍니다.' },
];

const INITIAL_MINISTRY: MinistryInfo[] = [
  {
    id: 'kinder',
    name: '꿈나무 유치부',
    target: '4-7세 미취학 아동',
    time: '주일 오전 11:00',
    location: '교육관 1층 유치부실',
    leaders: '담당: 이사랑 전도사 | 부장: 김미소 집사',
    description: '하나님의 사랑 안에서 자라나는 믿음의 꿈나무들입니다. 즐거운 찬양과 말씀 놀이로 하나님을 배워갑니다.',
    longDescription: `꿈나무 유치부는 미취학 아동(4-7세)을 대상으로 하나님의 사랑을 가르치는 신앙 공동체입니다.

우리의 목표는 아이들이 하나님을 '사랑하는 아버지'로 느끼고 경험하는 것입니다. 딱딱한 공부가 아닌, 오감을 활용한 놀이와 찬양, 그리고 눈높이에 맞춘 성경 동화를 통해 복음의 씨앗을 심습니다.

매주 드려지는 예배는 아이들의 축제입니다. 선생님들의 따뜻한 환영과 사랑 속에서 아이들은 교회 오는 기쁨을 누리게 됩니다.`,
    image: 'https://picsum.photos/id/1066/600/400'
  },
  {
    id: 'elementary',
    name: '조이 초등부',
    target: '초등학교 1-6학년',
    time: '주일 오전 11:00',
    location: '교육관 2층 초등부실',
    leaders: '담당: 박지혜 전도사 | 부장: 최성실 권사',
    description: '말씀을 통해 예수님을 인격적으로 만나는 어린이 공동체입니다. 성경 퀴즈, 반별 모임을 통해 믿음의 성장합니다.',
    longDescription: `조이(Joy) 초등부는 '예수님 안에서 기뻐하는 어린이'라는 뜻을 담고 있습니다. 세상 문화 속에서 흔들리지 않는 믿음의 기초를 세우는 시기입니다.

체계적인 공과 공부를 통해 성경의 큰 흐름을 배우고, 예수님이 누구신지 명확히 알아갑니다. 여름과 겨울에 진행되는 성경학교는 아이들이 하나님을 깊이 만나는 은혜의 시간입니다.

또한, 친구들과 함께하는 다양한 활동을 통해 공동체 의식을 기르고 배려와 섬김을 배웁니다.`,
    image: 'https://picsum.photos/id/1069/600/400'
  },
  {
    id: 'youth',
    name: '비전 중고등부',
    target: '중학생, 고등학생',
    time: '주일 오전 09:30',
    location: '비전센터 3층',
    leaders: '담당: 강믿음 목사 | 부장: 정열정 집사',
    description: '세상의 빛과 소금이 되기 위해 배우고 훈련하는 청소년 공동체입니다. 비전 트립과 수련회를 통해 꿈을 발견합니다.',
    longDescription: `비전 중고등부는 학업과 진로, 그리고 관계의 고민 속에서 하나님의 뜻을 찾아가는 청소년들을 위한 예배 공동체입니다.

입시 경쟁과 세상의 가치관 속에서 '나는 누구인가?'라는 질문에 대해 성경적인 답을 찾아갑니다. 뜨거운 찬양 예배와 깊이 있는 소그룹 나눔은 우리 중고등부의 자랑입니다.

매년 진행되는 비전트립과 수련회를 통해 하나님 나라의 비전을 품고, 세상을 변화시키는 리더로 성장하도록 돕습니다.`,
    image: 'https://picsum.photos/id/1068/600/400'
  },
  {
    id: 'young_adult',
    name: '새벽이슬 대청부',
    target: '20세 이상 대학생/청년',
    time: '주일 오후 2:00',
    location: '본당 및 카페 그레이스',
    leaders: '담당: 김은혜 담임목사 | 회장: 한청년 형제',
    description: '열정적인 예배와 삶의 나눔이 있는 젊은이들의 모임입니다. 소그룹 모임과 봉사를 통해 건강한 신앙인으로 자라갑니다.',
    longDescription: `새벽이슬 같은 주의 청년들이 모인 곳, 대청부입니다. 
가장 화려하지만 가장 치열한 청년의 때를 하나님과 동행하며 승리하도록 서로 격려하고 세워줍니다.

우리는 예배자입니다. 삶의 모든 영역에서 하나님을 예배합니다.
우리는 동역자입니다. 기쁨과 슬픔을 함께 나누며 서로의 짐을 져줍니다.
우리는 사명자입니다. 캠퍼스와 직장에서 그리스도의 향기를 나타냅니다.

진로, 결혼, 직장 등 청년의 현실적인 고민들을 말씀 안에서 풀어가며, 세상이 감당치 못할 믿음의 세대로 훈련받고 있습니다.`,
    image: 'https://picsum.photos/id/1059/600/400'
  }
];

const INITIAL_GALLERY: GalleryItem[] = [
  { id: '1', title: '여름 성경학교', date: '2023.08.15', imageUrl: 'https://picsum.photos/id/1025/400/300' },
  { id: '2', title: '성가대 발표회', date: '2023.09.20', imageUrl: 'https://picsum.photos/id/1024/400/300' },
  { id: '3', title: '지역 봉사활동', date: '2023.10.03', imageUrl: 'https://picsum.photos/id/1080/400/300' },
  { id: '4', title: '가을 체육대회', date: '2023.10.09', imageUrl: 'https://picsum.photos/id/1078/400/300' },
  { id: '5', title: '바자회 풍경', date: '2023.05.05', imageUrl: 'https://picsum.photos/id/1070/400/300' },
  { id: '6', title: '임직식 기념', date: '2023.04.12', imageUrl: 'https://picsum.photos/id/1057/400/300' },
];

// --- HELPER FUNCTIONS ---
const getEmbedUrl = (url?: string) => {
  if (!url) return '';
  if (url.includes('watch?v=')) {
    const id = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

// --- SUB-PAGES ---

interface HomeProps {
  onNavigate: (p: Page) => void;
  sermons: Sermon[];
  notices: Notice[];
  onRegisterClick: () => void;
  onNoticeClick: (id: string) => void;
}

const HomePage: React.FC<HomeProps> = ({ onNavigate, sermons, notices, onRegisterClick, onNoticeClick }) => {
  const recentSermons = sermons.slice(0, 3);
  const recentNotices = notices.slice(0, 3);

  return (
    <>
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/1047/1920/1080" 
            alt="Church Interior" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-church-accent font-bold tracking-widest uppercase mb-4 animate-fade-in-up">Welcome to Grace & Peace Church</p>
          <h1 className="font-serif-heading text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            하나님의 사랑으로<br/>
            세상을 섬기는 공동체
          </h1>
          <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto hidden md:block">
            지친 영혼에게 쉼을, 갈급한 심령에 생수를 전하는 교회입니다.
            여러분을 주님의 이름으로 환영합니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => onNavigate(Page.SERMONS)} className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center">
              <PlayCircle className="mr-2" size={20} /> 설교 듣기
            </button>
            <button onClick={() => onNavigate(Page.CONTACT)} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-medium transition-all">
              오시는 길 안내
            </button>
          </div>
        </div>
      </section>

      {/* 1. Welcome Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
         <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-serif-heading text-3xl font-bold text-slate-800 mb-2">환영합니다</h2>
             <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
             <p className="text-slate-600 leading-relaxed mb-12 text-lg">
               은혜와평강교회 홈페이지를 찾아주신 여러분을 진심으로 환영합니다.<br className="hidden md:inline"/>
               저희 교회는 말씀 중심, 예배 중심, 선교 중심의 비전을 가지고<br className="hidden md:inline"/>
               지역 사회와 이웃을 섬기는 건강한 교회입니다.
             </p>
             
             {/* Worship Times Grid */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                  <Clock size={20} className="text-primary-600"/> 예배 시간 안내
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-600">
                 <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <span className="block font-bold text-slate-900 mb-1">주일 1부</span>
                    <span>오전 09:00</span>
                 </div>
                 <div className="text-center p-3 bg-primary-50 rounded-lg ring-1 ring-primary-100">
                    <span className="block font-bold text-primary-900 mb-1">주일 2부</span>
                    <span className="font-bold text-primary-700">오전 11:00</span>
                 </div>
                 <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <span className="block font-bold text-slate-900 mb-1">주일 오후</span>
                    <span>오후 02:00</span>
                 </div>
                 <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <span className="block font-bold text-slate-900 mb-1">수요예배</span>
                    <span>오후 07:30</span>
                 </div>
               </div>
             </div>
         </div>
      </section>

      {/* 2. Newcomer Section (Highlighted) */}
      <section className="bg-primary-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <h2 className="font-serif-heading text-3xl font-bold mb-3">새가족 등록 안내</h2>
                <p className="text-primary-200 text-lg">
                    처음 오셨나요? 등록 카드를 작성해주시면 친절히 안내해드립니다.<br/>
                    은혜와평강교회의 가족이 되신 것을 환영합니다.
                </p>
            </div>
            <button 
                onClick={onRegisterClick}
                className="bg-white text-primary-900 px-8 py-4 rounded-full font-bold hover:bg-primary-50 transition shadow-lg flex items-center flex-shrink-0"
            >
                <UserPlus className="mr-2" size={20}/> 온라인 등록하기
            </button>
        </div>
      </section>

      {/* 3. Church News (Notices) Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto bg-slate-50">
        <div className="text-center mb-16">
            <h2 className="font-serif-heading text-3xl font-bold text-slate-800">교회 소식</h2>
            <p className="text-slate-500 mt-2">교회의 새로운 소식과 행사를 전해드립니다</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {recentNotices.map(notice => (
              <div key={notice.id} onClick={() => onNoticeClick(notice.id)} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${notice.category === '행사' ? 'bg-orange-100 text-orange-700' : 'bg-primary-100 text-primary-700'}`}>
                      {notice.category}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center">
                        <Calendar size={12} className="mr-1"/> {notice.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-primary-600 transition mb-3 line-clamp-1">{notice.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">{notice.content}</p>
                  <div className="text-primary-600 text-xs font-bold flex items-center mt-auto">
                      자세히 보기 <ChevronRight size={12} className="ml-1"/>
                  </div>
              </div>
           ))}
        </div>
        
        <div className="text-center mt-12">
             <button onClick={() => onNavigate(Page.GALLERY)} className="inline-flex items-center text-primary-700 font-bold hover:text-primary-900">
                소식 더보기 <ArrowRight size={16} className="ml-1"/>
             </button>
        </div>
      </section>

      {/* 4. Sermons Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-heading text-3xl font-bold text-slate-800">최근 설교</h2>
            <p className="text-slate-500 mt-2">하나님의 말씀으로 한 주간 승리하세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentSermons.map((sermon) => (
              <div key={sermon.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group border border-slate-100">
                <div className="relative aspect-video bg-slate-200">
                  <img src={sermon.thumbnailUrl} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <PlayCircle className="text-white opacity-80 group-hover:opacity-100 transform scale-90 group-hover:scale-110 transition-all" size={48} />
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-primary-600 mb-2 block">{sermon.date}</span>
                  <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1">{sermon.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-1">{sermon.scripture} | {sermon.preacher}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => onNavigate(Page.SERMONS)} className="inline-flex items-center text-primary-700 font-bold hover:text-primary-900">
              설교 더보기 <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
      </section>

      {/* 5. AI Assistant Section (Moved to Bottom) */}
      <section className="py-24 px-4 max-w-7xl mx-auto bg-slate-50/50">
         <div className="max-w-3xl mx-auto">
            <GraceAssistant />
         </div>
      </section>
    </>
  );
};

interface SermonsPageProps {
  sermons: Sermon[];
}

const SermonsPage: React.FC<SermonsPageProps> = ({ sermons }) => {
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);

  // Initialize or update current sermon
  useEffect(() => {
    if (sermons.length > 0) {
      if (!currentSermon || !sermons.find(s => s.id === currentSermon.id)) {
        setCurrentSermon(sermons[0]);
      }
    } else {
      setCurrentSermon(null);
    }
  }, [sermons, currentSermon]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-serif-heading text-4xl font-bold text-slate-900 mb-4">말씀과 찬양</h1>
        <p className="text-slate-600">주일예배 설교영상과 찬양을 다시 보실 수 있습니다.</p>
      </div>
      
      {currentSermon && (
        <div className="mb-16 bg-black rounded-2xl overflow-hidden shadow-2xl relative aspect-video">
          {currentSermon.videoUrl ? (
            <iframe 
              src={getEmbedUrl(currentSermon.videoUrl)} 
              title={currentSermon.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white flex-col">
              <PlayCircle size={64} className="mb-4 text-primary-500" />
              <h2 className="text-2xl font-bold">{currentSermon.title}</h2>
              <p className="opacity-80 mt-2">{currentSermon.preacher} | {currentSermon.scripture}</p>
            </div>
          )}
        </div>
      )}

      {sermons.length === 0 && (
         <div className="text-center py-20 bg-slate-50 rounded-xl">
           <p className="text-slate-500">등록된 설교가 없습니다.</p>
         </div>
      )}

      <div className="flex flex-col mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-primary-500 pl-3">설교 목록</h3>
      </div>

      <div className="grid gap-6">
        {sermons.map((sermon) => (
          <div 
            key={sermon.id} 
            className={`flex flex-col md:flex-row bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition cursor-pointer ${currentSermon?.id === sermon.id ? 'border-primary-500 ring-1 ring-primary-500' : 'border-slate-100'}`}
            onClick={() => {
              setCurrentSermon(sermon);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="md:w-64 h-48 md:h-auto bg-slate-200 relative flex-shrink-0 group">
               <img src={sermon.thumbnailUrl} alt={sermon.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition">
                  {currentSermon?.id === sermon.id ? (
                    <div className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-bold">재생 중</div>
                  ) : (
                    <PlayCircle className="text-white" />
                  )}
               </div>
            </div>
            <div className="p-6 flex flex-col justify-center flex-grow">
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <Calendar size={14} className="mr-1" /> {sermon.date}
                <span className="mx-2">•</span>
                <Users size={14} className="mr-1" /> {sermon.preacher}
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-2">{sermon.title}</h3>
              <p className="text-slate-600 mb-4 font-serif-heading text-lg italic">"{sermon.scripture}"</p>
              <div className="flex gap-2">
                 <button className={`text-xs px-3 py-1 rounded flex items-center ${currentSermon?.id === sermon.id ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <PlayCircle size={12} className="mr-1"/> 
                    {currentSermon?.id === sermon.id ? '시청 중' : '영상보기'}
                 </button>
                 <button className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded text-slate-700 flex items-center" onClick={(e) => e.stopPropagation()}>
                    <Download size={12} className="mr-1"/> 설교요약
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface GalleryPageProps {
  notices: Notice[];
  galleryItems: GalleryItem[];
  onNoticeClick: (id: string) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ notices, galleryItems, onNoticeClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
       <div className="text-center mb-12">
        <h1 className="font-serif-heading text-4xl font-bold text-slate-900 mb-4">교회 소식</h1>
        <p className="text-slate-600">교회의 새로운 소식과 은혜로운 사역의 현장을 전해드립니다.</p>
      </div>

      <div className="mb-16">
         <h2 className="font-serif-heading text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-2 h-8 bg-primary-600 rounded-sm mr-3"></span>
            공지사항
         </h2>
         <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold">
                <tr>
                  <th className="px-6 py-3">분류</th>
                  <th className="px-6 py-3">제목</th>
                  <th className="px-6 py-3">작성일</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice.id} onClick={() => onNoticeClick(notice.id)} className="border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                    <td className="px-6 py-4 font-medium text-primary-600">{notice.category}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{notice.title}</td>
                    <td className="px-6 py-4">{notice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>

      <div className="pt-16 border-t border-slate-200">
         <h2 className="font-serif-heading text-2xl font-bold text-slate-900 mb-6 flex items-center">
             <span className="w-2 h-8 bg-primary-600 rounded-sm mr-3"></span>
             교회 앨범
          </h2>
         <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="break-inside-avoid bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition cursor-pointer group">
                <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
              </div>
            ))}
            {galleryItems.length === 0 && (
              <div className="break-inside-avoid bg-slate-50 rounded-lg p-6 text-center text-slate-500">
                등록된 사진이 없습니다.
              </div>
            )}
            <div className="break-inside-avoid bg-primary-50 rounded-lg p-6 text-center flex flex-col items-center justify-center min-h-[200px]">
               <p className="text-primary-800 font-bold mb-2">더 많은 사진 보기</p>
               <button className="bg-white px-4 py-2 rounded shadow-sm text-sm text-primary-600">인스타그램 방문</button>
            </div>
         </div>
      </div>
    </div>
  );
};

interface MinistryPageProps {
  ministries: MinistryInfo[];
  onMinistryClick: (id: string) => void;
}

const MinistryPage: React.FC<MinistryPageProps> = ({ ministries, onMinistryClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="font-serif-heading text-4xl font-bold text-slate-900 mb-4">교육 및 부서</h1>
        <p className="text-slate-600">다음 세대를 믿음의 용사로 양육합니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {ministries.map((ministry) => (
          <div key={ministry.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 group flex flex-col md:flex-row h-full">
            <div className="md:w-2/5 h-48 md:h-auto overflow-hidden relative">
              <img src={ministry.image} alt={ministry.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 md:w-3/5 flex flex-col justify-center relative">
              <h3 className="font-bold text-xl text-slate-800 mb-2">{ministry.name}</h3>
              <p className="text-primary-600 font-medium text-sm mb-4">{ministry.target} | {ministry.time}</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {ministry.description}
              </p>
              <button 
                onClick={() => onMinistryClick(ministry.id)}
                className="w-full py-2 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition flex items-center justify-center text-sm font-bold mt-auto"
              >
                부서 자세히 보기 <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
           <div className="bg-slate-100 h-[400px] md:h-auto flex items-center justify-center relative">
              <img src="https://picsum.photos/id/10/800/800" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" alt="Map Background" />
              <div className="relative z-10 bg-white p-4 rounded shadow-xl text-center">
                 <MapPin className="text-red-500 mx-auto mb-2" size={32} />
                 <p className="font-bold text-slate-800">은혜와평강교회</p>
                 <button className="mt-2 text-xs bg-primary-600 text-white px-3 py-1 rounded">네이버지도 보기</button>
              </div>
           </div>
           <div className="p-8 md:p-12">
             <h2 className="font-serif-heading text-3xl font-bold text-slate-800 mb-6">오시는 길</h2>
             <div className="space-y-6">
                <div>
                   <h3 className="font-bold text-lg text-primary-700 mb-2">주소</h3>
                   <p className="text-slate-600">서울특별시 은혜구 평강동 123 (평강로 7길 7)</p>
                   <p className="text-slate-500 text-sm mt-1">지하철 4호선 평강역 3번 출구에서 도보 5분</p>
                </div>
                <div>
                   <h3 className="font-bold text-lg text-primary-700 mb-2">연락처</h3>
                   <p className="text-slate-600">02-1234-5678 (행정실)</p>
                   <p className="text-slate-600">02-1234-5679 (목양실)</p>
                </div>
                <div>
                   <h3 className="font-bold text-lg text-primary-700 mb-2">차량 운행</h3>
                   <p className="text-slate-600 text-sm">
                      매 주일 오전 8:30 / 10:30 (2회 운행)<br/>
                      A코스: 평강아파트 정문 -> 행복마트 앞 -> 교회<br/>
                      B코스: 소망빌라 입구 -> 래미안 후문 -> 교회
                   </p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- APP ROOT ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedMinistryId, setSelectedMinistryId] = useState<string | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);

  // Modal States
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTarget, setInquiryTarget] = useState<{name: string, id: string} | null>(null);
  
  // Data States
  const [sermons, setSermons] = useState<Sermon[]>(() => {
    try { return JSON.parse(localStorage.getItem('sermons') || 'null') || INITIAL_SERMONS; } catch { return INITIAL_SERMONS; }
  });
  const [notices, setNotices] = useState<Notice[]>(() => {
    try { return JSON.parse(localStorage.getItem('notices') || 'null') || INITIAL_NOTICES; } catch { return INITIAL_NOTICES; }
  });
  const [ministries, setMinistries] = useState<MinistryInfo[]>(() => {
    try { return JSON.parse(localStorage.getItem('ministries') || 'null') || INITIAL_MINISTRY; } catch { return INITIAL_MINISTRY; }
  });
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('galleryItems') || 'null') || INITIAL_GALLERY; } catch { return INITIAL_GALLERY; }
  });
  const [registrations, setRegistrations] = useState<NewcomerRegistration[]>(() => {
    try { return JSON.parse(localStorage.getItem('registrations') || 'null') || []; } catch { return []; }
  });
  const [inquiries, setInquiries] = useState<MinistryInquiry[]>(() => {
    try { return JSON.parse(localStorage.getItem('inquiries') || 'null') || []; } catch { return []; }
  });

  // LocalStorage Effects
  useEffect(() => localStorage.setItem('sermons', JSON.stringify(sermons)), [sermons]);
  useEffect(() => localStorage.setItem('notices', JSON.stringify(notices)), [notices]);
  useEffect(() => localStorage.setItem('ministries', JSON.stringify(ministries)), [ministries]);
  useEffect(() => localStorage.setItem('galleryItems', JSON.stringify(galleryItems)), [galleryItems]);
  useEffect(() => localStorage.setItem('registrations', JSON.stringify(registrations)), [registrations]);
  useEffect(() => localStorage.setItem('inquiries', JSON.stringify(inquiries)), [inquiries]);

  // Handlers
  const handleMinistryClick = (id: string) => {
    setSelectedMinistryId(id);
    setCurrentPage(Page.MINISTRY_DETAIL);
  };

  const handleNoticeClick = (id: string) => {
    setSelectedNoticeId(id);
    setCurrentPage(Page.NOTICE_DETAIL);
  };

  const handleOpenInquiry = (name: string, id: string) => {
    setInquiryTarget({ name, id });
    setIsInquiryModalOpen(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newReg: NewcomerRegistration = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      birthYear: formData.get('birthYear') as string,
      address: formData.get('address') as string,
      description: formData.get('description') as string,
      date: new Date().toISOString().split('T')[0],
      status: '접수'
    };
    setRegistrations([newReg, ...registrations]);
    alert('새가족 등록 신청이 완료되었습니다. 담당자가 곧 연락드리겠습니다.');
    setIsRegistrationModalOpen(false);
  };

  const handleInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inquiryTarget) return;
    const formData = new FormData(e.currentTarget);
    const newInquiry: MinistryInquiry = {
      id: Date.now().toString(),
      ministryName: inquiryTarget.name,
      ministryId: inquiryTarget.id,
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      date: new Date().toISOString().split('T')[0],
      status: '미확인'
    };
    setInquiries([newInquiry, ...inquiries]);
    alert(`${inquiryTarget.name}에 문의가 접수되었습니다.`);
    setIsInquiryModalOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <HomePage onNavigate={setCurrentPage} sermons={sermons} notices={notices} onRegisterClick={() => setIsRegistrationModalOpen(true)} onNoticeClick={handleNoticeClick} />;
      case Page.ABOUT: return <AboutPage />;
      case Page.SERMONS: return <SermonsPage sermons={sermons} />;
      case Page.MINISTRY: return <MinistryPage ministries={ministries} onMinistryClick={handleMinistryClick} />;
      case Page.MINISTRY_DETAIL: 
        const ministry = ministries.find(m => m.id === selectedMinistryId);
        return ministry ? <MinistryDetailPage ministry={ministry} onBack={() => setCurrentPage(Page.MINISTRY)} onInquiry={handleOpenInquiry} /> : <MinistryPage ministries={ministries} onMinistryClick={handleMinistryClick} />;
      case Page.GALLERY: return <GalleryPage notices={notices} galleryItems={galleryItems} onNoticeClick={handleNoticeClick} />;
      case Page.NOTICE_DETAIL:
        const notice = notices.find(n => n.id === selectedNoticeId);
        return notice ? <NoticeDetailPage notice={notice} onBack={() => setCurrentPage(Page.GALLERY)} /> : <GalleryPage notices={notices} galleryItems={galleryItems} onNoticeClick={handleNoticeClick} />;
      case Page.CONTACT: return <ContactPage />;
      case Page.ADMIN: return <AdminDashboard 
                                sermons={sermons} 
                                notices={notices} 
                                ministries={ministries}
                                galleryItems={galleryItems}
                                registrations={registrations}
                                inquiries={inquiries}
                                onUpdateSermons={setSermons} 
                                onUpdateNotices={setNotices} 
                                onUpdateMinistries={setMinistries}
                                onUpdateGalleryItems={setGalleryItems}
                                onUpdateRegistrations={setRegistrations}
                                onUpdateInquiries={setInquiries}
                              />;
      default: return <HomePage onNavigate={setCurrentPage} sermons={sermons} notices={notices} onRegisterClick={() => setIsRegistrationModalOpen(true)} onNoticeClick={handleNoticeClick} />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedMinistryId, selectedNoticeId]);

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}

      {/* Newcomer Registration Modal */}
      {isRegistrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-serif-heading text-xl font-bold text-slate-800">새가족 온라인 등록</h3>
              <button onClick={() => setIsRegistrationModalOpen(false)}><X size={20} className="text-slate-400 hover:text-slate-600" /></button>
            </div>
            <form onSubmit={handleRegistrationSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-xs font-bold text-slate-600 mb-1">성명</label>
                 <input name="name" required className="w-full border border-slate-200 rounded px-3 py-2 text-sm" />
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">연락처</label>
                    <input name="phone" required placeholder="010-0000-0000" className="w-full border border-slate-200 rounded px-3 py-2 text-sm" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">출생연도</label>
                    <input name="birthYear" required placeholder="예: 1990" className="w-full border border-slate-200 rounded px-3 py-2 text-sm" />
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-600 mb-1">주소</label>
                 <input name="address" required className="w-full border border-slate-200 rounded px-3 py-2 text-sm" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-600 mb-1">비고 (인도자, 요청사항 등)</label>
                 <textarea name="description" rows={3} className="w-full border border-slate-200 rounded px-3 py-2 text-sm"></textarea>
               </div>
               <button className="w-full bg-primary-600 text-white py-3 rounded font-bold hover:bg-primary-700 transition">등록 신청하기</button>
            </form>
          </div>
        </div>
      )}

      {/* Ministry Inquiry Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <div>
                 <p className="text-xs font-bold text-primary-600 uppercase">사역 문의</p>
                 <h3 className="font-serif-heading text-xl font-bold text-slate-800">{inquiryTarget?.name}</h3>
               </div>
               <button onClick={() => setIsInquiryModalOpen(false)}><X size={20} className="text-slate-400 hover:text-slate-600" /></button>
             </div>
             <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">성명</label>
                  <input name="name" required className="w-full border border-slate-200 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">연락처</label>
                  <input name="phone" required placeholder="010-0000-0000" className="w-full border border-slate-200 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">문의 내용</label>
                  <textarea name="message" required rows={4} className="w-full border border-slate-200 rounded px-3 py-2 text-sm" placeholder="궁금하신 점을 남겨주세요."></textarea>
                </div>
                <button className="w-full bg-slate-800 text-white py-3 rounded font-bold hover:bg-slate-700 transition">문의하기</button>
             </form>
           </div>
        </div>
      )}

    </Layout>
  );
};

export default App;