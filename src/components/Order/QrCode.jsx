import QRCode from "react-qr-code";

function QrCode({ value, title, bgColor }) {
  return (
    <div
      style={{
        height: "50vh",
        margin: "0 auto",
        width: "auto",
      }}>
      <QRCode
        size={256}
        bgColor={bgColor}
        style={{ height: "100%", maxHeight: "100%", width: "auto" }}
        value={`${process.env.REACT_APP_BASE_URL}/order/process/${value}`}
        viewBox={`0 0 256 256`}
        title={`Total Order Amount: €${title}`}
      />
    </div>
  );
}

export default QrCode;
