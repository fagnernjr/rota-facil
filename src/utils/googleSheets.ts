import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: "rota-facil-443612",
    private_key_id: "175b712d96cef3b2fd2280178ac5dfbbeba2dc04",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHyPuPB4kw8O0R\nckatR6uoCSzVx8rdM875jRdGlNJPUvpRhjZ10DMj93szvUuUZ459GmWS3ce2P4J2\nJo7ntMHi3OGsbh+uLchnGJITbz2LyYIx0SlJbL4XldcRb2YFgX8mq3zAb6CzRSSc\nNwTqDh2TyZZ1hjOPko7oN818Oi90wJ5+polzAw0dm2JZmHQEYkxMDxP0bZwhsT8w\nqrHknH5xwDZY+FSCViltsMWzjVJEnpHAe9zquqbPpMs0ZjQB7TGmCBxFfZH3i3aN\nhCp11aP0SrHheBkn304X6MMatwdj0bdYyXPGiNBcM0uB1fqXW+yq02AwDDQj8+JJ\n4xBAt+2lAgMBAAECggEAKbBXSefVKWjE12SkuejgOX68o9l+i/0RHgLijgBlCFd0\n04kxmRD6cvFj/I5uFIgtdA6LjoOH9pA3HYd7P395C+lykAQkyThVfqniZXrLeX1x\nlQqj1mYCHrLOP52iyNhWW4/iRtekTXRKqOxUMrECXAHvSxPXc4iuGGf4kYkkuPRQ\nQ2F54G1SNFU9oUK3QkYv/XNB24Kn2HF5lb27bpdwWL48sDFGJgAqLEwc8vmxtQMo\nzptKJVjjfPzinQqf9xFukmFm8Yq5I4VniF1yCyuuFurMQ4icorW0rKdKkJYVphd6\nI2bbBo7n0Uw+2Ip2Kt3Rn/yZmCzZramNyJIYx56dAQKBgQDsrAe8+My4I4p4DUbO\nVrrhs27gobzfqkr9g36AKsWWG55z8KS6SzHVeQahqUvrLV342BFE0UrwM9EACKwu\ndmWZNVjzsOOEHaUp7o1RjqZOUb6vGj+pN6rKaFJxoJn29+QRUIKNoQWNDLd5OIas\nXTRe2EhHK91dBhhECaeoxH/JgQKBgQDYGcdGazIGIuUCUyBbq6lNWB9sK2EDF/hh\nm6nzByT/YHt0qC4LY5Xz5ZI9lzYhTN4nfXqTcen5YkRTHS1TMLttbQ/9LhvaPJRH\nQLO61lLeatSCLXqIdHiz5p+bxJ/HXXJDaQxO2M95CC30XCxjvT0jSvP5CcDKW+ZR\nQ6HEDxrOJQKBgC6yhthXcvVGNfUYEYd2/2q3H8J8xyqOjDtXLaeWSOQkUPBpY+dK\nHOwU9CUDpXIiwm7uGwIsFZAteSh7jZWhUMyZBRMYLNwNiWArrICSF+hOIsSj9jmq\nPS2wxcubt6VOJhbwfsH5KoI5Jx5o89Gglku8ew5n7kaDhFgwW39mPhyBAoGBAK1b\nUK8/AyxFBe3tfYHMnc58KQj/a52ttwWmeJmLW7S6U49r8zQTuZGk0sIx8ayZG4YW\ndSSfN5FlsWXzfA7GgzTvTupN+O4DtvfKAeSaVnQywzODBE8/EC1RjyzIeVzXq/hD\n5ynBZ/6x/xuObdW9U7RiRoG7vzsWqhb66GR9sYU5AoGBAL7SgwGsxYfzHXTs7NS+\nlUgUwo9F0cM52zhgC+BSD24AS13PyyisobNoPF9xN7H7ns5FoHj9CeItNkLM1djt\noUbRkkNVknhpMZ6g6l5aINnN+A57mJdwjrPkTYArqoSQ/vntzKO21Ay6cA0xen6r\nD5KgIdllc7hOHJ0zuOu8UAiO\n-----END PRIVATE KEY-----\n",
    client_email: "rota-facil@rota-facil-443612.iam.gserviceaccount.com",
    client_id: "109448781774045616910",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/rota-facil%40rota-facil-443612.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '16azgvh21DSMalFuLnpYFd9ZmySKUAJrc_Rzv1KyEzMM';

// Sheet names
const ORDERS_SHEET = 'Orders';
const STOCK_SHEET = 'Stock';
const SALES_SHEET = 'Sales Report';

