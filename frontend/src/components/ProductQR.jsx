import { QRCodeCanvas } from "qrcode.react";

function ProductQR({ product }) {
  if (!product) {
    return <h3>Select a product to generate QR Code</h3>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Product QR Code</h2>

      <QRCodeCanvas
        value={JSON.stringify({
          productId: product.productId,
          name: product.name,
          category: product.category,
          quantity: product.quantity,
          shelf: product.shelf,
        })}
        size={200}
      />

      <p><b>Name:</b> {product.name}</p>
      <p><b>Shelf:</b> {product.shelf}</p>
    </div>
  );
}

export default ProductQR;