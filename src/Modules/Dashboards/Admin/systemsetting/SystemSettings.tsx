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
import { getSystemSettings, updateSystemSettings } from "../../../../API/AdminData/REports"; 

const SystemSettings = () => {
  const [settings, setSettings] = useState({ academicYear: "", semester: "", isRegistrationOpen: false });
  const [isLoading, setIsLoading] = useState(false);

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
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        System Settings
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" p={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 4, maxWidth: 600 }}>
          <Stack spacing={3}>
            <TextField
              label="Academic Year"
              fullWidth
              value={settings.academicYear}
              onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
            />
            
            <TextField
              label="Semester"
              fullWidth
              value={settings.semester}
              onChange={(e) => setSettings({ ...settings, semester: e.target.value })}
            />

            <FormControlLabel
              control={
                <Switch 
                  checked={settings.isRegistrationOpen} 
                  onChange={(e) => setSettings({ ...settings, isRegistrationOpen: e.target.checked })}
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
      )}
    </Box>
  );
};

export default SystemSettings;