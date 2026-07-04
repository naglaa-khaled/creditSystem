import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
// تأكدي من تعديل مسار استيراد الدوال حسب مشروعك
import {
  getSystemSettings,
  toggleRegistration,
  updateSystemSettings,
} from "../../../../API/AdminData/REports";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    academicYear: "",
    semester: "",
    isRegistrationOpen: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isToggleLoading, setIsToggleLoading] = useState(false); // حالة تحميل خاصة للزر الجديد
  const [isSubmitted, setIsSubmitted] = useState(false);
  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getSystemSettings();
        setSettings(data);
      } catch (error) {
        toast.error("Failed to load settings");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleToggleRegistration = async () => {
    setIsToggleLoading(true);
    const newStatus = !settings.isRegistrationOpen; // عكس الحالة الحالية

    const res = await toggleRegistration(newStatus);

    if (res.success) {
      setSettings({ ...settings, isRegistrationOpen: newStatus });
      // رسالة ديناميكية
      const message = newStatus
        ? "تم فتح التسجيل بنجاح"
        : "تم غلق التسجيل بنجاح";
      toast.success(message);
    } else {
      toast.error(res.message);
    }
    setIsToggleLoading(false);
  };

const handleSave = async () => {
  setIsSubmitted(true);

  // استخدام القيمة الافتراضية "" لتجنب الـ undefined في أي حالة
  const year = (settings.academicYear || "").trim();
  const sem = (settings.semester || "").trim();

  if (!year || !sem) {
    toast.error("يرجى ملء جميع الحقول المطلوبة");
    return;
  }
    setIsLoading(true);
    try {
      // 2. إرسال البيانات المطلوبة فقط (بدون إضافة كائنات إضافية قد تسبب 400)
      const payload = {
        academicYear: settings.academicYear,
        semester: settings.semester,
        isRegistrationOpen: settings.isRegistrationOpen,
      };

      await updateSystemSettings(payload);
      toast.success("Settings updated successfully!");
    } catch (error) {
      // التحقق من نوع الخطأ
      toast.error("فشل حفظ الإعدادات، يرجى التأكد من صحة البيانات");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
      >
        System Settings
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" p={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={3}>
          <Paper sx={{ p: 4, maxWidth: 600 }}>
            <Stack spacing={3}>
              <TextField
                label="Academic Year"
                fullWidth
                required
                // يظهر الخطأ فقط إذا تم الضغط على الزر والحقل فارغ
                // تعديل الـ error
                error={isSubmitted && !(settings.academicYear || "").trim()}
                // تعديل الـ helperText
                helperText={
                  isSubmitted && !(settings.academicYear || "").trim()
                    ? "هذا الحقل مطلوب"
                    : ""
                }
                value={settings.academicYear}
                onChange={(e) =>
                  setSettings({ ...settings, academicYear: e.target.value })
                }
              />

              <TextField
                label="Semester"
                fullWidth
                required
                // أضيفي (settings.semester || "") هنا
                error={isSubmitted && !(settings.semester || "").trim()}
                helperText={
                  isSubmitted && !(settings.semester || "").trim()
                    ? "هذا الحقل مطلوب"
                    : ""
                }
                value={settings.semester || ""} // تعامل مع الـ undefined كقيمة فارغة
                onChange={(e) =>
                  setSettings({ ...settings, semester: e.target.value })
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.isRegistrationOpen}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        isRegistrationOpen: e.target.checked,
                      })
                    }
                  />
                }
                label="Enable Course Registration"
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleSave}
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          </Paper>

          <Paper
            sx={{
              p: 4,
              maxWidth: 600,
              borderLeft: "6px solid",
              borderColor: settings.isRegistrationOpen
                ? "success.main"
                : "error.main",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Registration Control
            </Typography>

            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              {settings.isRegistrationOpen
                ? "Registration is currently OPEN. Students can enroll in courses."
                : "Registration is currently CLOSED. Students cannot enroll in courses."}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              size="large"
              color={settings.isRegistrationOpen ? "error" : "success"}
              onClick={handleToggleRegistration}
              disabled={isToggleLoading}
            >
              {isToggleLoading
                ? "Processing..."
                : settings.isRegistrationOpen
                  ? "Close Registration"
                  : "Open Registration"}
            </Button>
          </Paper>
        </Stack>
      )}
    </Box>
  );
};

export default SystemSettings;
