import { Modal, Box } from "@mui/material";
import { ReactNode } from "react";

interface CenteredModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  backgroundColor?: string;
}

export const CenteredModal: React.FC<CenteredModalProps> = ({
  open,
  onClose,
  children,
  width = 300,
  height = 400,
  maxWidth,
  backgroundColor = "white"
}) => {
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
          backgroundColor,
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
