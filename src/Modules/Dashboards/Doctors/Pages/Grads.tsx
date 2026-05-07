
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