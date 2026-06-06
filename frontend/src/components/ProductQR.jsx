import { QRCodeCanvas } from "qrcode.react";

function ProductQR({ product }) {
  if (!product) return null;

  return (
    <div>
      <h3>Product QR Code</h3>

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
    </div>
  );
}

export default ProductQR;