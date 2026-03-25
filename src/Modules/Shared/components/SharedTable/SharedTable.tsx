/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Button/Button";
import { type Column } from "../../Interfaces";



interface SharedTableProps<T extends Record<string, any>> {
  columns: Column<T>[]; 
  data: T[];
  isAdmin?: boolean;
  showView?: boolean;
  detailsPath?: string;
  idField: keyof T;
  onDelete?: (id: string | number) => void;
}

const SharedTable = <T extends Record<string, any>>({
  columns,
  data,
  isAdmin,
  showView = true,
  detailsPath,
  idField,
  onDelete,
}: SharedTableProps<T>) => {
  const navigate = useNavigate();
  const shouldShowActions = isAdmin || showView;

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#f9fafb" }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                sx={{ fontWeight: "bold", color: "#4b5563" }}
              >
                {column.label}
              </TableCell>
            ))}
            {shouldShowActions && (
              <TableCell sx={{ fontWeight: "bold", color: "#4b5563" }}>
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((row) => (
            <TableRow key={String(row[idField])} hover>
              {columns.map((column) => (
                <TableCell key={String(column.id)} sx={{ color: "#374151" }}>
                  {row[column.id] as any}
                </TableCell>
              ))}

              {shouldShowActions && (
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    
                    {showView && (
                      <CustomButton
                        label="View"
                        icon={
                          <VisibilityIcon
                            sx={{ fontSize: "18px !important" }}
                          />
                        }
                        onClick={() => {
                          if (detailsPath) {
                            navigate(
                              `${detailsPath}/${String(row[idField])}`
                            );
                          }
                        }}
                        variantType="primary"
                      />
                    )}

                    {isAdmin && (
                      <CustomButton
                        label="Delete"
                        icon={
                          <DeleteOutlineIcon
                            sx={{ fontSize: "18px !important" }}
                          />
                        }
                        variantType="outline-error"
                        onClick={() => {
                          const id = row[idField];
                          if (
                            typeof id === "string" ||
                            typeof id === "number"
                          ) {
                            onDelete?.(id);
                          }
                        }}
                      />
                    )}

                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SharedTable;