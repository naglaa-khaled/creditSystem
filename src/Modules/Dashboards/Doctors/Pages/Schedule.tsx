import React, { useState } from 'react';
// شلنا أيقونة الزائد والمسح وأضفنا أيقونة السهم للدلالة على الانتقال
import { Clock, BookOpen, Users, Target, ChevronRight, Printer } from 'lucide-react';

export default function Schedule() {
  // 1. البيانات ثابتة للعرض فقط (تُجلب عادة من الـ API)
  const [scheduleData] = useState([
    { id: 1, day: "Monday", date: "MAY 09", courseNameAr: "برمجة كائنية", courseNameEn: "Object-Oriented Programming", courseCode: "CS201", startTime: "09:00", endTime: "11:00", room: "Lab 1", currentStudents: 40, capacity: 50 },
    { id: 2, day: "Wednesday", date: "MAY 11", courseNameAr: "نظم معلومات", courseCode: "IS301", startTime: "11:00", endTime: "13:00", room: "Hall A", currentStudents: 12, capacity: 30 }
  ]);

  // 2. وظيفة الانتقال لصفحة التفاصيل
  const goToCourseDetails = (courseId) => {
    console.log("Navigating to course:", courseId);
    // هنا تقدري تستخدمي الـ Router بتاعك زي:
    // navigate(`/course-details/${courseId}`);
    alert(`سيتم الانتقال لصفحة رصد درجات المادة رقم: ${courseId}`);
  };

  // 3. حساب الساعات للعرض فقط
  const calculateTotalHours = () => {
    let totalMinutes = 0;
    scheduleData.forEach(item => {
      const [startH, startM] = item.startTime.split(':').map(Number);
      const [endH, endM] = item.endTime.split(':').map(Number);
      totalMinutes += (endH * 60 + endM) - (startH * 60 + startM);
    });
    return `${Math.floor(totalMinutes / 60).toString().padStart(2, '0')}:${(totalMinutes % 60).toString().padStart(2, '0')}`;
  };

  const mainColor = "#394188";

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header - تم حذف زر الإضافة */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>ACADEMIC YEAR 2024</span>
          <h1 style={{ fontSize: '28px', color: '#1e293b', margin: '5px 0', fontWeight: '800' }}>Instructor Schedule</h1>
        </div>
        <div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
            <Printer size={18} /> Print Schedule
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9', color: '#94a3b8', fontSize: '11px', textAlign: 'left' }}>
              <th style={{ padding: '20px' }}>DATE & TIME</th>
              <th style={{ padding: '20px' }}>COURSE</th>
              <th style={{ padding: '20px' }}>LOCATION</th>
              <th style={{ padding: '20px' }}>CAPACITY</th>
              <th style={{ padding: '20px', textAlign: 'right' }}>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                <td style={{ padding: '20px' }}>
                  <div style={{ fontWeight: '800', color: '#1e293b' }}>{item.day}, {item.date}</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>{item.startTime} - {item.endTime}</div>
                </td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: '800', color: '#1e293b' }}>{item.courseNameAr}</span>
                    <span style={{ fontSize: '10px', backgroundColor: '#e0e7ff', padding: '2px 6px', borderRadius: '4px', color: mainColor }}>{item.courseCode}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.courseNameEn}</div>
                </td>
                <td style={{ padding: '20px', color: '#475569' }}>{item.room}</td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '60px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '10px' }}>
                      <div style={{ width: `${(item.currentStudents / item.capacity) * 100}%`, height: '100%', backgroundColor: mainColor, borderRadius: '10px' }}></div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>{item.currentStudents}/{item.capacity}</span>
                  </div>
                </td>
                <td style={{ padding: '20px', textAlign: 'right' }}>
                  {/* زرار الانتقال للصفحة الأخرى */}
                  <button 
                    onClick={() => goToCourseDetails(item.id)} 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '5px', 
                      color: mainColor, 
                      cursor: 'pointer', 
                      border: `1px solid ${mainColor}`, 
                      background: 'none',
                      padding: '8px 15px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      transition: '0.3s'
                    }}
                    onMouseOver={(e) => {e.currentTarget.style.backgroundColor = mainColor; e.currentTarget.style.color = 'white'}}
                    onMouseOut={(e) => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = mainColor}}
                  >
                    Manage <ChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
        <MetricCard label="WEEKLY HOURS" value={calculateTotalHours()} badge="Total" icon={<Clock size={18} color={mainColor}/>} />
        <MetricCard label="COURSE LOAD" value={scheduleData.length.toString().padStart(2, '0')} badge="Assigned" icon={<BookOpen size={18} color={mainColor}/>} />
        <MetricCard label="STUDENTS" value={scheduleData.reduce((a, b) => a + b.currentStudents, 0)} badge="Active" icon={<Users size={18} color={mainColor}/>} />
        <MetricCard label="ATTENDANCE" value="95%" badge="Target" icon={<Target size={18} color={mainColor}/>} />
      </div>
    </div>
  );
}

function MetricCard({ label, value, badge, icon }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '900', letterSpacing: '1px' }}>{label}</p>
        {icon}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b' }}>{value}</span>
        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>{badge}</span>
      </div>
    </div>
  );
}