"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";

type Specialist = {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  city: string;
  lat: number;
  lng: number;
};

const specialists: Specialist[] = [
  { id: 1, name: "د. أحمد علي", specialization: "تخاطب", rating: 4.8, city: "عمان", lat: 31.963158, lng: 35.930359 },
  { id: 2, name: "د. فاطمة حسن", specialization: "علاج نفسي", rating: 4.9, city: "إربد", lat: 32.5556, lng: 35.8461 },
  { id: 3, name: "د. محمد سالم", specialization: "تأهيل جسدي", rating: 4.7, city: "الزرقاء", lat: 32.0728, lng: 36.0880 },
  { id: 4, name: "د. لينا خالد", specialization: "تعليم خاص", rating: 4.6, city: "عمان", lat: 31.9566, lng: 35.9457 },
  { id: 5, name: "د. سامر يوسف", specialization: "علاج سلوكي", rating: 4.5, city: "المفرق", lat: 32.3417, lng: 36.2028 },
];

const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function BookEvaluationPage() {
  const [step, setStep] = useState(1);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSpecialistSelect = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setStep(2);
  };

  const handleDateSelect = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setStep(3);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    if (!selectedSpecialist || !selectedDate || !selectedTime) {
      setMessage("يرجى ملء جميع الحقول.");
      return;
    }

    // Placeholder for sending booking request to specialist
    setMessage(`تم إرسال طلب الحجز إلى ${selectedSpecialist.name}. سيتم التواصل معك قريباً.`);
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">اختر المختص</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {specialists.map((specialist) => (
                <div
                  key={specialist.id}
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                  onClick={() => handleSpecialistSelect(specialist)}
                >
                  <h3 className="font-semibold text-slate-900">{specialist.name}</h3>
                  <p className="text-sm text-slate-600">{specialist.specialization}</p>
                  <p className="text-sm text-slate-600">{specialist.city}</p>
                  <p className="text-sm text-slate-600">التقييم: {specialist.rating} ⭐</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">اختر التاريخ</h2>
            <p className="text-sm text-slate-600">المختص المختار: {selectedSpecialist?.name}</p>
            <div className="flex justify-center">
              <Calendar
                onChange={handleDateSelect}
                value={selectedDate}
                minDate={new Date()}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">اختر الوقت المتاح</h2>
            <p className="text-sm text-slate-600">
              المختص: {selectedSpecialist?.name} | التاريخ: {selectedDate?.toLocaleDateString("ar-JO")}
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    selectedTime === time
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-semibold text-slate-900">تم الحجز بنجاح!</h2>
            <p className="text-sm text-slate-600">{message}</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-lg backdrop-blur">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900">حجز تقييم</h1>
            <div className="mt-4 flex items-center space-x-4 rtl:space-x-reverse">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    step >= num
                      ? "bg-sky-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}

          {message && step !== 4 && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {message}
            </div>
          )}

          {step < 4 && step > 1 && (
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(step - 1)}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                السابق
              </button>
              {step === 3 && selectedTime && (
                <button
                  onClick={handleConfirmBooking}
                  className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
                >
                  تأكيد الحجز
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
