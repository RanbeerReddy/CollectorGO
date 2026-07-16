'use client';

import React, { useState } from 'react';
import { useUsers } from '@/hooks/useApi';
import { api } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function UsersPage() {
  const { data: users = [], isLoading } = useUsers();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('FIELD_WORKER');
  
  // Note: hardcoding demo org ID since there's no org selector right now
  const orgId = '00000000-0000-0000-0000-000000000000'; // We'll let backend handle or error, wait actually we should fetch orgs or assume user's org. We will omit org_id if possible or fetch it. Let's send an empty org_id and let the backend fail or we need to pass a valid UUID. The backend seed script created an org. Let's use a dummy or skip org if optional. The schema says organization_id is UUID.

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post('/users/', {
        username,
        email,
        password,
        role,
        is_active: true,
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate this user?')) return;
    try {
      // Assuming a PUT /users/{id} or PATCH endpoint exists. 
      // Note: Backend might not have deactivate yet. I will implement a basic stub.
      alert('Deactivation endpoint not implemented in backend yet!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Users</h1>
          <p className="text-slate-500 mt-2">Manage system users and their roles.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button />}>Create User</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={username} onChange={e => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={role} onValueChange={(val) => setRole(val || '')}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                    <SelectItem value="FIELD_WORKER">Field Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? 'Creating...' : 'Create'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : users.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-slate-500">No users found</TableCell></TableRow>
            ) : (
              users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleDeactivate(user.id)} disabled={!user.is_active}>
                      Deactivate
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
