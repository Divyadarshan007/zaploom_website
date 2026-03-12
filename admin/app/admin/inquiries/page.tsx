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
import { Eye, Trash, Mail, User, Calendar, MessageSquare } from 'lucide-react';
import { contactInquiryAPI } from '../../../lib/api-client';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../components/ui/dialog';
import { Badge } from '../../../components/ui/badge';
import { format } from 'date-fns';

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

    const fetchData = async () => {
        try {
            const res = await contactInquiryAPI.getAll();
            if (res.success) {
                setInquiries(res.inquiries);
            }
        } catch (error: any) {
            toast.error('Failed to fetch inquiries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleView = async (inquiry: any) => {
        setSelectedInquiry(inquiry);
        if (!inquiry.isRead) {
            try {
                await contactInquiryAPI.markAsRead(inquiry._id);
                fetchData(); // Refresh to update read status
            } catch (error: any) {
                console.error('Failed to mark as read', error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            const res = await contactInquiryAPI.delete(id);
            if (res.success) {
                toast.success('Inquiry deleted');
                fetchData();
            }
        } catch (error: any) {
            toast.error('Failed to delete inquiry');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Contact Inquiries</h1>
                    <p className="text-muted-foreground">Manage messages from your website visitors.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Sender</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">Loading inquiries...</TableCell>
                                </TableRow>
                            ) : inquiries.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">No inquiries found.</TableCell>
                                </TableRow>
                            ) : (
                                inquiries.map((iq) => (
                                    <TableRow key={iq._id} className={iq.isRead ? 'opacity-70' : 'font-semibold'}>
                                        <TableCell className="text-xs">
                                            {format(new Date(iq.createdAt), 'MMM dd, yyyy HH:mm')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{iq.name}</span>
                                                <span className="text-xs text-muted-foreground">{iq.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate">{iq.subject || 'No Subject'}</TableCell>
                                        <TableCell>
                                            {iq.isRead ? (
                                                <Badge variant="outline">Read</Badge>
                                            ) : (
                                                <Badge className="bg-blue-500">New</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" onClick={() => handleView(iq)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Inquiry Details</DialogTitle>
                                                            <DialogDescription>
                                                                Received on {selectedInquiry && format(new Date(selectedInquiry.createdAt), 'PPPPpppp')}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        {selectedInquiry && (
                                                            <div className="space-y-6 pt-4">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                                        <div>
                                                                            <p className="text-xs text-muted-foreground">From</p>
                                                                            <p className="text-sm font-medium">{selectedInquiry.name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                                        <div>
                                                                            <p className="text-xs text-muted-foreground">Email</p>
                                                                            <p className="text-sm font-medium">{selectedInquiry.email}</p>
                                                                        </div>
                                                                    </div>
                                                                    {selectedInquiry.phone && (
                                                                        <div className="flex items-center gap-2">
                                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                                            <div>
                                                                                <p className="text-xs text-muted-foreground">Phone</p>
                                                                                <p className="text-sm font-medium">{selectedInquiry.phone}</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <div className="col-span-2 flex items-start gap-2 border-t pt-4">
                                                                        <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground" />
                                                                        <div className="flex-1">
                                                                            <p className="text-xs text-muted-foreground mb-1">Message</p>
                                                                            <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                                                                                {selectedInquiry.message}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </DialogContent>
                                                </Dialog>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(iq._id)} className="text-destructive">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
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
