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
import { Card, CardContent } from '../../../components/ui/card';
import { Plus, MoreHorizontal, Edit, Trash, Star } from 'lucide-react';
import { serviceAPI } from '../../../lib/api-client';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Badge } from '../../../components/ui/badge';

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const res = await serviceAPI.getAll();
            if (res.success) {
                setServices(res.services);
            }
        } catch (error: any) {
            toast.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            const res = await serviceAPI.delete(id);
            if (res.success) {
                toast.success('Service deleted');
                fetchServices();
            }
        } catch (error: any) {
            toast.error('Failed to delete service');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                    <p className="text-muted-foreground">Manage your company services for the Features section.</p>
                </div>
                <Button asChild>
                    <a href="/admin/services/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                    </a>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">Loading services...</TableCell>
                                </TableRow>
                            ) : services.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">No services found.</TableCell>
                                </TableRow>
                            ) : (
                                services.map((service) => (
                                    <TableRow key={service._id}>
                                        <TableCell>{service.order}</TableCell>
                                        <TableCell className="font-medium">{service.title}</TableCell>
                                        <TableCell>
                                            {service.isFeatured ? (
                                                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                                                    <Star className="h-3 w-3 mr-1 fill-amber-700" /> Featured
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">Standard</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {service.isActive ? (
                                                <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
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
                                                        <a href={`/admin/services/edit/${service._id}`}>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </a>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(service._id)} className="text-destructive">
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
