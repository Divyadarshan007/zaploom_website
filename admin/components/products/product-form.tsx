'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash, Upload, Loader2, X } from 'lucide-react';
import { uploadAPI } from '../../lib/api-client';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Separator } from '../ui/separator';

const productSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    tagline: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    order: z.number(),
    isActive: z.boolean(),
    showOnHomePage: z.boolean(),
    isOwnProduct: z.boolean(),
    features: z.array(z.object({
        title: z.string().min(1, 'Feature title is required'),
        desc: z.string().optional(),
        icon: z.string().optional(),
    })),
    techStack: z.array(z.object({
        name: z.string().min(1, 'Tech name is required'),
        icon: z.string().optional(),
    })),
    faqs: z.array(z.object({
        question: z.string().min(1, 'Question is required'),
        answer: z.string().min(1, 'Answer is required'),
    })),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: any;
    onSubmit: (data: ProductFormData) => Promise<void>;
    isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading = false }: ProductFormProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            tagline: initialData?.tagline || '',
            description: initialData?.description || '',
            image: initialData?.image || '',
            alt: initialData?.alt || '',
            order: initialData?.order || 0,
            isActive: initialData?.isActive ?? true,
            showOnHomePage: initialData?.showOnHomePage ?? true,
            isOwnProduct: initialData?.isOwnProduct ?? false,
            features: initialData?.features || [],
            techStack: initialData?.techStack || [],
            faqs: initialData?.faqs || [],
        },
    });

    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
        control: form.control,
        name: 'features',
    });

    const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
        control: form.control,
        name: 'techStack',
    });

    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
        control: form.control,
        name: 'faqs',
    });

    const title = form.watch('title');

    useEffect(() => {
        if (title && !slugManuallyEdited && !initialData?._id) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            form.setValue('slug', slug);
        }
    }, [title, form, slugManuallyEdited, initialData]);

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
                    {/* Basic Info */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }: { field: ControllerRenderProps<ProductFormData, 'title'> }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Project Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }: { field: ControllerRenderProps<ProductFormData, 'slug'> }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="project-slug"
                                                    {...field}
                                                    onBlur={() => setSlugManuallyEdited(true)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="tagline"
                                render={({ field }: { field: ControllerRenderProps<ProductFormData, 'tagline'> }) => (
                                    <FormItem>
                                        <FormLabel>Tagline</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Short project tagline" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }: { field: ControllerRenderProps<ProductFormData, 'description'> }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Detailed project description" rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Media & Settings */}
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
                                        render={({ field }: { field: ControllerRenderProps<ProductFormData, 'image'> }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder="Image URL or upload" {...field} />
                                                </FormControl>
                                                <FormMessage />
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
                                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                                            Upload
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="alt"
                                render={({ field }: { field: ControllerRenderProps<ProductFormData, 'alt'> }) => (
                                    <FormItem>
                                        <FormLabel>Image Alt Text</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Descriptive text for image" {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                render={({ field }: { field: ControllerRenderProps<ProductFormData, 'order'> }) => (
                                    <FormItem>
                                        <FormLabel>Display Order</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-6 pt-2">
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }: { field: ControllerRenderProps<ProductFormData, 'isActive'> }) => (
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
                                    name="showOnHomePage"
                                    render={({ field }: { field: ControllerRenderProps<ProductFormData, 'showOnHomePage'> }) => (
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
                                                <FormLabel>Show on Home</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isOwnProduct"
                                    render={({ field }: { field: ControllerRenderProps<ProductFormData, 'isOwnProduct'> }) => (
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
                                                <FormLabel>Own Product</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Features</CardTitle>
                                <CardDescription>Add key features of the project.</CardDescription>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendFeature({ title: '', desc: '', icon: '' })}>
                                <Plus className="h-4 w-4 mr-2" /> Add Feature
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {featureFields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 items-start border p-4 rounded-lg relative">
                                    <div className="grid flex-1 gap-4 md:grid-cols-3">
                                        <FormField
                                            control={form.control}
                                            name={`features.${index}.title`}
                                            render={({ field }: { field: ControllerRenderProps<ProductFormData, `features.${number}.title`> }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Feature title" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`features.${index}.desc`}
                                            render={({ field }: { field: ControllerRenderProps<ProductFormData, `features.${number}.desc`> }) => (
                                                <FormItem className="md:col-span-2">
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Feature description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => removeFeature(index)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Tech Stack */}
                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Tech Stack</CardTitle>
                                <CardDescription>Tools and technologies used.</CardDescription>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendTech({ name: '', icon: '' })}>
                                <Plus className="h-4 w-4 mr-2" /> Add Tech
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {techFields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 items-end">
                                    <FormField
                                        control={form.control}
                                        name={`techStack.${index}.name`}
                                        render={({ field }: { field: ControllerRenderProps<ProductFormData, `techStack.${number}.name`> }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="React, Flutter, etc." {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`techStack.${index}.icon`}
                                        render={({ field }: { field: ControllerRenderProps<ProductFormData, `techStack.${number}.icon`> }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Icon URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Icon URL" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-destructive"
                                        onClick={() => removeTech(index)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* FAQs */}
                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Project FAQs</CardTitle>
                                <CardDescription>Specific FAQs for this project.</CardDescription>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendFaq({ question: '', answer: '' })}>
                                <Plus className="h-4 w-4 mr-2" /> Add FAQ
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {faqFields.map((field, index) => (
                                <div key={field.id} className="space-y-4 border p-4 rounded-lg relative">
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive"
                                            onClick={() => removeFaq(index)}
                                        >
                                            <Trash className="h-4 w-4 mr-2" /> Remove
                                        </Button>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`faqs.${index}.question`}
                                        render={({ field }: { field: ControllerRenderProps<ProductFormData, `faqs.${number}.question`> }) => (
                                            <FormItem>
                                                <FormLabel>Question</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="FAQ Question" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`faqs.${index}.answer`}
                                        render={({ field }: { field: ControllerRenderProps<ProductFormData, `faqs.${number}.answer`> }) => (
                                            <FormItem>
                                                <FormLabel>Answer</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="FAQ Answer" rows={2} {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md p-4 flex justify-end gap-4 z-50 lg:left-64">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Product
                    </Button>
                </div>
            </form>
        </Form>
    );
}
