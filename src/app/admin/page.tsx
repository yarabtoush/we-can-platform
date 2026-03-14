"use client";

import { useState, useEffect } from "react";
import supabase from "../../lib/supabase";

interface Parent {
  id: string;
  user: {
    phone_number: string;
  };
  full_name: string;
  child_name: string;
  disability_type: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const { data, error } = await supabase
        .from('parents')
        .select(`
          *,
          users!inner(phone_number)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setParents(data || []);
    } catch (error: any) {
      setMessage('فشل في تحميل بيانات الوالدين');
    } finally {
      setLoading(false);
    }
  };

  const updateParentStatus = async (parentId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('parents')
        .update({
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', parentId);

      if (error) throw error;

      setMessage('تم تحديث حالة الوالد بنجاح');
      fetchParents(); // Refresh the list
    } catch (error) {
      setMessage('فشل في تحديث الحالة');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-8">لوحة تحكم الإدارة</h1>

        {message && (
          <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
            {message}
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">طلبات تسجيل الوالدين</h2>

          {parents.length === 0 ? (
            <p className="text-slate-600">لا توجد طلبات تسجيل</p>
          ) : (
            <div className="space-y-4">
              {parents.map((parent) => (
                <div key={parent.id} className="border border-slate-200 rounded-2xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium text-slate-900">{parent.full_name}</p>
                      <p className="text-sm text-slate-600">رقم الهاتف: {parent.user.phone_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">الطفل: {parent.child_name}</p>
                      <p className="text-sm text-slate-600">نوع الإعاقة: {parent.disability_type}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        parent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        parent.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {parent.status === 'pending' ? 'قيد المراجعة' :
                         parent.status === 'approved' ? 'معتمد' : 'مرفوض'}
                      </span>

                      {parent.status === 'pending' && (
                        <div className="space-x-2">
                          <button
                            onClick={() => updateParentStatus(parent.id, 'approved')}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-2xl hover:bg-green-500"
                          >
                            اعتماد
                          </button>
                          <button
                            onClick={() => updateParentStatus(parent.id, 'rejected')}
                            className="px-4 py-2 bg-red-600 text-white text-sm rounded-2xl hover:bg-red-500"
                          >
                            رفض
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}