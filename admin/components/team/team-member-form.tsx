'use client';

import { useState } from 'react';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, Upload, User, X } from 'lucide-react';
import { uploadAPI } from '../../lib/api-client';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const teamSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    image: z.string().optional(),
    order: z.number(),
    isActive: z.boolean(),
});

type TeamFormData = z.infer<typeof teamSchema>;

interface TeamFormProps {
    initialData?: any;
    onSubmit: (data: TeamFormData) => Promise<void>;
    isLoading?: boolean;
}

export function TeamMemberForm({ initialData, onSubmit, isLoading = false }: TeamFormProps) {
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<TeamFormData>({
        resolver: zodResolver(teamSchema),
        defaultValues: {
            name: initialData?.name || '',
            role: initialData?.role || '',
            image: initialData?.image || '',
            order: initialData?.order || 0,
            isActive: initialData?.isActive ?? true,
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const res = await uploadAPI.uploadImage(file);
            if (res.success) {
                form.setValue('image', res.url);
                toast.success('Photo uploaded');
            }
        } catch {
            toast.error('Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const getImageUrl = (url?: string) => {
        if (!url) return '';
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'http://localhost:5000';
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Member Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }: { field: ControllerRenderProps<TeamFormData, 'name'> }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. कपिल सिंह" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }: { field: ControllerRenderProps<TeamFormData, 'role'> }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Founder & CEO" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="order"
                                render={({ field }: { field: ControllerRenderProps<TeamFormData, 'order'> }) => (
                                    <FormItem>
                                        <FormLabel>Display Order</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }: { field: ControllerRenderProps<TeamFormData, 'isActive'> }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="h-4 w-4 rounded border-gray-300"
                                            />
                                        </FormControl>
                                        <FormLabel>Active Member</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Profile Photo</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-4">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-2">
                                    <AvatarImage src={getImageUrl(form.watch('image'))} />
                                    <AvatarFallback className="text-4xl"><User className="h-16 w-16" /></AvatarFallback>
                                </Avatar>
                                {form.watch('image') && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => form.setValue('image', '')}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>

                            <div className="w-full space-y-2">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }: { field: ControllerRenderProps<TeamFormData, 'image'> }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Photo URL or upload" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="relative w-full">
                                    <input
                                        type="file"
                                        id="member-photo-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="w-full"
                                        disabled={isUploading}
                                        onClick={() => document.getElementById('member-photo-upload')?.click()}
                                    >
                                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                                        Upload Photo
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Member
                    </Button>
                </div>
            </form>
        </Form>
    );
}
