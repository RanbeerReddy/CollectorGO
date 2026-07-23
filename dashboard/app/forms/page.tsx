'use client';

import React, { useState, useEffect } from 'react';
import { useForms } from '@/hooks/useApi';
import { api } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/types';

export default function FormsPage() {
  const { data: forms = [], isLoading } = useForms();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const [saving, setSaving] = useState(false);
  const [orgId, setOrgId] = useState('');

  // Fetch current user's organization_id on mount
  useEffect(() => {
    api.get('/auth/me').then(res => {
      if (res.data?.organization_id) {
        setOrgId(res.data.organization_id);
      }
    }).catch(() => {});
  }, []);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [koboUrl, setKoboUrl] = useState('');
  const [category, setCategory] = useState('');

  const resetForm = () => {
    setName('');
    setDescription('');
    setKoboUrl('');
    setCategory('');
    setEditingForm(null);
  };

  const handleEditOpen = (form: Form) => {
    setEditingForm(form);
    setName(form.name);
    setDescription(form.description || '');
    setKoboUrl(form.enketo_url || '');
    setCategory(form.category || '');
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name,
        description: description || null,
        enketo_url: koboUrl || null,
        category: category || null,
      };

      // organization_id is required only for creation
      if (!editingForm) {
        payload.organization_id = orgId;
      }

      if (editingForm) {
        await api.put(`/forms/${editingForm.id}`, payload);
      } else {
        await api.post('/forms/', payload);
      }
      
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Failed to save form');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this form?')) return;
    try {
      await api.delete(`/forms/${id}`);
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    } catch (err) {
      console.error(err);
      alert('Failed to delete form');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Forms</h1>
          <p className="text-slate-500 mt-2">Manage KoboToolbox forms available to users.</p>
        </div>
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild><Button>Create Form</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingForm ? 'Edit Form' : 'Create New Form'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={category} onChange={e => setCategory(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Enketo URL</Label>
                <Input type="url" value={koboUrl} onChange={e => setKoboUrl(e.target.value)} placeholder="https://enke.to/..." />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? 'Saving...' : 'Save Form'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : forms.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500">No forms found</TableCell></TableRow>
            ) : (
              forms.map(form => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">{form.name}</TableCell>
                  <TableCell>{form.category}</TableCell>
                  <TableCell>
                    {form.enketo_url ? (
                      <a href={form.enketo_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Link</a>
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditOpen(form)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(form.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
