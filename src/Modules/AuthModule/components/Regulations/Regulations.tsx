import { useState } from "react";
import { useTheme } from "@mui/material";
import { Box, Container, Typography, Paper, Button, Divider, IconButton, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LanguageIcon from "@mui/icons-material/Language";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    title: "Student Regulations",
    subtitle: "Smart Systems Engineering Program",
    
    lastUpdated: "Last Updated: June 2026",
    backBtn: "Back",
    sec1Title: "1. Basic Admission Requirements",
    sec1Points: [
      "High School Certificate: The student must hold the Al-Azhar High School Certificate (Thanaweya Amma), and admission is determined according to the university coordination office distribution.",
      "International Students: Accepted in accordance with the rules and conditions specified by Law No. 103 of 1961 regarding the reorganization of Al-Azhar and its executive regulations.",
      "Medical Examination: The student must pass the medical examination conducted by the university's responsible medical authority to ensure suitability for the nature of the program's studies."
    ],
    sec2Title: "2. Financial Commitment & Fees Policy",
    sec2Points: [
      "Paid Program: The student must be aware that this program is a 'special premium paid program operating under the Credit Hours System'.",
      "Payment of Fees: Course registration is not considered final until the registration fees (if any) are paid. Tuition fees are determined by a decision of the Supreme Council of Al-Azhar based on the university council's proposal."
    ],
    sec3Title: "3. Study System & Language",
    sec3Points: [
      "Language of Instruction: The official language of study in the program is English. The College Board may decide to teach some courses in Arabic based on the request of the supervising department council.",
      "Credit Hours System: Upon entering the program, the student commits to the credit hour system, which requires passing 160 credit hours to obtain a Bachelor's degree.",
      "Regular Attendance: Students are not allowed to enter examinations except after regular attendance in classes and fulfilling the required attendance percentage."
    ],
    sec4Title: "4. Academic Registration Controls",
    sec4Points: [
      "Personal Registration: The student must personally fill out the registration form for the courses they wish to study each semester at the specified times according to the university calendar.",
      "Deadlines: Late registration is not allowed beyond the specified times except for a compelling excuse accepted by the College Board, provided that the delay does not exceed one week from the end of the registration period.",
      "Role of Academic Advisor: The student commits to choosing courses under the guidance of the academic advisor and in light of the minimum and maximum allowed academic workload."
    ],
    sec5Title: "5. Graduation Requirements",
    sec5Points: [
      "To obtain the academic degree, the student must successfully pass all required courses according to the minimum grades and credit hours specified by the system.",
      "The graduation project must strictly stem from the program's specialization (Smart Systems Engineering)."
    ]
  },
  ar: {
    title: "لائحة الطلاب",
    subtitle: "برنامج هندسة النظم الذكية",
    faculty: "كلية الهندسة بنات",
    lastUpdated: "آخر تحديث: يونيو ٢٠٢٦",
    backBtn: "رجوع",
    sec1Title: "١. شروط القبول الأساسية",
    sec1Points: [
      "شهادة الثانوية: يجب أن يكون الطالب حاصلاً على الشهادة الثانوية الأزهرية، ويتم قبوله وفقاً لتوزيع مكتب تنسيق القبول بالجامعة.",
      "الطلاب الوافدون: يتم قبولهم وفقاً للقواعد والشروط التي يحددها القانون رقم ١٠٣ لسنة ١٩٦١ م بشأن تنظيم الأزهر ولائحته التنفيذية.",
      "الكشف الطبي: يُشترط أن يجتاز الطالب الكشف الطبي الذي تجريه الجهة الطبية المسؤولة بالجامعة، للتأكد من ملاءمته لطبيعة الدراسة بالبرنامج."
    ],
    sec2Title: "٢. الالتزام المالي ونظام الرسوم",
    sec2Points: [
      "برنامج بمصروفات: يجب على الطالب أن يعلم أن هذا البرنامج 'برنامج متميز بمصروفات خاصة بنظام الساعات المعتمدة'.",
      "سداد الرسوم: لا يعتبر تسجيل المقررات نهائياً إلا بعد دفع رسوم التسجيل (إن وجدت). كما تُحدد الرسوم الدراسية بقرار من المجلس الأعلى للأزهر بناءً على اقتراح مجلس الجامعة."
    ],
    sec3Title: "٣. نظام الدراسة واللغة",
    sec3Points: [
      "لغة الدراسة: اللغة الرسمية للدراسة في البرنامج هي اللغة الإنجليزية، ويجوز لمجلس الكلية أن يقرر تدريس بعض المقررات باللغة العربية بناءً على طلب مجلس القسم المشرف.",
      "نظام الساعات المعتمدة: بمجرد دخول البرنامج، يلتزم الطالب بنظام الساعات المعتمدة الذي يتطلب اجتياز ١٦٠ ساعة معتمدة للحصول على درجة البكالوريوس.",
      "الانتظام في الدراسة: لا يُسمح للطالب بدخول الامتحانات إلا بعد الانتظام في الدراسة واستيفاء نسبة الحضور المطلوبة."
    ],
    sec4Title: "٤. ضوابط التسجيل الأكاديمي",
    sec4Points: [
      "التسجيل الشخصي: يلتزم الطالب بأن يقوم شخصياً بملء نموذج تسجيل المقررات التي يرغب في دراستها في كل فصل دراسي في الأوقات المحددة حسب التقويم الجامعي.",
      "المواعيد النهائية: لا يُسمح بالتسجيل المتأخر عن الأوقات المحددة إلا بعذر قهري يقبله مجلس الكلية، وبشرط ألا يزيد التأخير عن أسبوع واحد من نهاية فترة التسجيل.",
      "دور المرشد الأكاديمي: يلتزم الطالب باختيار مقرراته بتوجيه من المرشد الأكاديمي وفي ضوء الحدود الدنيا والقصوى للعبء الدراسي المسموح به."
    ],
    sec5Title: "٥. شروط التخرج",
    sec5Points: [
      "يجب على الطالب لكي يحصل على الدرجة العلمية اجتياز كافة المقررات المطلوبة بنجاح طبقاً للحد الأدنى من الدرجات والساعات المعتمدة التي يحددها النظام.",
      "يُشترط أن يكون مشروع التخرج نابعاً من تخصص البرنامج (هندسة النظم الذكية)."
    ]
  }
};

