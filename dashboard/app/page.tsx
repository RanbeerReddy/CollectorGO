'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUsers, useForms, useAssignments } from '@/hooks/useApi';
import { Users, FileText, ClipboardList, Building2 } from 'lucide-react';

export default function DashboardPage() {
  const { data: users = [] } = useUsers();
  const { data: forms = [] } = useForms();
  const { data: assignments = [] } = useAssignments();

  // Assuming single org for now based on backend state
  const organizationsCount = 1;

  const stats = [
    { title: 'Total Users', value: users.length, icon: Users, color: 'text-blue-600' },
    { title: 'Total Forms', value: forms.length, icon: FileText, color: 'text-green-600' },
    { title: 'Assignments', value: assignments.length, icon: ClipboardList, color: 'text-purple-600' },
    { title: 'Organizations', value: organizationsCount, icon: Building2, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Overview of your system resources.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
