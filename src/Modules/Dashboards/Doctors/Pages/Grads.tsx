
// import React, { useState } from 'react';

// const initialStudents = [
//   { id: "22-0941", name: "Alexander Sterling", attendance: 5, assignments: 4, quizzes: 2, midterm: 11, practical: 4, oral: 4, final: 18, img: "https://i.pravatar.cc/150?u=1" },
//   { id: "22-1052", name: "Elena Rodriguez", attendance: 3, assignments: 2, quizzes: 1, midterm: 8, practical: 2, oral: 2, final: 12, img: "https://i.pravatar.cc/150?u=2" },
//   { id: "22-1100", name: "Julian Thorne", attendance: 5, assignments: 5, quizzes: 2, midterm: 12, practical: 4, oral: 4, final: 20, img: "https://i.pravatar.cc/150?u=3" },
// ];

// export default function Grads() {
//   const [students, setStudents] = useState(initialStudents);
//   const [showToast, setShowToast] = useState(false);

//   const calculateTotal = (s) => s.attendance + s.assignments + s.quizzes + s.midterm + s.practical + s.oral + s.final;

//   const handleGradeChange = (id, field, value) => {
//     const newValue = parseFloat(value) || 0;
//     setStudents(prev => prev.map(s => (s.id === id ? { ...s, [field]: newValue } : s)));
//   };

//   const totalStudents = students.length;
//   const averageTotal = (students.reduce((acc, s) => acc + calculateTotal(s), 0) / totalStudents).toFixed(2);
//   const passRate = ((students.filter(s => calculateTotal(s) >= 30).length / totalStudents) * 100).toFixed(1);

//   return (
//     <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      
//       {/* Toast */}
//       {showToast && (
//         <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#dcfce7', border: '1px solid #bbf7d0', color: '#166534', padding: '15px 30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100 }}>
//           <b>✓ تم رصد الدرجات بنجاح</b>
//         </div>
//       )}

//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
//         <div>
//           <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', margin: '0 0 5px 0' }}>INSTRUCTIONAL INTERFACE</p>
//           <h1 style={{ color: '#0f172a', fontSize: '32px', margin: 0 }}>Advanced Thermodynamics - Section B</h1>
//         </div>
//         <button onClick={() => { setShowToast(true); setTimeout(() => setShowToast(false), 3000); }} 
//                 style={{ backgroundColor: '#0f172a', color: 'white', padding: '12px 25px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
//           Save Changes
//         </button>
//       </div>

//       {/* Stats Section */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', marginBottom: '40px' }}>
//         <div style={{ gridColumn: 'span 3', backgroundColor: 'white', padding: '30px', borderRadius: '30px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
//            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📝</div>
//            <h3 style={{ margin: '0 0 5px 0' }}>Detailed Ledger</h3>
//            <p style={{ color: '#94a3b8', fontSize: '11px' }}>You are in <b>Edit Mode</b>. Changes are live.</p>
//         </div>

//         <div style={{ gridColumn: 'span 9', backgroundColor: '#0f172a', color: 'white', padding: '40px', borderRadius: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>
//             <p style={{ color: '#64748b', fontSize: '10px', fontWeight: 'bold' }}>CLASS PERFORMANCE INDEX</p>
//             <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
//               <span style={{ fontSize: '14px', color: '#94a3b8' }}>Avg Total</span>
//               <span style={{ fontSize: '60px', fontWeight: 'bold' }}>{averageTotal}</span>
//             </div>
//           </div>
//           <div style={{ display: 'flex', gap: '40px', textAlign: 'right' }}>
//             <div><p style={{ color: '#64748b', fontSize: '10px' }}>PASS RATE</p><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{passRate}%</p></div>
//             <div><p style={{ color: '#64748b', fontSize: '10px' }}>PARTICIPATION</p><p style={{ fontSize: '24px', fontWeight: 'bold' }}>94%</p></div>
//           </div>
//         </div>
//       </div>

