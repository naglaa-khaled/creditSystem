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
  Stack 
} from "@mui/material";
import { toast } from "react-toastify";
// تأكدي من تعديل مسار استيراد الدوال حسب مشروعك
import { getSystemSettings, toggleRegistration, updateSystemSettings } from "../../../../API/AdminData/REports"; 

const SystemSettings = () => {
  const [settings, setSettings] = useState({ academicYear: "", semester: "", isRegistrationOpen: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isToggleLoading, setIsToggleLoading] = useState(false); // حالة تحميل خاصة للزر الجديد

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
      const message = newStatus ? "تم فتح التسجيل بنجاح" : "تم غلق التسجيل بنجاح";
      toast.success(message);
    } else {
      toast.error(res.message);
    }
    setIsToggleLoading(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateSystemSettings(settings);
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Error saving settings");
      console.log(error);
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
              value={settings.academicYear}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  academicYear: e.target.value,
                })
              }
            />

            <TextField
              label="Semester"
              fullWidth
              value={settings.semester}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  semester: e.target.value,
                })
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
            >
              Save Changes
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

          <Typography
            variant="body2"
            sx={{ mb: 3, color: "text.secondary" }}
          >
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