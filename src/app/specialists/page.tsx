"use client";

import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useMemo } from "react";
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

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 31.963158,
  lng: 35.930359,
};

export default function SpecialistsMapPage() {
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [filters, setFilters] = useState({
    city: "",
    specialization: "",
    rating: "",
  });

  const filteredSpecialists = useMemo(() => {
    return specialists.filter((spec) => {
      return (
        (filters.city === "" || spec.city === filters.city) &&
        (filters.specialization === "" || spec.specialization === filters.specialization) &&
        (filters.rating === "" || spec.rating >= parseFloat(filters.rating))
      );
    });
  }, [filters]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900">خريطة المختصين</h1>
        <p className="mt-2 text-sm text-slate-600">
          ابحث عن المختصين في منطقتك واطلع على خدماتهم.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">فلاتر البحث</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700">المدينة</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              >
                <option value="">جميع المدن</option>
                <option value="عمان">عمان</option>
                <option value="إربد">إربد</option>
                <option value="الزرقاء">الزرقاء</option>
                <option value="المفرق">المفرق</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">التخصص</label>
              <select
                value={filters.specialization}
                onChange={(e) => handleFilterChange("specialization", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              >
                <option value="">جميع التخصصات</option>
                <option value="تخاطب">تخاطب</option>
                <option value="علاج نفسي">علاج نفسي</option>
                <option value="تأهيل جسدي">تأهيل جسدي</option>
                <option value="تعليم خاص">تعليم خاص</option>
                <option value="علاج سلوكي">علاج سلوكي</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">التقييم الأدنى</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              >
                <option value="">جميع التقييمات</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-3">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE"}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={8}
                options={{
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                }}
              >
                {filteredSpecialists.map((specialist) => (
                  <Marker
                    key={specialist.id}
                    position={{ lat: specialist.lat, lng: specialist.lng }}
                    onClick={() => setSelectedSpecialist(specialist)}
                  />
                ))}

                {selectedSpecialist && (
                  <InfoWindow
                    position={{ lat: selectedSpecialist.lat, lng: selectedSpecialist.lng }}
                    onCloseClick={() => setSelectedSpecialist(null)}
                  >
                    <div className="p-2 text-right">
                      <h3 className="font-semibold text-slate-900">{selectedSpecialist.name}</h3>
                      <p className="text-sm text-slate-600">{selectedSpecialist.specialization}</p>
                      <p className="text-sm text-slate-600">التقييم: {selectedSpecialist.rating} ⭐</p>
                      <Link
                        href="/book-evaluation"
                        className="mt-2 inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
                      >
                        حجز تقييم
                      </Link>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
}
