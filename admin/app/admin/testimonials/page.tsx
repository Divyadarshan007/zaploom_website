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
import { Plus, MoreHorizontal, Edit, Trash, Play } from 'lucide-react';
import { testimonialAPI } from '../../../lib/api-client';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Badge } from '../../../components/ui/badge';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = async () => {
        try {
            const res = await testimonialAPI.getAll();
            if (res.success) {
                setTestimonials(res.testimonials);
            }
        } catch (error: any) {
            toast.error('Failed to fetch testimonials');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            const res = await testimonialAPI.delete(id);
            if (res.success) {
                toast.success('Testimonial deleted');
                fetchTestimonials();
            }
        } catch (error: any) {
            toast.error('Failed to delete testimonial');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                    <p className="text-muted-foreground">Manage client video stories and feedback.</p>
                </div>
                <Button asChild>
                    <a href="/admin/testimonials/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Testimonial
                    </a>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Role/Company</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">Loading testimonials...</TableCell>
                                </TableRow>
                            ) : testimonials.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">No testimonials found.</TableCell>
                                </TableRow>
                            ) : (
                                testimonials.map((t) => (
                                    <TableRow key={t._id}>
                                        <TableCell>{t.order}</TableCell>
                                        <TableCell className="font-medium">{t.name}</TableCell>
                                        <TableCell>{t.role}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="capitalize">
                                                {t.mediaType}
                                                {t.videoUrl && <Play className="ml-1 h-3 w-3 inline" />}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {t.isActive ? (
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
                                                        <a href={`/admin/testimonials/edit/${t._id}`}>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </a>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(t._id)} className="text-destructive">
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
