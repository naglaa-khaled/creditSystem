import { Box, Typography, Avatar, Paper, Grid as Grid } from "@mui/material";
import SharedTable from "../SharedTable/SharedTable";
import CustomButton from "../Button/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { type IDetailsLayoutProps } from "../../Interfaces/index";



const DetailsLayout = <T extends Record<string, unknown>,>({
  title, isAdmin, tableTitle, tableData, tableColumns, onEdit,PageName, children
}: IDetailsLayoutProps<T>) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box
        onClick={() => navigate(-1)}
        sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", mb: 2, color: "text.secondary" }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
        <Typography variant="body2">Back to {PageName}</Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4, borderRadius: "16px", border: "1px solid #eceef1", boxShadow: "none" }}>
        <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
          <Grid>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "#2d3192", fontSize: "1.8rem", fontWeight: "bold" }}>
              {title?.charAt(0).toUpperCase() || "?"}
            </Avatar>
          </Grid>

          <Grid sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1a202c" }}>
                {title || "Loading..."}
              </Typography>
              {isAdmin && (
                <CustomButton label="Edit" icon={<EditIcon />} variantType="primary" onClick={onEdit} />
              )}
            </Box>
            
            <Box>{children}</Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>{tableTitle}</Typography>
      
      <Box sx={{ borderRadius: "12px", border: "1px solid #eceef1", overflow: "hidden" }}>
        <SharedTable
          columns={tableColumns}
          data={tableData}
          idField={tableColumns[0]?.id || "id"}
          isAdmin={false} 
          showView={false}
        />
      </Box>
    </Box>
  );
};

export default DetailsLayout;