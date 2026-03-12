'use client';

import { useState } from 'react';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, Upload, X } from 'lucide-react';
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

const serviceSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().optional(),
    icon: z.string().optional(),
    order: z.number(),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
    initialData?: any;
    onSubmit: (data: ServiceFormData) => Promise<void>;
    isLoading?: boolean;
}

export function ServiceForm({ initialData, onSubmit, isLoading = false }: ServiceFormProps) {
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            image: initialData?.image || '',
            icon: initialData?.icon || '',
            order: initialData?.order ?? 0,
            isActive: initialData?.isActive ?? true,
            isFeatured: initialData?.isFeatured ?? false,
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
                toast.success('Image uploaded');
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Service Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }: { field: ControllerRenderProps<ServiceFormData, 'title'> }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Service Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }: { field: ControllerRenderProps<ServiceFormData, 'description'> }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Service Description" rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col gap-4">
                                {form.watch('image') && (
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                        <img src={getImageUrl(form.watch('image'))} alt="Preview" className="h-full w-full object-cover" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-6 w-6"
                                            onClick={() => form.setValue('image', '')}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                                <div className="flex items-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }: { field: ControllerRenderProps<ServiceFormData, 'image'> }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder="Image URL or upload" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="image-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={isUploading}
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                        >
                                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="icon"
                                render={({ field }: { field: ControllerRenderProps<ServiceFormData, 'icon'> }) => (
                                    <FormItem>
                                        <FormLabel>Icon Name (Lucide)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Globe, Cpu, Server, etc." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="order"
                                render={({ field }: { field: ControllerRenderProps<ServiceFormData, 'order'> }) => (
                                    <FormItem>
                                        <FormLabel>Display Order</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-4 pt-2">
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }: { field: ControllerRenderProps<ServiceFormData, 'isActive'> }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={field.onChange}
                                                    className="h-4 w-4 rounded border-gray-300"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Active</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isFeatured"
                                    render={({ field }: { field: ControllerRenderProps<ServiceFormData, 'isFeatured'> }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={field.onChange}
                                                    className="h-4 w-4 rounded border-gray-300"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Is Featured (Show on Home Page)</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md p-4 flex justify-end gap-4 z-50 lg:left-64">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Service
                    </Button>
                </div>
            </form>
        </Form>
    );
}
