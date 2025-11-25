import React, { useState } from 'react';
import { Plus, Trash2, Video, FileText, CheckCircle, LogIn, Users, Image, Edit2, Save, XCircle, UserPlus, MessageSquare, CheckSquare } from 'lucide-react';
import { Sermon, Notice, MinistryInfo, GalleryItem, NewcomerRegistration, MinistryInquiry } from '../types';

interface AdminDashboardProps {
  sermons: Sermon[];
  notices: Notice[];
  ministries: MinistryInfo[];
  galleryItems: GalleryItem[];
  registrations: NewcomerRegistration[];
  inquiries: MinistryInquiry[];
  onUpdateSermons: (sermons: Sermon[]) => void;
  onUpdateNotices: (notices: Notice[]) => void;
  onUpdateMinistries: (ministries: MinistryInfo[]) => void;
  onUpdateGalleryItems: (items: GalleryItem[]) => void;
  onUpdateRegistrations: (regs: NewcomerRegistration[]) => void;
  onUpdateInquiries: (inqs: MinistryInquiry[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  sermons, 
  notices,
  ministries,
  galleryItems, 
  registrations,
  inquiries,
  onUpdateSermons, 
  onUpdateNotices,
  onUpdateMinistries,
  onUpdateGalleryItems,
  onUpdateRegistrations,
  onUpdateInquiries
}) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'sermons' | 'notices' | 'ministries' | 'gallery' | 'registrations' | 'inquiries'>('sermons');
  
  // Edit State for Ministry
  const [editingMinistryId, setEditingMinistryId] = useState<string | null>(null);
  const [ministryFormData, setMinistryFormData] = useState<Partial<MinistryInfo>>({});

