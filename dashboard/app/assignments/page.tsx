'use client';

import React, { useState } from 'react';
import { useAssignments, useUsers, useForms } from '@/hooks/useApi';
import { api } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormAssignment } from '@/types';

export default function AssignmentsPage() {
  const { data: assignments = [], isLoading: isLoadingAssignments } = useAssignments();
  const { data: users = [] } = useUsers();
  const { data: forms = [] } = useForms();
  
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [assigning, setAssigning] = useState(false);

  // Form State
  const [userId, setUserId] = useState('');
  const [formId, setFormId] = useState('');

  const resetForm = () => {
    setUserId('');
    setFormId('');
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !formId) return alert('Please select a user and a form');
    setAssigning(true);
    try {
      await api.post('/assignments/', {
        user_id: userId,
        form_id: formId,
      });
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Failed to assign form');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Assignments</h1>
          <p className="text-slate-500 mt-2">Assign forms to field workers and track completion.</p>
        </div>
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild><Button>Assign Form</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Form to User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAssign} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>User</Label>
                <Select value={userId} onValueChange={(val) => setUserId(val || '')}>
                  <SelectTrigger><SelectValue placeholder="Select user" /></SelectTrigger>
                  <SelectContent>
                    {users.map(u => (
                      <SelectItem key={u.id} value={u.id}>{u.username} ({u.role})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Form</Label>
                <Select value={formId} onValueChange={(val) => setFormId(val || '')}>
                  <SelectTrigger><SelectValue placeholder="Select form" /></SelectTrigger>
                  <SelectContent>
                    {forms.map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={assigning}>
                {assigning ? 'Assigning...' : 'Assign'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Form</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingAssignments ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : assignments.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500">No assignments found</TableCell></TableRow>
            ) : (
              assignments.map(assignment => {
                // Because backend might not return populated form/user objects for admin GET /assignments
                // We map them from our cached lists just in case.
                const formObj = assignment.form || forms.find(f => f.id === assignment.form_id);
                const userObj = assignment.user || users.find(u => u.id === assignment.user_id);
                
                return (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{formObj ? formObj.name : assignment.form_id}</TableCell>
                    <TableCell>{userObj ? userObj.username : assignment.user_id}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(assignment.assigned_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
