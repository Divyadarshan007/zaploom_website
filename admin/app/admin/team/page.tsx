'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Plus, MoreHorizontal, Edit, Trash, User } from 'lucide-react';
import { teamMemberAPI } from '../../../lib/api-client';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';

export default function TeamPage() {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await teamMemberAPI.getAll();
            if (res.success) {
                setMembers(res.teamMembers);
            }
        } catch (error: any) {
            toast.error('Failed to fetch team members');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return;
        try {
            const res = await teamMemberAPI.delete(id);
            if (res.success) {
                toast.success('Member removed');
                fetchData();
            }
        } catch (error: any) {
            toast.error('Failed to delete member');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-muted-foreground">Manage your core team and their roles.</p>
                </div>
                <Button asChild>
                    <a href="/admin/team/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                    </a>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Member</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">Loading team...</TableCell>
                                </TableRow>
                            ) : members.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">No team members found.</TableCell>
                                </TableRow>
                            ) : (
                                members.map((m) => (
                                    <TableRow key={m._id}>
                                        <TableCell>{m.order}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={m.image} alt={m.name} />
                                                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{m.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{m.role}</TableCell>
                                        <TableCell>
                                            {m.isActive ? (
                                                <Badge className="bg-green-500">Active</Badge>
                                            ) : (
                                                <Badge variant="secondary">Inactive</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <a href={`/admin/team/edit/${m._id}`}>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </a>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(m._id)} className="text-destructive">
                                                        <Trash className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
