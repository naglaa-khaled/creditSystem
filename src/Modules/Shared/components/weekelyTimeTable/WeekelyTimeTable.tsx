import { Box, Typography, useTheme } from "@mui/material";
import CustomButton from "../Button/Button";
import { type ISchedule } from "../../Interfaces/index";

interface WeeklyTimetableProps {
  title: string;
  data: ISchedule[];
  onClose: () => void;
  onDelete?: (id: string | number) => void;
  onEdit?: (lecture: ISchedule) => void;
}

const WeeklyTimetable = ({
  title,
  data,
  onDelete,
  onClose,
  onEdit,
}: WeeklyTimetableProps) => {
  const showActions = !!onEdit || !!onDelete;
  const theme = useTheme(); 

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        bgcolor: "background.paper",
        borderRadius: "24px",
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        animation: "fadeIn 0.4s ease-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
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
              bgcolor: "background.default",
              borderRadius: "16px",
              boxShadow: theme.shadows[4],
              border: `1px solid ${theme.palette.divider}`,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[4],
                borderColor: "var(--primary)",
              },
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: theme.palette.action.hover,
                    p: "6px 12px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    {lecture.courseID || "N/A"}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: "primary.light",
                    p: "6px 12px",
                    borderRadius: "20px",
                    fontWeight: "600",
                    color: "primary.contrastText",
                  }}
                >
                  📅 {lecture.day || "Not Set"}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "700",
                  mb: 2,
                  color: "text.primary",
                  minHeight: "45px",
                  lineHeight: 1.4,
                }}
              >
                {lecture.courseName}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  borderTop: `1px dashed ${theme.palette.divider}`,
                  pt: 2,
                  mb: showActions ? 3 : 0,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  👤 <strong>Dr:</strong>{" "}
                  {lecture.instructorName || "Not Assigned"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  🕒 <strong>Time:</strong>{" "}
                  {lecture.startTime && lecture.startTime !== "-"
                    ? lecture.startTime.slice(0, 5)
                    : "00:00"}{" "}
                  -{" "}
                  {lecture.endTime && lecture.endTime !== "-"
                    ? lecture.endTime.slice(0, 5)
                    : "00:00"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  📍 <strong>Room:</strong> {lecture.room || "TBD"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:"primary.main",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  👥 <strong>Capacity:</strong> {lecture.capacity || 0}
                </Typography>
              </Box>
            </Box>

            {showActions && (
              <Box
                sx={{
                  mt: "auto",
                  pt: 1,
                  display: "flex",
                  gap: 1.5,
                  width: "100%",
                }}
              >
                {onEdit && (
                  <CustomButton
                    label="Edit"
                    variantType="primary"
                    onClick={() => onEdit(lecture)}
                    style={{ flex: 1 }}
                  />
                )}

                {onDelete && (
                  <CustomButton
                    label="Delete"
                    variantType="outline-error"
                    onClick={() => onDelete(lecture.id)}
                    style={{ flex: 1 }}
                  />
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WeeklyTimetable;