//       {/* Table Area */}
//       <div style={{ backgroundColor: 'white', borderRadius: '30px', padding: '30px', border: '1px solid #f1f5f9' }}>
//         {/* Table Head */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', marginBottom: '20px', color: '#94a3b8', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>
//           <div style={{ gridColumn: 'span 1' }}>GRADE</div>
//           <div style={{ gridColumn: 'span 1' }}>TOTAL</div>
//           <div style={{ gridColumn: 'span 1' }}>FINAL</div>
//           <div style={{ gridColumn: 'span 1' }}>ORAL</div>
//           <div style={{ gridColumn: 'span 1' }}>PRAC</div>
//           <div style={{ gridColumn: 'span 1' }}>MID</div>
//           <div style={{ gridColumn: 'span 1' }}>QUIZ</div>
//           <div style={{ gridColumn: 'span 1' }}>ASGN</div>
//           <div style={{ gridColumn: 'span 1' }}>ATT</div>
//           <div style={{ gridColumn: 'span 3', textAlign: 'right' }}>STUDENT DETAILS</div>
//         </div>

//         {/* Student Rows */}
//         {students.map(s => (
//           <div key={s.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', padding: '15px', border: '1px solid #f8fafc', borderRadius: '20px', marginBottom: '10px', alignItems: 'center' }}>
//             <div style={{ gridColumn: 'span 1', textAlign: 'center' }}>
//               <span style={{ backgroundColor: calculateTotal(s) >= 30 ? '#dcfce7' : '#fee2e2', padding: '5px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' }}>
//                 {calculateTotal(s) >= 48 ? 'A+' : calculateTotal(s) >= 30 ? 'C' : 'F'}
//               </span>
//             </div>
//             <div style={{ gridColumn: 'span 1', textAlign: 'center', fontWeight: 'bold' }}>{calculateTotal(s)}</div>
            
//             {['final', 'oral', 'practical', 'midterm', 'quizzes', 'assignments', 'attendance'].map(f => (
//               <div key={f} style={{ gridColumn: 'span 1' }}>
//                 <input type="number" value={s[f]} onChange={(e) => handleGradeChange(s.id, f, e.target.value)}
//                        style={{ width: '100%', border: 'none', backgroundColor: '#f1f5f9', padding: '10px 0', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold' }} />
//               </div>
//             ))}

//             <div style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '15px' }}>
//                <div style={{ textAlign: 'right' }}>
//                   <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{s.name}</p>
//                   <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8' }}>ID: {s.id}</p>
//                </div>
//                <img src={s.img} style={{ width: '40px', height: '40px', borderRadius: '10px', objectCover: 'cover' }} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';

// const initialStudents = [
//   { id: "22-0941", name: "Alexander Sterling", attendance: 5, assignments: 4, quizzes: 2, midterm: 11, practical: 4, oral: 4, final: 18, img: "https://i.pravatar.cc/150?u=1" },
//   { id: "22-1052", name: "Elena Rodriguez", attendance: 3, assignments: 2, quizzes: 1, midterm: 8, practical: 2, oral: 2, final: 12, img: "https://i.pravatar.cc/150?u=2" },
//   { id: "22-1100", name: "Julian Thorne", attendance: 5, assignments: 5, quizzes: 2, midterm: 12, practical: 4, oral: 4, final: 20, img: "https://i.pravatar.cc/150?u=3" },
// ];

// export default function Grads() {
//   const [students, setStudents] = useState(initialStudents);
//   const [showToast, setShowToast] = useState(false);

//   // دالة حساب مجموع درجات الطالب
//   const calculateTotal = (s) => s.attendance + s.assignments + s.quizzes + s.midterm + s.practical + s.oral + s.final;

//   // دالة تحديث الدرجات
//   const handleGradeChange = (id, field, value) => {
//     const newValue = parseFloat(value) || 0;
//     setStudents(prev => prev.map(s => (s.id === id ? { ...s, [field]: newValue } : s)));
//   };

//   // --- الحسابات الديناميكية للمربع الأسود ---
  
//   const totalStudents = students.length;

//   // 1. حساب متوسط المجموع الكلي
//   const averageTotal = (students.reduce((acc, s) => acc + calculateTotal(s), 0) / totalStudents).toFixed(2);

//   // 2. حساب نسبة النجاح (الطلاب اللي مجموعهم >= 30 من 60)
//   const passedCount = students.filter(s => calculateTotal(s) >= 30).length;
//   const dynamicPassRate = ((passedCount / totalStudents) * 100).toFixed(1);

//   // 3. حساب نسبة المشاركة (بناءً على متوسط درجات الحضور - Attendance)
//   // هنفترض إن الحضور من 5 درجات، فهنقسم المتوسط على 5 ونضرب في 100
//   const avgAttendance = students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents;
//   const dynamicParticipation = ((avgAttendance / 5) * 100).toFixed(0);

