import { Box, Typography } from "@mui/material";
import CustomButton from "../Button/Button"; 
import { type ISchedule } from "../../Interfaces/index"; 

interface WeeklyTimetableProps {
  title: string;
  data: ISchedule[];
  onDelete: (id: string | number) => void;
  onClose: () => void;
}

const WeeklyTimetable = ({ title, data, onDelete, onClose }: WeeklyTimetableProps) => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        bgcolor: "#fefefe",
        borderRadius: "24px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        border: "1px solid #f0f0f0",
        animation: "fadeIn 0.4s ease-out",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "var(--primary)" }}>
          {title}
        </Typography>
        <CustomButton label="Close" variantType="secondary" onClick={onClose} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(auto-fill, minmax(310px, 1fr))",
          },
          gap: 3,
        }}
      >
        {data.map((lecture) => (
          <Box
            key={lecture.id} 
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2.5,
              bgcolor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              border: "1px solid #eee",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.07)",
                borderColor: "var(--primary)",
              },
            }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box sx={{ bgcolor: "rgba(0,102,204,0.08)", p: "6px 12px", borderRadius: "8px" }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "var(--primary)" }}>
                    {lecture.courseID || "N/A"}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ bgcolor: "#e3f2fd", p: "6px 12px", borderRadius: "20px", fontWeight: "600", color: "#0d47a1" }}>
                  📅 {lecture.day || "Not Set"}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: "700", mb: 2, color: "#222", minHeight: "45px", lineHeight: 1.4 }}>
                {lecture.courseName}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, borderTop: "1px dashed #eee", pt: 2, mb: 3 }}>
                <Typography variant="body2" sx={{ color: "#444", display: "flex", alignItems: "center", gap: 1 }}>
                  👤 <strong>Dr:</strong> {lecture.instructorName || "Not Assigned"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", display: "flex", alignItems: "center", gap: 1 }}>
                  🕒 <strong>Time:</strong> {lecture.startTime && lecture.startTime !== "-" ? lecture.startTime.slice(0, 5) : "00:00"} - {lecture.endTime && lecture.endTime !== "-" ? lecture.endTime.slice(0, 5) : "00:00"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", display: "flex", alignItems: "center", gap: 1 }}>
                  📍 <strong>Room:</strong> {lecture.room || "TBD"}
                </Typography>
                <Typography variant="body2" sx={{ color: "var(--primary)", fontWeight: "600", display: "flex", alignItems: "center", gap: 1 }}>
                  👥 <strong>Capacity:</strong> {lecture.capacity || 0}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: "auto", pt: 1 }}>
              <CustomButton
                label="Delete Schedule"
                variantType="secondary"
                onClick={() => onDelete(lecture.id)} 
                style={{ color: "#d32f2f", borderColor: "#d32f2f", width: "100%" }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WeeklyTimetable;