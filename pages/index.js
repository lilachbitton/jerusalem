import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Car, Home, Heart, Coffee } from 'lucide-react';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: false,
    paymentMethod: ''
  });
  const [activeField, setActiveField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/tiqbhru7nwdnaqq419re84nlhsqseeg2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submitDate: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('שגיאה בשליחת הטופס');
      }
    } catch (error) {
      alert('אירעה שגיאה בשליחת הטופס. אנא נסי שנית.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCalendar = () => {
    const event = {
      text: "טיול נשים בירושלים - ראש חודש",
      details: "טיול נשים מיוחד בירושלים לכבוד ראש חודש",
      location: "בית הבובות, חולון",
      startDate: "20250129T190000",
      endDate: "20250130T000000"
    };
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate}/${event.endDate}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppShare = () => {
    const text = `הי! מצטרפת אלינו לטיול נשים מיוחד בירושלים לכבוד ראש חודש? 🌙✨\nיום רביעי, כ"ט בטבת | 29.1.2025\nלפרטים והרשמה: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const infoCards = [
    {
      icon: Calendar,
      title: "תאריך",
      text: "יום רביעי, כ\"ט בטבת",
      detail: "29.1.2025",
      direction: "right"
    },
    {
      icon: MapPin,
      title: "נקודת מפגש",
      text: "בית הבובות, חולון",
      detail: "יציאה בשעה 19:00",
      direction: "left"
    },
    {
      icon: Clock,
      title: "שעות",
      text: "19:00-00:00",
      detail: "חזרה משוערת",
      direction: "right"
    },
    {
      icon: Users,
      title: "מספר משתתפות",
      text: "פתוח לכולן",
      detail: "",
      direction: "left"
    }
  ];

  const timelineItems = [
    { time: '19:00', title: 'יציאה מחולון', desc: 'התכנסות בבית הבובות', icon: Car },
    { time: '20:00', title: 'קבר שמואל הנביא', desc: 'תפילה והתבודדות במקום הקדוש', icon: Heart },
    { time: '21:00', title: 'סעודת ראש חודש', desc: 'ארוחה חלבית מפנקת', icon: Coffee },
    { time: '22:30', title: 'קבר רחל', desc: 'תפילה במקום הקדוש', icon: Heart },
    { time: '00:00', title: 'חזרה לחולון', desc: 'סיום משוער', icon: Home }
  ];
return (
    <div className="relative min-h-screen overflow-hidden">
      {/* רקע דינמי עם איורים */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 opacity-70" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-2-2-5-2-7 0l-2 2c-2 2-2 5 0 7l9 9 9-9c2-2 2-5 0-7l-2-2c-2-2-5-2-7 0z' fill='%23EC4899' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          backgroundRepeat: 'repeat',
          opacity: 0.3
        }} />
      </div>
      
      <div dir="rtl" className="relative">
        <div className={`max-w-6xl mx-auto p-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* כותרת ראשית */}
          <div className="text-center py-16 px-4 animate-on-scroll opacity-0">
            <div className="inline-block relative">
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                טיול נשים קסום בירושלים
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 blur opacity-20 -z-10 animate-pulse"></div>
            </div>
            <h2 className="text-2xl md:text-3xl text-purple-700 mt-4">
              לכבוד ראש חודש שבט | 29.1.2025
            </h2>
          </div>

          {/* קלפי מידע */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 px-4">
            {infoCards.map((item, idx) => (
              <div
                key={idx}
                className={`group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 transform transition-all duration-500 
                  hover:shadow-2xl hover:scale-105 cursor-pointer animate-on-scroll opacity-0`}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="transform transition-transform duration-300 group-hover:scale-110">
                    <item.icon className={`w-8 h-8 text-purple-500 ${activeCard === idx ? 'animate-bounce' : ''}`} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 transition-colors duration-300 group-hover:text-purple-600">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                  {item.detail && (
                    <p className="text-purple-500 text-sm">{item.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* לוח זמנים */}
          <div className="max-w-4xl mx-auto mb-12 animate-on-scroll opacity-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-purple-700 mb-8 text-center">מסלול הטיול</h3>
              <div className="space-y-8">
                {timelineItems.map((item, idx) => (
                  <div key={idx} className="relative">
                    {idx !== timelineItems.length - 1 && (
                      <div className="absolute right-[1.3rem] top-10 w-0.5 h-16 bg-purple-100" />
                    )}
                    <div className="flex items-start group hover:scale-105 transition-transform">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                          <item.icon className="w-5 h-5 text-purple-500" />
                        </div>
                      </div>
                      <div className="mr-6">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg text-gray-800 group-hover:text-purple-500 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-sm text-purple-500">{item.time}</span>
                        </div>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* מידע חשוב */}
          <div className="max-w-4xl mx-auto mb-12 animate-on-scroll opacity-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-purple-600 text-center mb-4">מידע חשוב למשתתפות</h4>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-700 font-medium text-center">יש להגיע בלבוש חם - קר מאוד בערב!</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-700 font-medium text-center">יש להגיע בזמן לנקודת המפגש - לא נוכל להמתין למאחרות</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handleAddToCalendar}
                  className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  הוספה ליומן
                </button>
                
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h.1c5.38 0 9.9-4.48 9.9-10S17.52 2 12 2zm4.95 14.35l-1.55 1.55c-2.35 0-4.35-.85-5.95-2.45s-2.45-3.6-2.45-5.95l1.55-1.55c.1-.1.2-.15.35-.15s.25.05.35.15l2.2 2.2c.1.1.15.2.15.35s-.05.25-.15.35L9.7 12.3c.3.6.7 1.2 1.25 1.65.55.45 1.15.85 1.75 1.15l1.55-1.55c.1-.1.2-.15.35-.15s.25.05.35.15l2.2 2.2c.1.1.15.2.15.35s-.05.25-.15.35z"/>
                  </svg>
                  שיתוף בווטסאפ
                </button>
              </div>
            </div>
          </div>

          {/* טופס הרשמה */}
          {!submitted ? (
            <div className="max-w-2xl mx-auto mb-12 animate-on-scroll opacity-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-purple-700 mb-3">הרשמה לטיול</h3>
                  <div className="inline-block bg-purple-50 rounded-lg px-4 py-2">
                    <p className="text-purple-800 font-medium">המחיר הסופי ייקבע על פי מספר המשתתפות</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className={`transform transition-all duration-300 ${activeField === 'name' ? 'scale-105' : ''}`}>
                    <label className="block text-gray-700 font-bold mb-2">שם מלא</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-purple-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                    />
                  </div>
                  
                  <div className={`transform transition-all duration-300 ${activeField === 'phone' ? 'scale-105' : ''}`}>
                    <label className="block text-gray-700 font-bold mb-2">טלפון</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-purple-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      onFocus={() => setActiveField('phone')}
                      onBlur={() => setActiveField(null)}
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-purple-500 rounded border-purple-100 focus:ring-purple-400 transition-colors"
                        checked={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.checked})}
                      />
                      <span className="text-gray-700 font-bold">מאשרת קבלת הודעות בווטסאפ</span>
                    </label>
                  </div>

                  <div className="transform transition-all duration-300">
                    <label className="block text-gray-700 font-bold mb-2">אמצעי תשלום מועדף</label>
                    <div className="space-y-2">
                      {['ביט', 'פייבוקס', 'מזומן'].map((method) => (
                        <label key={method} className="flex items-center space-x-2 space-x-reverse cursor-pointer hover:scale-105 transition-transform">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            className="w-5 h-5 text-purple-500 border-purple-100 focus:ring-purple-400"
                            checked={formData.paymentMethod === method}
                            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                          />
                          <span className="text-gray-700">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg 
                    hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'שולח...' : 'שליחת טופס הרשמה'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto mb-12 animate-on-scroll opacity-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 text-center">
                <div className="animate-bounce">
                  <div className="w-16 h-16 mx-auto mb-4 text-green-500">✓</div>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">ההרשמה התקבלה בהצלחה!</h3>
                <p className="text-gray-600">ניצור איתך קשר בהקדם עם פרטים נוספים.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Assistant', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Assistant', sans-serif;
          font-weight: 700;
        }
.title-gradient {
          background: linear-gradient(to right, #9333EA, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .animate-on-scroll {
          transform: translateY(20px);
          transition: all 1s cubic-bezier(0.17, 0.55, 0.55, 1);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;