export async function setupInitialSheet() {
  try {
    // Set up Orders sheet
    const orderHeaders = [
      'Timestamp',
      'Order ID',
      'Customer Name',
      'Phone',
      'Address',
      'Payment Method',
      'Amount',
      'Status',
      'Route Status',
      'Courier ID',
      'Created By',
      'Created At',
      'Updated At',
      'Products',
      'Notes',
      'Cancellation Reason',
    ];

    // Set up Stock sheet
    const stockHeaders = [
      'Product ID',
      'Size',
      'Color',
      'Quantity Available',
      'Last Updated',
    ];

    // Set up Sales Report sheet
    const salesHeaders = [
      'Date',
      'Product ID',
      'Size',
      'Color',
      'Quantity Sold',
      'Status',
      'Order ID',
      'Created By',
    ];

    await Promise.all([
      // Create/update Orders sheet
      sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${ORDERS_SHEET}!A1:P1`,
        valueInputOption: 'RAW',
        requestBody: { values: [orderHeaders] },
      }),

      // Create/update Stock sheet
      sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${STOCK_SHEET}!A1:E1`,
        valueInputOption: 'RAW',
        requestBody: { values: [stockHeaders] },
      }),

      // Create/update Sales Report sheet
      sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SALES_SHEET}!A1:H1`,
        valueInputOption: 'RAW',
        requestBody: { values: [salesHeaders] },
      }),
    ]);
  } catch (error) {
    console.error('Error setting up sheets:', error);
  }
}

export async function appendDeliveryToSheet(delivery: any) {
  try {
    // Add to Orders sheet
    const orderValues = [
      [
        new Date().toISOString(),
        delivery.id,
        delivery.customerName,
        delivery.phone,
        delivery.address,
        delivery.paymentMethod,
        delivery.paymentAmount,
        delivery.status,
        delivery.routeStatus,
        delivery.courierId,
        `${delivery.createdBy.name} (${delivery.createdBy.role})`,
        delivery.createdAt,
        delivery.updatedAt || '',
        JSON.stringify(delivery.products),
        delivery.notes || '',
        delivery.cancellationReason || '',
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ORDERS_SHEET}`,
      valueInputOption: 'RAW',
      requestBody: { values: orderValues },
    });

    // Update Stock and Sales Report
    await updateStockAndSales(delivery);
  } catch (error) {
    console.error('Error appending to sheets:', error);
  }
}

export async function updateDeliveryInSheet(deliveryId: string, updates: any) {
  try {
    // Update Orders sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: ORDERS_SHEET,
    });

    const rows = response.data.values;
    if (!rows) return;

    const rowIndex = rows.findIndex(row => row[1] === deliveryId);
    if (rowIndex === -1) return;

    const updatedRow = [...rows[rowIndex]];
    if (updates.status) updatedRow[7] = updates.status;
    if (updates.routeStatus) updatedRow[8] = updates.routeStatus;
    if (updates.cancellationReason) updatedRow[15] = updates.cancellationReason;
    updatedRow[12] = new Date().toISOString();

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ORDERS_SHEET}!A${rowIndex + 1}:P${rowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: { values: [updatedRow] },
    });

    // Update Stock and Sales Report based on status change
    if (updates.status) {
      const delivery = {
        id: deliveryId,
        status: updates.status,
        products: JSON.parse(rows[rowIndex][13]),
        createdBy: rows[rowIndex][10],
        cancellationReason: updates.cancellationReason,
      };
      await updateStockAndSales(delivery);
    }
  } catch (error) {
    console.error('Error updating sheets:', error);
  }
}

async function updateStockAndSales(delivery: any) {
  try {
    const timestamp = new Date().toISOString();

    // Get current stock
    const stockResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: STOCK_SHEET,
    });
    const stockRows = stockResponse.data.values || [];

    // Process each product in the order
    for (const product of delivery.products) {
      const productId = `${product.size}-${product.color}`;
      const stockIndex = stockRows.findIndex(row => row[0] === productId);

      // Sales Report entry
      const salesEntry = [
        timestamp,
        productId,
        product.size,
        product.color,
        product.quantity,
        delivery.status,
        delivery.id,
        delivery.createdBy,
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: SALES_SHEET,
        valueInputOption: 'RAW',
        requestBody: { values: [salesEntry] },
      });

      // Update stock
      if (stockIndex > 0) {
        const currentQuantity = parseInt(stockRows[stockIndex][3]);
        const newQuantity = delivery.status === 'completed' 
          ? currentQuantity - product.quantity
          : currentQuantity + product.quantity;

        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${STOCK_SHEET}!D${stockIndex + 1}:E${stockIndex + 1}`,
          valueInputOption: 'RAW',
          requestBody: { 
            values: [[newQuantity, timestamp]]
          },
        });
      }
    }
  } catch (error) {
    console.error('Error updating stock and sales:', error);
  }
}