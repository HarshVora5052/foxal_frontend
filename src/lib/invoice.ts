import { Order } from '@/store/useOrderStore';

export function numberToWords(amount: number): string {
  const units = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  function convert(n: number): string {
    if (n < 20) return units[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
    if (n < 1000) return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convert(n % 100) : '');
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convert(n % 1000) : '');
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + convert(n % 100000) : '');
    return n.toString();
  }

  const rounded = Math.round(amount);
  if (rounded === 0) return 'Zero Rupees Only';
  return convert(rounded) + ' Rupees Only';
}

export function generateInvoiceHtml(order: Order, origin: string = ''): string {
  const invoiceNo = `INV-${order.id.replace(/^FXL-/, '')}`;
  const totalInWords = numberToWords(order.total);
  
  // Tax computation (GST 5% included in MRP for agarbatti)
  const gstRate = 0.05;
  const taxableSubtotal = Math.round((order.subtotal / (1 + gstRate)) * 100) / 100;
  const totalGst = Math.round((order.subtotal - taxableSubtotal) * 100) / 100;
  const cgst = (totalGst / 2).toFixed(2);
  const sgst = (totalGst / 2).toFixed(2);

  const itemsRows = order.items
    .map((item, index) => {
      const lineTotal = item.product.price * item.quantity;
      return `
        <tr>
          <td style="padding: 10px 12px; text-align: center; border-bottom: 1px solid #E3D4BD; font-size: 12px; color: #7A5230;">
            ${index + 1}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E3D4BD;">
            <div style="font-weight: 700; color: #0F0D0B; font-size: 13px;">
              ${item.product.name}
            </div>
            <div style="font-size: 11px; color: #7A5230; margin-top: 2px;">
              Variant: ${item.product.variant_label || 'Standard Pack'} · 100% Charcoal-Free
            </div>
          </td>
          <td style="padding: 10px 12px; text-align: center; border-bottom: 1px solid #E3D4BD; font-size: 12px; color: #0F0D0B; font-family: monospace;">
            33074100
          </td>
          <td style="padding: 10px 12px; text-align: right; border-bottom: 1px solid #E3D4BD; font-size: 12px; color: #0F0D0B; font-weight: 600;">
            ₹${item.product.price.toFixed(2)}
          </td>
          <td style="padding: 10px 12px; text-align: center; border-bottom: 1px solid #E3D4BD; font-size: 13px; color: #0F0D0B; font-weight: 700;">
            ${item.quantity}
          </td>
          <td style="padding: 10px 12px; text-align: right; border-bottom: 1px solid #E3D4BD; font-size: 13px; color: #0F0D0B; font-weight: 700;">
            ₹${lineTotal.toFixed(2)}
          </td>
        </tr>
      `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tax Invoice - ${order.id} | FOXAL</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0F0D0B;
      background-color: #FAF7F2;
      padding: 24px;
      font-size: 13px;
      line-height: 1.5;
    }
    .invoice-card {
      max-width: 820px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E3D4BD;
      border-radius: 16px;
      padding: 36px 40px;
      box-shadow: 0 4px 20px rgba(15, 13, 11, 0.06);
    }
    .no-print-bar {
      max-width: 820px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 18px;
      background: #0F0D0B;
      color: #FFFFFF;
      border-radius: 12px;
    }
    .btn {
      cursor: pointer;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-gold {
      background: #C8922A;
      color: #FFFFFF;
    }
    .btn-gold:hover {
      background: #B68023;
    }
    .btn-secondary {
      background: #272320;
      color: #E3D4BD;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 2px solid #0F0D0B;
    }
    .meta-box {
      background: #FAF7F2;
      border: 1px solid #E3D4BD;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 24px;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .items-table th {
      background: #0F0D0B;
      color: #FFFFFF;
      padding: 10px 12px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 700;
    }
    .summary-table {
      width: 340px;
      margin-left: auto;
      border-collapse: collapse;
    }
    .summary-table td {
      padding: 6px 12px;
      font-size: 12px;
    }
    .grand-total-row {
      background: #F6EFE4;
      border-top: 2px solid #C8922A;
      border-bottom: 2px solid #C8922A;
    }
    .grand-total-row td {
      padding: 10px 12px;
      font-size: 15px;
      font-weight: 800;
      color: #0F0D0B;
    }
    .watermark {
      color: #C8922A;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    @media print {
      body {
        background: #FFFFFF;
        padding: 0;
      }
      .no-print-bar {
        display: none !important;
      }
      .invoice-card {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      @page {
        size: A4;
        margin: 12mm 15mm;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div style="font-size: 13px;">
      Tax Invoice Ready · <strong>${order.id}</strong>
    </div>
    <div style="display: flex; gap: 10px;">
      <button class="btn btn-gold" onclick="window.print()">
        🖨️ Print / Save as PDF
      </button>
      <button class="btn btn-secondary" onclick="window.close()">
        ✕ Close
      </button>
    </div>
  </div>

  <div class="invoice-card">
    <!-- Header: Company & Invoice Info -->
    <table class="header-table">
      <tr>
        <td style="vertical-align: top; width: 55%;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <img src="${origin}/logo.png" alt="FOXAL Logo" style="height: 48px; max-width: 160px; object-fit: contain;" onerror="this.style.display='none'" />
            <div>
              <div style="font-size: 22px; font-weight: 800; letter-spacing: 1.5px; color: #0F0D0B; font-family: serif;">FOXAL</div>
              <div class="watermark">Pure Herbal Incense & Aromatics</div>
            </div>
          </div>
          <div style="font-size: 12px; color: #7A5230; line-height: 1.6; margin-top: 6px;">
            <strong>FOXAL Organics & Aromatics Pvt. Ltd.</strong><br />
            Survey No. 42, GIDC Phase-2, Near Aji Dam,<br />
            Rajkot, Gujarat - 360003, India<br />
            <strong>Phone:</strong> +91 98765 43210 &nbsp;|&nbsp; <strong>Email:</strong> support@foxal.in<br />
            <strong>GSTIN:</strong> 24AAACF9821Q1Z4 &nbsp;|&nbsp; <strong>State:</strong> Gujarat (Code: 24)
          </div>
        </td>
        <td style="vertical-align: top; width: 45%; text-align: right;">
          <div style="background: #FAF7F2; border: 1px solid #E3D4BD; border-radius: 8px; padding: 12px; display: inline-block; text-align: right; min-width: 250px;">
            <div style="font-size: 14px; font-weight: 800; color: #C8922A; text-transform: uppercase; letter-spacing: 1px;">
              TAX INVOICE
            </div>
            <div style="font-size: 10px; color: #7A5230; margin-bottom: 8px;">
              Original for Recipient
            </div>
            <div style="font-size: 12px; margin-bottom: 4px;">
              <strong>Invoice No:</strong> <span style="font-family: monospace; font-weight: 700;">${invoiceNo}</span>
            </div>
            <div style="font-size: 12px; margin-bottom: 4px;">
              <strong>Invoice Date:</strong> ${order.date}
            </div>
            <div style="font-size: 12px; margin-bottom: 4px;">
              <strong>Order ID:</strong> <span style="font-family: monospace;">${order.id}</span>
            </div>
            <div style="font-size: 12px;">
              <strong>Payment Status:</strong> 
              <span style="color: #4A6B53; font-weight: 700;">${order.paymentStatus}</span>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Customer Billed/Shipped Details -->
    <div class="meta-box">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 16px;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #C8922A; letter-spacing: 0.5px; margin-bottom: 4px;">
              Billed &amp; Shipped To:
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #0F0D0B; margin-bottom: 2px;">
              ${order.address.fullName}
            </div>
            <div style="font-size: 12px; color: #7A5230; line-height: 1.5;">
              ${order.address.street}${order.address.landmark ? ', ' + order.address.landmark : ''}<br />
              ${order.address.city}, ${order.address.state} — <strong>${order.address.pincode}</strong><br />
              <strong>Phone:</strong> ${order.address.phone}
            </div>
          </td>
          <td style="width: 50%; vertical-align: top; padding-left: 16px; border-left: 1px solid #E3D4BD;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #C8922A; letter-spacing: 0.5px; margin-bottom: 4px;">
              Dispatch &amp; Payment Details:
            </div>
            <div style="font-size: 12px; color: #7A5230; line-height: 1.6;">
              <strong>Payment Mode:</strong> ${order.paymentMethod}<br />
              <strong>Tracking AWB:</strong> <span style="font-family: monospace; font-weight: 700; color: #0F0D0B;">${order.trackingNumber || 'IND-FOX-' + order.id.slice(-5)}</span><br />
              <strong>Place of Supply:</strong> ${order.address.state}<br />
              <strong>Estimated Delivery:</strong> ${order.estimatedDelivery || '3-4 Business Days'}
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Items Table: Kya Kharida, Kitna Kharida, Kitni Quantity, Rate, Total -->
    <table class="items-table">
      <thead>
        <tr>
          <th style="width: 6%; text-align: center;">#</th>
          <th style="width: 44%; text-align: left;">Item Description</th>
          <th style="width: 14%; text-align: center;">HSN Code</th>
          <th style="width: 12%; text-align: right;">Unit Rate</th>
          <th style="width: 10%; text-align: center;">Qty</th>
          <th style="width: 14%; text-align: right;">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <!-- Summary & Totals -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
      <tr>
        <td style="vertical-align: top; width: 55%; padding-right: 20px;">
          <div style="background: #FAF7F2; border: 1px solid #E3D4BD; border-radius: 8px; padding: 12px 14px; font-size: 12px;">
            <div style="font-weight: 700; color: #0F0D0B; margin-bottom: 3px;">
              Amount Chargeable (in words):
            </div>
            <div style="color: #7A5230; font-style: italic; font-weight: 600;">
              ${totalInWords}
            </div>
            <div style="margin-top: 10px; font-size: 11px; color: #4A6B53; font-weight: 600;">
              ✓ 100% Charcoal-Free &amp; Pure Temple Flower Blend Guaranteed.
            </div>
          </div>
        </td>
        <td style="vertical-align: top; width: 45%;">
          <table class="summary-table">
            <tr>
              <td style="color: #7A5230;">Items Subtotal (Taxable):</td>
              <td style="text-align: right; font-weight: 600; color: #0F0D0B;">₹${taxableSubtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="color: #7A5230;">CGST (2.5%):</td>
              <td style="text-align: right; color: #0F0D0B;">₹${cgst}</td>
            </tr>
            <tr>
              <td style="color: #7A5230;">SGST (2.5%):</td>
              <td style="text-align: right; color: #0F0D0B;">₹${sgst}</td>
            </tr>
            ${
              order.discount > 0
                ? `
            <tr>
              <td style="color: #4A6B53;">Sacred Discount:</td>
              <td style="text-align: right; color: #4A6B53; font-weight: 600;">-₹${order.discount.toFixed(2)}</td>
            </tr>
            `
                : ''
            }
            <tr>
              <td style="color: #7A5230;">Shipping &amp; Handling:</td>
              <td style="text-align: right; color: #4A6B53; font-weight: 700;">
                ${order.shipping === 0 ? 'FREE' : '₹' + order.shipping.toFixed(2)}
              </td>
            </tr>
            <tr class="grand-total-row">
              <td>Grand Total:</td>
              <td style="text-align: right; color: #C8922A;">₹${order.total.toFixed(2)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Footer: Terms & Signature Stamp -->
    <table style="width: 100%; border-collapse: collapse; border-top: 1px solid #E3D4BD; padding-top: 16px;">
      <tr>
        <td style="width: 60%; vertical-align: top; font-size: 11px; color: #7A5230; line-height: 1.6;">
          <strong>Terms &amp; Conditions:</strong><br />
          1. Goods once sold are covered by our 7-day divine satisfaction guarantee.<br />
          2. Store in a dry, serene environment away from direct moisture.<br />
          3. This is a computer-generated tax invoice and requires no physical signature.<br />
          4. For bulk orders or temple queries, contact us at <strong>care@foxal.in</strong>
        </td>
        <td style="width: 40%; vertical-align: bottom; text-align: right;">
          <div style="display: inline-block; text-align: center;">
            <div style="border: 2px dashed #C8922A; border-radius: 8px; padding: 10px 18px; display: inline-block; background: #FAF7F2; margin-bottom: 6px;">
              <div style="font-size: 10px; font-weight: 800; color: #C8922A; letter-spacing: 1px;">FOXAL AROMATICS PVT LTD</div>
              <div style="font-size: 9px; color: #4A6B53; font-weight: 700; margin-top: 2px;">★ DIGITALLY VERIFIED ★</div>
            </div>
            <div style="font-size: 11px; font-weight: 700; color: #0F0D0B;">Authorized Signatory</div>
          </div>
        </td>
      </tr>
    </table>
  </div>

  <script>
    // Automatically trigger print after page loads smoothly
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.print();
      }, 400);
    });
  </script>
</body>
</html>`;
}

export function openInvoiceWindow(order: Order) {
  if (typeof window === 'undefined') return;

  const origin = window.location.origin;
  const invoiceHtml = generateInvoiceHtml(order, origin);

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    printWindow.focus();
  } else {
    // Fallback if popup is blocked: use invisible iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(invoiceHtml);
      doc.close();
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 3000);
    }
  }
}