export default function Regulations() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [lang, setLang] = useState<"en" | "ar">("en"); 

  const t = translations[lang];
  const isRtl = lang === "ar";

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, sm: 6 }, 
        px: { xs: 1, sm: 0 },
backgroundColor: theme.palette.background.default,
        direction: isRtl ? "rtl" : "ltr",
      }}
    >
      <Container maxWidth="md">
        
       
        <Box sx={{ display: "flex", justifyContent: isRtl ? "flex-start" : "flex-end", mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<LanguageIcon />}
            onClick={toggleLanguage}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: "bold",
              fontSize: { xs: "0.85rem", sm: "1rem" }, 
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {lang === "en" ? "العربية" : "English"}
          </Button>
        </Box>

        <Paper
          elevation={4}
          sx={{
            p: { xs: 2.5, sm: 5 }, 
            borderRadius: { xs: 3, sm: 4 },
           background: theme.palette.background.paper, // استخدام لون الورقة من الثيم
            borderTop: `6px solid ${theme.palette.primary.main}`, 
          }}
        >
      
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, 
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "flex-start" },
              mb: 4,
              gap: 2,
            }}
          >
            <Box>
              <Typography 
                variant="h4" 
                fontWeight="800" 
                sx={{ 
                  color: theme.palette.primary.main, 
                  mb: 0.5,
                  fontSize: { xs: "1.75rem", sm: "2.125rem" } 
                }}
              >
                {t.title}
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="600" 
                sx={{ 
                  color: theme.palette.info.main, 
                  mb: 0.5,
                  fontSize: { xs: "1rem", sm: "1.25rem" }
                }}
              >
                {t.subtitle}
              </Typography>
       
            </Box>

            <Typography 
              variant="caption" 
              sx={{ 
                backgroundColor: theme.palette.secondary.light, 
                px: 1.5, 
                py: 0.5, 
                borderRadius: 1.5, 
                fontWeight: 600, 
                color: theme.palette.text.secondary,
                alignSelf: { xs: "flex-start", sm: "auto" }   
              }}
            >
              {t.lastUpdated}
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

       
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            
          <Grid size={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <IconButton sx={{ backgroundColor: theme.palette.info.light, color: theme.palette.info.main }} disableRipple>
                  <MenuBookIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary, fontSize: { xs: "1.05rem", sm: "1.25rem" } }}>
                  {t.sec1Title}
                </Typography>
              </Box>
              <Box component="ul" sx={{ pr: isRtl ? 2 : 0, pl: !isRtl ? 2 : 0, m: 0, "& li": { mb: 1, color: theme.palette.text.secondary, lineHeight: 1.6, fontSize: { xs: "0.9rem", sm: "1rem" } } }}>
                {t.sec1Points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </Box>
            </Grid>

       
           <Grid size={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <IconButton sx={{ backgroundColor: theme.palette.warning.light, color: theme.palette.warning.dark }} disableRipple>
                  <AccountBalanceWalletIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary, fontSize: { xs: "1.05rem", sm: "1.25rem" } }}>
                  {t.sec2Title}
                </Typography>
              </Box>
              <Box component="ul" sx={{ pr: isRtl ? 2 : 0, pl: !isRtl ? 2 : 0, m: 0, "& li": { mb: 1, color: theme.palette.text.secondary, lineHeight: 1.6, fontSize: { xs: "0.9rem", sm: "1rem" } } }}>
                {t.sec2Points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </Box>
            </Grid>

        
   <Grid size={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <IconButton sx={{ backgroundColor: theme.palette.info.light, color: theme.palette.info.main }} disableRipple>
                  <SchoolIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary, fontSize: { xs: "1.05rem", sm: "1.25rem" } }}>
                  {t.sec3Title}
                </Typography>
              </Box>
              <Box component="ul" sx={{ pr: isRtl ? 2 : 0, pl: !isRtl ? 2 : 0, m: 0, "& li": { mb: 1, color: theme.palette.text.secondary, lineHeight: 1.6, fontSize: { xs: "0.9rem", sm: "1rem" } } }}>
                {t.sec3Points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </Box>
            </Grid>

     <Grid size={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <IconButton sx={{ backgroundColor: theme.palette.success.light, color: theme.palette.success.main }} disableRipple>
                  <AssignmentTurnedInIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary, fontSize: { xs: "1.05rem", sm: "1.25rem" } }}>
                  {t.sec4Title}
                </Typography>
              </Box>
              <Box component="ul" sx={{ pr: isRtl ? 2 : 0, pl: !isRtl ? 2 : 0, m: 0, "& li": { mb: 1, color: theme.palette.text.secondary, lineHeight: 1.6, fontSize: { xs: "0.9rem", sm: "1rem" } } }}>
                {t.sec4Points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </Box>
            </Grid>

          
            <Grid size={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <IconButton sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.main}} disableRipple>
                  <EmojiEventsIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary, fontSize: { xs: "1.05rem", sm: "1.25rem" } }}>
                  {t.sec5Title}
                </Typography>
              </Box>
              <Box component="ul" sx={{ pr: isRtl ? 2 : 0, pl: !isRtl ? 2 : 0, m: 0, "& li": { mb: 1, color: theme.palette.text.secondary, lineHeight: 1.6, fontSize: { xs: "0.9rem", sm: "1rem" } } }}>
                {t.sec5Points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </Box>
            </Grid>

          </Grid>

          {/* زر العودة السفلي المتجاوب مع مرونة العرض الكامل في الشاشات الصغيرة جداً */}
          <Box mt={5} sx={{ display: "flex", justifyContent: isRtl ? "flex-start" : "flex-end" }}>
            <Button
              variant="contained"
              startIcon={!isRtl ? <ArrowBackIcon /> : null}
              endIcon={isRtl ? <ArrowBackIcon sx={{ transform: "rotate(180deg)" }} /> : null}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.2,
                width: { xs: "100%", sm: "auto" }, // يأخذ عرض الشاشة كاملاً على الموبايل لسهولة الضغط
                backgroundColor: theme.palette.primary.main,
                fontWeight: "bold",
                boxShadow: "0 4px 6px -1px rgba(30, 58, 138, 0.3)",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {t.backBtn}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}