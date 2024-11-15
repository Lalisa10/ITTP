const PDFDocument = require('pdfkit');
const fs = require('fs');
const amqp = require('amqplib');


const OUT_FILE = '../output/output' +Date.now() +'.pdf';
const FONT_PATH = '../font/Roboto-Bold.ttf';

async function createPDF() {
    console.log('Đang kết nối tới RabbitMQ Server');
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    console.log('Đã kết nối tới RabbitMQ Server');

    const queuePDF = 'PDF';
    await channel.assertQueue(queuePDF, {durable: true});

    console.log('Đang chờ tin nhắn trong hàng đợi', queuePDF);

    channel.consume(queuePDF, async (msg) => {
        const data = JSON.parse(msg.content.toString());
        const generatedPDFText = data.text;

        try {
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(OUT_FILE));
            doc.fontSize(16)
                .font(FONT_PATH)
                .text(generatedPDFText, 100, 100);
            doc.end();
            console.log('PDF created');
            channel.ack(msg);
        } catch (error) {
            console.error('Lỗi khi tạo PDF', error);
        }
    }, {noAck: false});
}

createPDF();