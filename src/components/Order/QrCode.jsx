import QRCode from "react-qr-code";
import { Box } from "@mui/material";

function QrCode({ value, title, bgColor }) {
  return (
    <Box
      p={1}
      sx={{
        backgroundColor: "#ffffff",
        width: "192px",
      }}>
      <QRCode
        size={192}
        bgColor='#ffffff'
        style={{ height: "100%", maxHeight: "100%", width: "auto" }}
        value={`${process.env.REACT_APP_BASE_URL}/order/process/${value}`}
        title={`Total Order Amount: €${title}`}
        level='H'
      />
    </Box>
  );
}

export default QrCode;
