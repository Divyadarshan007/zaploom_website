'use client';

import { useState } from 'react';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, Video, Image as ImageIcon } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

const testimonialSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    content: z.string().optional(),
    videoUrl: z.string().optional(),
    imageUrl: z.string().optional(),
    mediaType: z.enum(['video', 'text', 'image']),
    order: z.number(),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
    initialData?: any;
    onSubmit: (data: TestimonialFormData) => Promise<void>;
    isLoading?: boolean;
}

export function TestimonialForm({ initialData, onSubmit, isLoading = false }: TestimonialFormProps) {
    const form = useForm<TestimonialFormData>({
        resolver: zodResolver(testimonialSchema),
        defaultValues: {
            name: initialData?.name || '',
            role: initialData?.role || '',
            content: initialData?.content || '',
            videoUrl: initialData?.videoUrl || '',
            imageUrl: initialData?.imageUrl || '',
            mediaType: initialData?.mediaType || 'video',
            order: initialData?.order || 0,
            isActive: initialData?.isActive ?? true,
            isFeatured: initialData?.isFeatured ?? true,
        },
    });

    const mediaType = form.watch('mediaType');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Client Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }: { field: ControllerRenderProps<TestimonialFormData, 'name'> }) => (
                                    <FormItem>
                                        <FormLabel>Client Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Ajay Agarwal" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }: { field: ControllerRenderProps<TestimonialFormData, 'role'> }) => (
                                    <FormItem>
                                        <FormLabel>Role / Company</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. AVEENA CO-FOUNDER" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Content & Media</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="mediaType"
                                render={({ field }: { field: ControllerRenderProps<TestimonialFormData, 'mediaType'> }) => (
                                    <FormItem>
                                        <FormLabel>Media Type</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value || 'video'}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select media type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="video">Video Testimonial</SelectItem>
                                                <SelectItem value="text">Text Testimonial</SelectItem>
                                                <SelectItem value="image">Image Testimonial</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {mediaType === 'video' && (
                                <FormField
                                    control={form.control}
                                    name="videoUrl"
                                    render={({ field }: { field: any }) => (
                                        <FormItem>
                                            <FormLabel>Video URL</FormLabel>
                                            <FormControl>
                                                <div className="flex gap-2">
                                                    <Input placeholder="MP4 URL (e.g. from Sanity/CDN)" {...field} />
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                                                        <Video className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {mediaType === 'image' && (
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }: { field: any }) => (
                                        <FormItem>
                                            <FormLabel>Image URL / Path</FormLabel>
                                            <FormControl>
                                                <div className="flex gap-2">
                                                    <Input placeholder="/images/testimonials/client.png" {...field} />
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                                                        <ImageIcon className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }: { field: ControllerRenderProps<TestimonialFormData, 'content'> }) => (
                                    <FormItem>
                                        <FormLabel>Feedback Text (Optional if Video)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Client testimonial content..." rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Display Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="order"
                                render={({ field }: { field: ControllerRenderProps<TestimonialFormData, 'order'> }) => (
                                    <FormItem>
                                        <FormLabel>Order</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? 0 : parseInt(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-4 pt-2">
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }: { field: ControllerRenderProps<TestimonialFormData, 'isActive'> }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={field.onChange}
                                                    className="h-4 w-4 rounded border-gray-300"
                                                />
                                            </FormControl>
                                            <FormLabel>Active</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isFeatured"
                                    render={({ field }: { field: ControllerRenderProps<TestimonialFormData, 'isFeatured'> }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={field.onChange}
                                                    className="h-4 w-4 rounded border-gray-300"
                                                />
                                            </FormControl>
                                            <FormLabel>Show on Home Page</FormLabel>
                                        </FormItem>
                                    )}
                                />
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
                        Save Testimonial
                    </Button>
                </div>
            </form>
        </Form>
    );
}
