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
import { Plus, MoreHorizontal, Edit, Trash, HelpCircle } from 'lucide-react';
import { faqAPI } from '../../../lib/api-client';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Badge } from '../../../components/ui/badge';

export default function FAQsPage() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await faqAPI.getAll();
            if (res.success) {
                setFaqs(res.faqs);
            }
        } catch (error: any) {
            toast.error('Failed to fetch FAQs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        try {
            const res = await faqAPI.delete(id);
            if (res.success) {
                toast.success('FAQ deleted');
                fetchData();
            }
        } catch (error: any) {
            toast.error('Failed to delete FAQ');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
                    <p className="text-muted-foreground">Manage frequently asked questions.</p>
                </div>
                <Button asChild>
                    <a href="/admin/faqs/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add FAQ
                    </a>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Order</TableHead>
                                <TableHead>Question</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-10">Loading FAQs...</TableCell>
                                </TableRow>
                            ) : faqs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-10">No FAQs found.</TableCell>
                                </TableRow>
                            ) : (
                                faqs.map((f) => (
                                    <TableRow key={f._id}>
                                        <TableCell>{f.order}</TableCell>
                                        <TableCell className="font-medium max-w-md truncate">{f.question}</TableCell>
                                        <TableCell>
                                            {f.isActive ? (
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
                                                        <a href={`/admin/faqs/edit/${f._id}`}>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </a>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(f._id)} className="text-destructive">
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
