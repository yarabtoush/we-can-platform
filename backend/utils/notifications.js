const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send notification
const sendNotification = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

// Send SMS via email (for simple notifications)
const sendSMSNotification = async (phoneNumber, message) => {
  // This is a simple implementation - in production use Twilio
  try {
    // For Jordanian numbers, you might need to use a service
    // For now, we'll use email to SMS gateway if available
    console.log(`SMS to ${phoneNumber}: ${message}`);
    return { success: true };
  } catch (error) {
    console.error('SMS error:', error);
    return { success: false, error: error.message };
  }
};

// Notification types
const sendWelcomeEmail = async (email, name) => {
  const subject = 'مرحباً بك في منصة We Can';
  const text = `مرحباً ${name}،\n\nشكراً لتسجيلك في منصة We Can لدعم ذوي الاحتياجات الخاصة.\n\nستتلقى إشعاراً عند الموافقة على طلبك.`;
  return sendNotification(email, subject, text);
};

const sendApprovalNotification = async (email, name) => {
  const subject = 'تم الموافقة على طلب التسجيل';
  const text = `مرحباً ${name}،\n\nتمت الموافقة على طلب تسجيلك في منصة We Can.\n\nيمكنك الآن تسجيل الدخول واستخدام جميع خدمات المنصة.`;
  return sendNotification(email, subject, text);
};

const sendRejectionNotification = async (email, name) => {
  const subject = 'تحديث بخصوص طلب التسجيل';
  const text = `مرحباً ${name}،\n\nنعتذر، تم رفض طلب التسجيل الخاص بك.\n\nيرجى مراجعة البيانات المقدمة والمحاولة مرة أخرى.`;
  return sendNotification(email, subject, text);
};

const sendBookingConfirmation = async (email, bookingDetails) => {
  const subject = 'تأكيد الحجز';
  const text = `مرحباً،\n\nتم تأكيد حجزك مع ${bookingDetails.specialistName} في ${bookingDetails.date} الساعة ${bookingDetails.time}.\n\nرقم الحجز: ${bookingDetails.bookingId}`;
  return sendNotification(email, subject, text);
};

module.exports = {
  sendNotification,
  sendSMSNotification,
  sendWelcomeEmail,
  sendApprovalNotification,
  sendRejectionNotification,
  sendBookingConfirmation,
};