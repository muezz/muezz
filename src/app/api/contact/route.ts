import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, mobile, message } = data;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Validate mobile number
    const phoneNumber = parsePhoneNumberFromString(mobile || '', 'US'); // Default country code can be changed
    if (!phoneNumber || !phoneNumber.isValid()) {
      return NextResponse.json(
        { error: 'Invalid mobile number.' },
        { status: 400 }
      );
    }

    // Validate message
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Compose email
    const mailOptions = {
      from: `Contact Form <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${phoneNumber.formatInternational()}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Inquiry sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: `Failed to send inquiry: ${errorMessage}` },
      { status: 500 }
    );
  }
}