  // Edit State for Notice
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeFormData, setNoticeFormData] = useState<Partial<Notice>>({});

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'amen') { 
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // Add Sermon Handler
  const handleAddSermon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSermon: Sermon = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      preacher: formData.get('preacher') as string || '김은혜 담임목사',
      date: formData.get('date') as string,
      scripture: formData.get('scripture') as string,
      videoUrl: formData.get('videoUrl') as string,
      thumbnailUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1000}/800/450`,
    };
    onUpdateSermons([newSermon, ...sermons]);
    e.currentTarget.reset();
    alert('설교가 등록되었습니다.');
  };

  const handleDeleteSermon = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      onUpdateSermons(sermons.filter(s => s.id !== id));
    }
  };

  // Notice Management (Add & Edit)
  const handleNoticeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const noticeData: Notice = {
      id: editingNoticeId || Date.now().toString(),
      title: formData.get('title') as string,
      category: formData.get('category') as '일반' | '모임' | '행사',
      date: formData.get('date') as string || new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      content: formData.get('content') as string,
    };

    if (editingNoticeId) {
      onUpdateNotices(notices.map(n => n.id === editingNoticeId ? noticeData : n));
      alert('공지사항이 수정되었습니다.');
      setEditingNoticeId(null);
      setNoticeFormData({});
    } else {
      onUpdateNotices([noticeData, ...notices]);
      alert('공지사항이 등록되었습니다.');
    }
    e.currentTarget.reset();
  };

  const startEditNotice = (notice: Notice) => {
    setEditingNoticeId(notice.id);
    setNoticeFormData(notice);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditNotice = () => {
    setEditingNoticeId(null);
    setNoticeFormData({});
  };

  const handleDeleteNotice = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      onUpdateNotices(notices.filter(n => n.id !== id));
      if (editingNoticeId === id) cancelEditNotice();
    }
  };

  const handleNoticeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNoticeFormData(prev => ({ ...prev, [name]: value }));
  };

  // Ministry Management (Add & Edit)
  const handleMinistrySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const ministryData: MinistryInfo = {
      id: editingMinistryId || Date.now().toString(),
      name: formData.get('name') as string,
      target: formData.get('target') as string,
      time: formData.get('time') as string,
      description: formData.get('description') as string,
      longDescription: formData.get('longDescription') as string,
      location: formData.get('location') as string,
      leaders: formData.get('leaders') as string,
      image: formData.get('image') as string || 'https://picsum.photos/600/400',
    };

    if (editingMinistryId) {
      onUpdateMinistries(ministries.map(m => m.id === editingMinistryId ? ministryData : m));
      alert('부서 정보가 수정되었습니다.');
      setEditingMinistryId(null);
      setMinistryFormData({});
    } else {
      onUpdateMinistries([...ministries, ministryData]);
      alert('부서 정보가 등록되었습니다.');
    }
    
    e.currentTarget.reset();
  };

  const startEditMinistry = (ministry: MinistryInfo) => {
    setEditingMinistryId(ministry.id);
    setMinistryFormData(ministry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditMinistry = () => {
    setEditingMinistryId(null);
    setMinistryFormData({});
  };

  const handleDeleteMinistry = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      onUpdateMinistries(ministries.filter(m => m.id !== id));
      if (editingMinistryId === id) {
        cancelEditMinistry();
      }
    }
  };

  // Gallery Management
  const handleAddGalleryItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      imageUrl: formData.get('imageUrl') as string || 'https://picsum.photos/400/300',
    };
    onUpdateGalleryItems([newItem, ...galleryItems]);
    e.currentTarget.reset();
    alert('사진이 등록되었습니다.');
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      onUpdateGalleryItems(galleryItems.filter(i => i.id !== id));
    }
  };

  // Registration & Inquiry Status Management
  const toggleRegistrationStatus = (id: string) => {
    onUpdateRegistrations(registrations.map(r => {
      if (r.id !== id) return r;
      const nextStatus = r.status === '접수' ? '연락완료' : r.status === '연락완료' ? '등록완료' : '접수';
      return { ...r, status: nextStatus };
    }));
  };

  const toggleInquiryStatus = (id: string) => {
    onUpdateInquiries(inquiries.map(i => {
      if (i.id !== id) return i;
      return { ...i, status: i.status === '미확인' ? '확인완료' : '미확인' };
    }));
  };

  const handleDeleteRegistration = (id: string) => {
    if(confirm('삭제하시겠습니까?')) {
      onUpdateRegistrations(registrations.filter(r => r.id !== id));
    }
  };

  const handleDeleteInquiry = (id: string) => {
    if(confirm('삭제하시겠습니까?')) {
      onUpdateInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  // Helper to handle input changes for Ministry form
  const handleMinistryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMinistryFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary-600" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900">관리자 접속</h2>
            <p className="mt-2 text-sm text-slate-500">교회 관리자 비밀번호를 입력해주세요.</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                접속하기
              </button>
            </div>
            <p className="text-center text-xs text-slate-400">초기 비밀번호: amen</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif-heading text-3xl font-bold text-slate-900">교회 관리 시스템</h1>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-sm text-slate-500 hover:text-slate-700 underline"
        >
          로그아웃
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
        <button onClick={() => setActiveTab('sermons')} className={`whitespace-nowrap pb-4 px-2 font-medium text-sm transition-colors relative flex items-center ${activeTab === 'sermons' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}>
          <Video size={16} className="mr-2" /> 설교 관리
        </button>
        <button onClick={() => setActiveTab('notices')} className={`whitespace-nowrap pb-4 px-2 font-medium text-sm transition-colors relative flex items-center ${activeTab === 'notices' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}>
          <FileText size={16} className="mr-2" /> 공지사항
        </button>
        <button onClick={() => setActiveTab('ministries')} className={`whitespace-nowrap pb-4 px-2 font-medium text-sm transition-colors relative flex items-center ${activeTab === 'ministries' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}>
          <Users size={16} className="mr-2" /> 부서 관리
        </button>
        <button onClick={() => setActiveTab('gallery')} className={`whitespace-nowrap pb-4 px-2 font-medium text-sm transition-colors relative flex items-center ${activeTab === 'gallery' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}>
          <Image size={16} className="mr-2" /> 앨범 관리
        </button>
        <button onClick={() => setActiveTab('registrations')} className={`whitespace-nowrap pb-4 px-2 font-medium text-sm transition-colors relative flex items-center ${activeTab === 'registrations' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}>
          <UserPlus size={16} className="mr-2" /> 새가족 관리
          {registrations.filter(r => r.status === '접수').length > 0 && <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">{registrations.filter(r => r.status === '접수').length}</span>}
        </button>
        <button onClick={() => setActiveTab('inquiries')} className={`whitespace-nowrap pb-4 px-2 font-medium text-sm transition-colors relative flex items-center ${activeTab === 'inquiries' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}>
          <MessageSquare size={16} className="mr-2" /> 문의 관리
          {inquiries.filter(i => i.status === '미확인').length > 0 && <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">{inquiries.filter(i => i.status === '미확인').length}</span>}
        </button>
      </div>

      {/* Sermons Tab */}
      {activeTab === 'sermons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center text-slate-800">
                <Plus size={18} className="mr-2" /> 새 설교 등록
              </h3>
              <form onSubmit={handleAddSermon} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">설교 제목</label>
                  <input name="title" required type="text" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="예: 믿음의 경주" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">설교자</label>
                  <input name="preacher" type="text" defaultValue="김은혜 담임목사" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">날짜</label>
                  <input name="date" required type="date" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">본문 말씀</label>
                  <input name="scripture" required type="text" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="예: 로마서 8:1-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">유튜브 링크</label>
                  <input name="videoUrl" type="url" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="https://youtube.com/watch?v=..." />
                </div>
                <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded font-bold text-sm hover:bg-slate-700 transition flex items-center justify-center">
                  <CheckCircle size={16} className="mr-2" /> 등록하기
                </button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-lg mb-4 text-slate-800">등록된 설교 목록 ({sermons.length})</h3>
            {sermons.map((sermon) => (
              <div key={sermon.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex justify-between items-center group hover:border-primary-200 transition">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                    <img src={sermon.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{sermon.title}</h4>
                    <p className="text-xs text-slate-500">{sermon.date} | {sermon.preacher}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteSermon(sermon.id)} className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notices Tab */}
      {activeTab === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <div className={`bg-white p-6 rounded-xl shadow-sm border ${editingNoticeId ? 'border-primary-500 ring-1 ring-primary-500' : 'border-slate-100'} sticky top-24 transition-all`}>
              <h3 className="font-bold text-lg mb-4 flex items-center text-slate-800">
                {editingNoticeId ? (
                   <><Edit2 size={18} className="mr-2 text-primary-600" /> 공지사항 수정</>
                ) : (
                   <><Plus size={18} className="mr-2" /> 새 공지 등록</>
                )}
              </h3>
              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">제목</label>
                  <input name="title" required type="text" value={noticeFormData.title || ''} onChange={handleNoticeInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">분류</label>
                    <select name="category" value={noticeFormData.category || '일반'} onChange={handleNoticeInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500">
                      <option value="일반">일반</option>
                      <option value="행사">행사</option>
                      <option value="모임">모임</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">날짜</label>
                    <input name="date" type="text" value={noticeFormData.date || ''} onChange={handleNoticeInputChange} placeholder="YYYY.MM.DD" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-600 mb-1">내용 (상세)</label>
                   <textarea name="content" rows={10} value={noticeFormData.content || ''} onChange={handleNoticeInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="공지사항 상세 내용을 입력하세요."></textarea>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className={`flex-1 text-white py-3 rounded font-bold text-sm hover:opacity-90 transition flex items-center justify-center ${editingNoticeId ? 'bg-primary-600' : 'bg-slate-800'}`}>
                    {editingNoticeId ? <><Save size={16} className="mr-2" /> 수정 완료</> : <><CheckCircle size={16} className="mr-2" /> 등록하기</>}
                  </button>
                  {editingNoticeId && (
                     <button type="button" onClick={cancelEditNotice} className="px-4 bg-slate-200 text-slate-600 rounded font-bold text-sm hover:bg-slate-300 transition flex items-center justify-center">
                        <XCircle size={18} />
                     </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-lg mb-4 text-slate-800">등록된 공지 목록 ({notices.length})</h3>
            {notices.map((notice) => (
              <div key={notice.id} className={`bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center group transition ${editingNoticeId === notice.id ? 'border-primary-500 bg-primary-50' : 'border-slate-100 hover:border-primary-200'}`}>
                <div>
                   <span className={`inline-block px-2 py-0.5 rounded text-xs mb-1 ${notice.category === '행사' ? 'bg-orange-100 text-orange-700' : 'bg-primary-50 text-primary-700'}`}>{notice.category}</span>
                   <h4 className="font-bold text-slate-800 text-sm">{notice.title}</h4>
                   <p className="text-xs text-slate-500">{notice.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => startEditNotice(notice)} className="text-slate-400 hover:text-primary-600 p-2 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDeleteNotice(notice.id)} className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ministries Tab */}
      {activeTab === 'ministries' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <div className={`bg-white p-6 rounded-xl shadow-sm border ${editingMinistryId ? 'border-primary-500 ring-1 ring-primary-500' : 'border-slate-100'} sticky top-24 transition-all`}>
              <h3 className="font-bold text-lg mb-4 flex items-center text-slate-800">
                {editingMinistryId ? (
                   <><Edit2 size={18} className="mr-2 text-primary-600" /> 부서 정보 수정</>
                ) : (
                   <><Plus size={18} className="mr-2" /> 부서 추가</>
                )}
              </h3>
              
              <form onSubmit={handleMinistrySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">부서명</label>
                  <input name="name" required type="text" value={ministryFormData.name || ''} onChange={handleMinistryInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="예: 영유아부" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">대상</label>
                      <input name="target" required type="text" value={ministryFormData.target || ''} onChange={handleMinistryInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="예: 0-4세" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">예배 시간</label>
                      <input name="time" required type="text" value={ministryFormData.time || ''} onChange={handleMinistryInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="예: 11시" />
                    </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">장소</label>
                  <input name="location" type="text" value={ministryFormData.location || ''} onChange={handleMinistryInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="예: 교육관 101호" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">섬기는 분들 (교역자/부장)</label>
                  <input name="leaders" type="text" value={ministryFormData.leaders || ''} onChange={handleMinistryInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="예: 김담당 목사, 이부장 집사" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">간단 소개 (목록용)</label>
                  <textarea name="description" required rows={2} value={ministryFormData.description || ''} onChange={handleMinistryInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="목록에 표시될 짧은 소개" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">상세 소개글 (페이지용)</label>
                  <textarea name="longDescription" rows={5} value={ministryFormData.longDescription || ''} onChange={handleMinistryInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="상세 페이지에 표시될 내용. 줄바꿈이 반영됩니다." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">대표 이미지 URL</label>
                  <input name="image" type="text" value={ministryFormData.image || ''} onChange={handleMinistryInputChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="https://..." />
                </div>
                
                <div className="flex gap-2">
                  <button type="submit" className={`flex-1 text-white py-3 rounded font-bold text-sm hover:opacity-90 transition flex items-center justify-center ${editingMinistryId ? 'bg-primary-600' : 'bg-slate-800'}`}>
                    {editingMinistryId ? <><Save size={16} className="mr-2" /> 수정 완료</> : <><CheckCircle size={16} className="mr-2" /> 부서 등록</>}
                  </button>
                  {editingMinistryId && (
                     <button type="button" onClick={cancelEditMinistry} className="px-4 bg-slate-200 text-slate-600 rounded font-bold text-sm hover:bg-slate-300 transition flex items-center justify-center">
                        <XCircle size={18} />
                     </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-lg mb-4 text-slate-800">교육부서 목록 ({ministries.length})</h3>
            {ministries.map((ministry) => (
              <div key={ministry.id} className={`bg-white p-4 rounded-lg shadow-sm border flex items-start group transition ${editingMinistryId === ministry.id ? 'border-primary-500 bg-primary-50' : 'border-slate-100 hover:border-primary-200'}`}>
                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                  <img src={ministry.image} alt={ministry.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                   <h4 className="font-bold text-slate-800 text-base">{ministry.name}</h4>
                   <p className="text-xs text-primary-600 font-medium mb-1">{ministry.target} | {ministry.time}</p>
                   <p className="text-xs text-slate-500 line-clamp-2">{ministry.description}</p>
                </div>
                <div className="flex flex-col space-y-2 ml-2">
                  <button onClick={() => startEditMinistry(ministry)} className="text-slate-400 hover:text-primary-600 p-1 transition-colors" title="수정">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDeleteMinistry(ministry.id)} className="text-slate-400 hover:text-red-500 p-1 transition-colors" title="삭제">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center text-slate-800">
                <Plus size={18} className="mr-2" /> 새 사진 등록
              </h3>
              <form onSubmit={handleAddGalleryItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">제목</label>
                  <input name="title" required type="text" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="예: 여름성경학교" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">날짜</label>
                  <input name="date" required type="date" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">이미지 URL</label>
                  <input name="imageUrl" required type="text" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary-500" placeholder="https://..." />
                  <p className="text-xs text-slate-400 mt-1">구글 포토 등의 이미지 주소를 입력하세요.</p>
                </div>
                <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded font-bold text-sm hover:bg-slate-700 transition flex items-center justify-center">
                  <CheckCircle size={16} className="mr-2" /> 사진 등록하기
                </button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-lg mb-4 text-slate-800">등록된 앨범 목록 ({galleryItems.length})</h3>
            <div className="grid grid-cols-2 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden group hover:border-primary-200 transition relative">
                  <div className="aspect-video bg-slate-100">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                     <h4 className="font-bold text-slate-800 text-sm truncate">{item.title}</h4>
                     <p className="text-xs text-slate-500">{item.date}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteGalleryItem(item.id)} 
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full text-slate-500 hover:text-red-500 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Registrations Tab */}
      {activeTab === 'registrations' && (
        <div className="space-y-6">
           <h3 className="font-bold text-lg text-slate-800">새가족 온라인 등록 현황 ({registrations.length})</h3>
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-xs">
                 <tr>
                   <th className="px-6 py-4">접수일</th>
                   <th className="px-6 py-4">성명</th>
                   <th className="px-6 py-4">연락처/생년</th>
                   <th className="px-6 py-4">주소</th>
                   <th className="px-6 py-4">비고</th>
                   <th className="px-6 py-4">상태</th>
                   <th className="px-6 py-4">관리</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {registrations.length === 0 ? (
                   <tr>
                     <td colSpan={7} className="px-6 py-8 text-center text-slate-400">등록된 데이터가 없습니다.</td>
                   </tr>
                 ) : registrations.map((reg) => (
                   <tr key={reg.id} className="hover:bg-slate-50">
                     <td className="px-6 py-4 text-slate-500">{reg.date}</td>
                     <td className="px-6 py-4 font-bold text-slate-800">{reg.name}</td>
                     <td className="px-6 py-4 text-slate-600">
                       {reg.phone}<br/>
                       <span className="text-slate-400 text-xs">{reg.birthYear}년생</span>
                     </td>
                     <td className="px-6 py-4 text-slate-600">{reg.address}</td>
                     <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={reg.description}>{reg.description}</td>
                     <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                         reg.status === '접수' ? 'bg-red-100 text-red-700' :
                         reg.status === '연락완료' ? 'bg-yellow-100 text-yellow-700' :
                         'bg-green-100 text-green-700'
                       }`}>
                         {reg.status}
                       </span>
                     </td>
                     <td className="px-6 py-4 flex gap-2">
                       <button onClick={() => toggleRegistrationStatus(reg.id)} className="text-primary-600 hover:text-primary-800 text-xs underline">
                         상태변경
                       </button>
                       <button onClick={() => handleDeleteRegistration(reg.id)} className="text-slate-400 hover:text-red-500 text-xs">
                         <Trash2 size={14} />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Inquiries Tab */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
           <h3 className="font-bold text-lg text-slate-800">교육부서 사역 문의 현황 ({inquiries.length})</h3>
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-xs">
                 <tr>
                   <th className="px-6 py-4">접수일</th>
                   <th className="px-6 py-4">대상 부서</th>
                   <th className="px-6 py-4">성명/연락처</th>
                   <th className="px-6 py-4">문의내용</th>
                   <th className="px-6 py-4">상태</th>
                   <th className="px-6 py-4">관리</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {inquiries.length === 0 ? (
                   <tr>
                     <td colSpan={6} className="px-6 py-8 text-center text-slate-400">문의 내역이 없습니다.</td>
                   </tr>
                 ) : inquiries.map((inq) => (
                   <tr key={inq.id} className="hover:bg-slate-50">
                     <td className="px-6 py-4 text-slate-500">{inq.date}</td>
                     <td className="px-6 py-4 font-bold text-primary-700">{inq.ministryName}</td>
                     <td className="px-6 py-4 text-slate-600">
                       {inq.name}<br/>
                       <span className="text-slate-400 text-xs">{inq.phone}</span>
                     </td>
                     <td className="px-6 py-4 text-slate-600 max-w-sm whitespace-pre-wrap">{inq.message}</td>
                     <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                         inq.status === '미확인' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                       }`}>
                         {inq.status}
                       </span>
                     </td>
                     <td className="px-6 py-4 flex gap-2">
                       <button onClick={() => toggleInquiryStatus(inq.id)} className="text-primary-600 hover:text-primary-800 text-xs underline">
                         {inq.status === '미확인' ? '확인처리' : '미확인처리'}
                       </button>
                       <button onClick={() => handleDeleteInquiry(inq.id)} className="text-slate-400 hover:text-red-500 text-xs">
                         <Trash2 size={14} />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;