//   return (
//     <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      
//       {/* Toast */}
//       {showToast && (
//         <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#dcfce7', border: '1px solid #bbf7d0', color: '#166534', padding: '15px 30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100 }}>
//           <b>✓ تم حفظ التغييرات وحساب الإحصائيات</b>
//         </div>
//       )}

//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
//         <div>
//           <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', margin: '0 0 5px 0', letterSpacing: '1px' }}>INSTRUCTIONAL INTERFACE</p>
//           <h1 style={{ color: '#0f172a', fontSize: '32px', fontWeight: '800', margin: 0 }}>Advanced Thermodynamics - Section B</h1>
//         </div>
//         <button onClick={() => { setShowToast(true); setTimeout(() => setShowToast(false), 3000); }} 
//                 style={{ backgroundColor: '#0f172a', color: 'white', padding: '14px 30px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
//           Save Changes
//         </button>
//       </div>

//       {/* Stats Cards Row */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', marginBottom: '40px' }}>
        
//         {/* Left Info Card */}
//         <div style={{ gridColumn: 'span 3', backgroundColor: 'white', padding: '30px', borderRadius: '35px', textAlign: 'center', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//            <div style={{ fontSize: '30px', marginBottom: '15px' }}>📊</div>
//            <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Detailed Ledger</h3>
//            <p style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.5' }}>إحصائيات حية: تتغير الأرقام بمجرد تعديل أي درجة في الجدول.</p>
//         </div>

//         {/* Dynamic Analytics Card (The Black One) */}
//         <div style={{ gridColumn: 'span 9', backgroundColor: '#0f172a', color: 'white', padding: '45px', borderRadius: '45px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 40px rgba(15,23,42,0.2)' }}>
//           <div>
//             <p style={{ color: '#64748b', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '15px' }}>CLASS PERFORMANCE INDEX</p>
//             <div style={{ display: 'flex', alignItems: 'baseline', gap: '25px' }}>
//               <span style={{ fontSize: '16px', color: '#94a3b8' }}>Avg. Score</span>
//               <span style={{ fontSize: '70px', fontWeight: '900', letterSpacing: '-2px' }}>{averageTotal}</span>
//             </div>
//           </div>
          
//           <div style={{ display: 'flex', gap: '50px', textAlign: 'right' }}>
//             <div>
//                 <p style={{ color: '#64748b', fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>PASS RATE</p>
//                 <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{dynamicPassRate}%</p>
//             </div>
//             <div>
//                 <p style={{ color: '#64748b', fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>PARTICIPATION</p>
//                 <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#38bdf8' }}>{dynamicParticipation}%</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Editable Table Area */}
//       <div style={{ backgroundColor: 'white', borderRadius: '35px', padding: '35px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
//         {/* Table Headings */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', marginBottom: '25px', color: '#94a3b8', fontSize: '11px', fontWeight: '900', textAlign: 'center', letterSpacing: '1px' }}>
//           <div style={{ gridColumn: 'span 1' }}>GRADE</div>
//           <div style={{ gridColumn: 'span 1', color: '#0f172a' }}>TOTAL</div>
//           <div style={{ gridColumn: 'span 1' }}>FINAL</div>
//           <div style={{ gridColumn: 'span 1' }}>ORAL</div>
//           <div style={{ gridColumn: 'span 1' }}>PRAC</div>
//           <div style={{ gridColumn: 'span 1' }}>MID</div>
//           <div style={{ gridColumn: 'span 1' }}>QUIZ</div>
//           <div style={{ gridColumn: 'span 1' }}>ASGN</div>
//           <div style={{ gridColumn: 'span 1' }}>ATT</div>
//           <div style={{ gridColumn: 'span 3', textAlign: 'right', paddingRight: '10px' }}>STUDENT DETAILS</div>
//         </div>

//         {/* Dynamic Student Rows */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//           {students.map(s => {
//             const currentTotal = calculateTotal(s);
//             return (
//               <div key={s.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', padding: '18px', backgroundColor: '#fff', border: '1px solid #f8fafc', borderRadius: '22px', alignItems: 'center', transition: '0.3s' }}>
                
//                 {/* Dynamic Grade Badge */}
//                 <div style={{ gridColumn: 'span 1', textAlign: 'center' }}>
//                   <span style={{ 
//                     backgroundColor: currentTotal >= 48 ? '#dcfce7' : currentTotal >= 30 ? '#fef9c3' : '#fee2e2', 
//                     color: currentTotal >= 48 ? '#166534' : currentTotal >= 30 ? '#854d0e' : '#991b1b',
//                     padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' 
//                   }}>
//                     {currentTotal >= 54 ? 'A+' : currentTotal >= 45 ? 'B' : currentTotal >= 30 ? 'C' : 'F'}
//                   </span>
//                 </div>

