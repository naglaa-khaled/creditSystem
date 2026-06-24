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
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useNavigate } from "react-router-dom";
import { type Column } from "../../Interfaces";

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
        overflowX: "auto",
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
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() => {
                              if (detailsPath) {
                                navigate(
                                  `${detailsPath}/${String(row[idField])}`,
                                );
                              }
                            }}
                            sx={{
                              backgroundColor: theme.palette.primary.light,
                              "&:hover": {
                                "&:hover": {
                                  backgroundColor: theme.palette.primary.main,
                                  color: "#fff",
                                },
                              },
                            }}
                          >
                            <OpenInNewRoundedIcon
                              sx={{
                                color: theme.palette.primary.main,
                                fontSize: 20,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onEdit && (
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => onEdit(row)} // هنا نقوم بتمرير الصف عند الضغط
                            sx={{
                              backgroundColor: theme.palette.success.light,
                              "&:hover": {
                                backgroundColor: theme.palette.success.main,
                                color: "#fff",
                              },
                            }}
                          >
                            <EditIcon
                              sx={{
                                color: theme.palette.success.main,
                                fontSize: 20,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onEditStatus && (
                        <Tooltip title="Update Status">
                          <IconButton onClick={() => onEditStatus(row)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      {isAdmin && (
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              const id = row[idField];

                              if (
                                typeof id === "string" ||
                                typeof id === "number"
                              ) {
                                onDelete?.(id);
                              }
                            }}
                            sx={{
                              backgroundColor: theme.palette.error.light,
                              "&:hover": {
                                "&:hover": {
                                  backgroundColor: theme.palette.error.main,
                                  color: "#fff",
                                },
                              },
                            }}
                          >
                            <DeleteOutlineIcon
                              sx={{
                                color: theme.palette.error.main,
                                fontSize: 20,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
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
