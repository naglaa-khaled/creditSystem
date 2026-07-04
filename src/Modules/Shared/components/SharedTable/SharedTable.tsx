/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,

  useTheme,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useNavigate } from "react-router-dom";
import { type Column } from "../../Interfaces";
import CustomButton from "../Button/Button";

interface SharedTableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  isAdmin?: boolean;
  showView?: boolean;
  detailsPath?: string;
  idField: keyof T;
  onDelete?: (id: string | number) => void;
  onEdit?: (item: T) => void;
  onEditStatus?: (item: T) => void;
}

const SharedTable = <T extends Record<string, any>>({
  columns,
  data,
  isAdmin,
  showView = true,
  detailsPath,
  idField,
  onDelete,
  onEdit,
  onEditStatus,
}: SharedTableProps<T>) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const shouldShowActions =
    isAdmin || showView || onEdit || !!onEditStatus || !!onDelete;
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
        overflow: "auto",
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align || "left"}
                sx={{
                  backgroundColor: theme.palette.grey[50],
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  borderBottom: `2px solid ${theme.palette.divider}`,
                  py: 2,
                }}
              >
                {column.label}
              </TableCell>
            ))}

            {shouldShowActions && (
              <TableCell
                align="center"
                sx={{
                  backgroundColor: theme.palette.grey[50],
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  borderBottom: `2px solid ${theme.palette.divider}`,
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow
                key={String(row[idField])}
                hover
                sx={{
                  transition: "0.2s",

                  "&:nth-of-type(even)": {
                    backgroundColor: theme.palette.action.hover,
                  },

                  "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                  },

                  "& td": {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    align={column.align || "left"}
                    sx={{
                      py: 2.2,
                      color: theme.palette.text.primary,
                      fontSize: "0.95rem",
                    }}
                  >
                    {column.render
                      ? column.render(row)
                      : (row[column.id] as any)}
                  </TableCell>
                ))}

                {shouldShowActions && (
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      {showView && (
                        <CustomButton
                          label="View"
                          variantType="primary"
                          icon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />}
                          onClick={() => detailsPath && navigate(`${detailsPath}/${String(row[idField])}`)}
                        />
                      )}
                      {onEdit && (
                        <CustomButton
                          label="Edit"
                          variantType="primary"
                          sx={{ backgroundColor: "success.main", "&:hover": { backgroundColor: "success.dark" } }}
                          icon={<EditIcon sx={{ fontSize: 16 }} />}
                          onClick={() => onEdit(row)}
                        />
                      )}
                      {onEditStatus && (
                        <CustomButton
                          label="Status"
                          variantType="secondary" // أضف تنسيقاً لهذا النوع في CustomButton إذا أردت
                          icon={<EditIcon sx={{ fontSize: 16 }} />}
                          onClick={() => onEditStatus(row)}
                        />
                      )}

                      {isAdmin && (
                        <CustomButton
                          label="Delete"
                          variantType="error"
                          icon={<DeleteOutlineIcon sx={{ fontSize: 16 }} />}
                          onClick={() => {
                            const id = row[idField];
                            if (typeof id === "string" || typeof id === "number") onDelete?.(id);
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (shouldShowActions ? 1 : 0)}
                align="center"
                sx={{
                  py: 8,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.disabled,
                    fontWeight: 500,
                  }}
                >
                  No data available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SharedTable;