//                 <div style={{ gridColumn: 'span 1', textAlign: 'center', fontWeight: '900', fontSize: '18px', color: '#0f172a' }}>{currentTotal}</div>
                
//                 {/* Editable Inputs */}
//                 {['final', 'oral', 'practical', 'midterm', 'quizzes', 'assignments', 'attendance'].map(f => (
//                   <div key={f} style={{ gridColumn: 'span 1' }}>
//                     <input 
//                       type="number" 
//                       value={s[f]} 
//                       onChange={(e) => handleGradeChange(s.id, f, e.target.value)}
//                       style={{ width: '100%', border: 'none', backgroundColor: '#f1f5f9', padding: '12px 0', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', color: '#475569', outline: 'none' }} 
//                     />
//                   </div>
//                 ))}

//                 {/* Student Info */}
//                 <div style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '15px' }}>
//                    <div style={{ textAlign: 'right' }}>
//                       <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px', color: '#1e293b' }}>{s.name}</p>
//                       <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: 'bold' }}>ID: {s.id}</p>
//                    </div>
//                    <img src={s.img} style={{ width: '45px', height: '45px', borderRadius: '15px', objectFit: 'cover', border: '2px solid #f1f5f9' }} alt="avatar" />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

const initialStudents = [
  { id: "22-0941", name: "Alexander Sterling", attendance: 5, assignments: 4, quizzes: 2, midterm: 11, practical: 4, oral: 4, final: 18, img: "https://i.pravatar.cc/150?u=1" },
  { id: "22-1052", name: "Elena Rodriguez", attendance: 3, assignments: 2, quizzes: 1, midterm: 8, practical: 2, oral: 2, final: 12, img: "https://i.pravatar.cc/150?u=2" },
  { id: "22-1100", name: "Julian Thorne", attendance: 5, assignments: 5, quizzes: 2, midterm: 12, practical: 4, oral: 4, final: 20, img: "https://i.pravatar.cc/150?u=3" },
];

