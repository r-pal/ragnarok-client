import { Modal, Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface CenteredModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  backgroundColor?: string;
}

export const CenteredModal: React.FC<CenteredModalProps> = ({
  open,
  onClose,
  children,
  width = 300,
  height = 400,
  maxWidth,
  maxHeight,
  backgroundColor
}) => {
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box
        sx={{
          width,
          height,
          maxWidth,
          maxHeight,
          backgroundColor: backgroundColor || theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          outline: "none",
          overflow: "auto"
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