export default function Grads() {
  const [students, setStudents] = useState(initialStudents);
  const [showToast, setShowToast] = useState(false);

  const mainColor = "#394188"; 

  // Function to calculate total score per student
  const calculateTotal = (s) => s.attendance + s.assignments + s.quizzes + s.midterm + s.practical + s.oral + s.final;

  // Real-time Update Handler
  const handleGradeChange = (id, field, value) => {
    const newValue = parseFloat(value) || 0;
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, [field]: newValue } : s)));
  };

  // --- Professional Dynamic Analytics ---
  const totalStudents = students.length;
  
  // 1. Average Score Calculation
  const averageTotal = (students.reduce((acc, s) => acc + calculateTotal(s), 0) / totalStudents).toFixed(2);

  // 2. Dynamic Pass Rate (Threshold >= 30/60)
  const passedStudents = students.filter(s => calculateTotal(s) >= 30).length;
  const passRate = ((passedStudents / totalStudents) * 100).toFixed(1);

  // 3. Dynamic Participation (Based on Attendance Avg out of 5)
  const avgAttendance = students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents;
  const participationRate = ((avgAttendance / 5) * 100).toFixed(0);

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '40px', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      
      {/* Success Notification */}
      {showToast && (
        <div style={{ position: 'fixed', top: '25px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ecfdf5', border: `1px solid #10b981`, color: '#065f46', padding: '16px 35px', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', zIndex: 999990, fontWeight: 'bold' }}>
          ✓ Data updated and metrics recalculated successfully!
        </div>
      )}

      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '45px' }}>
        <div>
          <p style={{ color: mainColor, fontSize: '11px', fontWeight: '900', letterSpacing: '2px', margin: '0 0 5px 0' }}>ACADEMIC MANAGEMENT SYSTEM</p>
          <h1 style={{ color: '#1e293b', fontSize: '36px', fontWeight: '900', margin: 0 }}>Grading Dashboard</h1>
        </div>
        <button 
          onClick={() => { setShowToast(true); setTimeout(() => setShowToast(false), 3000); }} 
          style={{ backgroundColor: mainColor, color: 'white', padding: '15px 40px', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', boxShadow: `0 10px 20px ${mainColor}44` }}>
          Save Progress
        </button>
      </div>

      {/* Analytics Card Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '25px', marginBottom: '45px' }}>
        
        {/* Helper Info Card */}
        <div style={{ gridColumn: 'span 3', backgroundColor: 'white', padding: '30px', borderRadius: '40px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
           <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
           <h4 style={{ margin: '0 0 5px 0', color: '#334155', fontWeight: '800' }}>Live Sync</h4>
           <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6' }}>Metrics update instantly as you modify student grades in the table below.</p>
        </div>

        {/* The Professional Blue Analytics Card */}
        <div style={{ gridColumn: 'span 9', backgroundColor: mainColor, color: 'white', padding: '50px', borderRadius: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: `0 25px 50px -12px ${mainColor}66` }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: 'bold', letterSpacing: '3px', marginBottom: '15px' }}>CLASS PERFORMANCE INDEX</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>Avg. Score</span>
              <span style={{ fontSize: '80px', fontWeight: '900', letterSpacing: '-4px' }}>{averageTotal}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '60px' }}>
            <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '900', marginBottom: '10px' }}>PASS RATE</p>
                <p style={{ fontSize: '42px', fontWeight: '900', margin: 0 }}>{passRate}<span style={{fontSize: '20px', marginLeft: '4px'}}>%</span></p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '900', marginBottom: '10px' }}>PARTICIPATION</p>
                <p style={{ fontSize: '42px', fontWeight: '900', margin: 0, color: '#60a5fa' }}>{participationRate}<span style={{fontSize: '20px', marginLeft: '4px'}}>%</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grading Table Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
        
        {/* Table Labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '15px', marginBottom: '30px', padding: '0 20px' }}>
          {['Grade', 'Total', 'Final', 'Oral', 'Prac', 'Mid', 'Quiz', 'Asgn', 'Att'].map((label, idx) => (
            <div key={idx} style={{ gridColumn: 'span 1', color: '#94a3b8', fontSize: '10px', fontWeight: '900', textAlign: 'center', letterSpacing: '1px' }}>{label.toUpperCase()}</div>
          ))}
          <div style={{ gridColumn: 'span 3', textAlign: 'right', color: '#94a3b8', fontSize: '10px', fontWeight: '900', paddingRight: '15px' }}>STUDENT IDENTITY</div>
        </div>

        {/* Rows Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {students.map(s => {
            const studentTotal = calculateTotal(s);
            const isPassing = studentTotal >= 30;
            return (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '15px', padding: '20px', backgroundColor: '#fff', border: '1px solid #f8fafc', borderRadius: '25px', alignItems: 'center', transition: 'all 0.3s' }}>
                
                {/* Dynamic Status Badge */}
                <div style={{ gridColumn: 'span 1', textAlign: 'center' }}>
                  <div style={{ 
                    backgroundColor: studentTotal >= 50 ? '#dcfce7' : isPassing ? '#fff9db' : '#fee2e2', 
                    color: studentTotal >= 50 ? '#166534' : isPassing ? '#854d0e' : '#991b1b',
                    padding: '8px 0', borderRadius: '15px', fontSize: '11px', fontWeight: '900' 
                  }}>
                    {studentTotal >= 54 ? 'A+' : studentTotal >= 45 ? 'B' : isPassing ? 'C' : 'F'}
                  </div>
                </div>

                {/* Total Points */}
                <div style={{ gridColumn: 'span 1', textAlign: 'center', fontWeight: '900', fontSize: '20px', color: mainColor }}>{studentTotal}</div>
                
                {/* Editable Inputs */}
                {['final', 'oral', 'practical', 'midterm', 'quizzes', 'assignments', 'attendance'].map(field => (
                  <div key={field} style={{ gridColumn: 'span 1' }}>
                    <input 
                      type="number" 
                      value={s[field]} 
                      onChange={(e) => handleGradeChange(s.id, field, e.target.value)}
                      style={{ width: '100%', border: 'none', backgroundColor: '#f1f5f9', padding: '14px 0', borderRadius: '15px', textAlign: 'center', fontWeight: 'bold', color: '#334155', fontSize: '14px', outline: 'none' }} 
                    />
                  </div>
                ))}

                {/* Student Details */}
                <div style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
                   <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: '800', fontSize: '15px', color: '#1e293b' }}>{s.name}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>ID: {s.id}</p>
                   </div>
                   <img src={s.img} style={{ width: '50px', height: '50px', borderRadius: '18px', objectFit: 'cover', border: '3px solid #f1f5f9' }} alt="student" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}