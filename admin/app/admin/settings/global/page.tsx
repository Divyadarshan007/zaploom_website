'use client';

import { useState, useEffect } from 'react';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';
import { Loader2, Save, Upload, X } from 'lucide-react';
import { pageSettingsAPI, uploadAPI } from '../../../../lib/api-client';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../components/ui/form';

const globalSchema = z.object({
    siteName: z.string().min(1, 'Site name is required'),
    siteEmail: z.string().email().optional().or(z.literal('')),
    sitePhone: z.string().optional(),
    address: z.string().optional(),
    logo: z.string().optional(),
    favicon: z.string().optional(),
    socialLinks: z.object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        linkedin: z.string().optional(),
        instagram: z.string().optional(),
        youtube: z.string().optional(),
    }).optional(),
    seo: z.object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.array(z.string()).optional(),
    }).optional(),
});

type GlobalFormData = z.infer<typeof globalSchema>;

export default function GlobalSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [isUploadingLogo, setIsUploadingLogo] = useState(false);

    const form = useForm<GlobalFormData>({
        resolver: zodResolver(globalSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await pageSettingsAPI.getGlobal();
                if (res.success && res.settings) {
                    form.reset(res.settings);
                }
            } catch (error: any) {
                toast.error('Failed to load settings');
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, [form]);

    const onSubmit = async (data: GlobalFormData) => {
        setLoading(true);
        try {
            const res = await pageSettingsAPI.updateGlobal(data);
            if (res.success) {
                toast.success('Global settings updated');
            }
        } catch (error: any) {
            toast.error('Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploadingLogo(true);
        try {
            const res = await uploadAPI.uploadImage(file);
            if (res.success) {
                form.setValue('logo', res.url);
                toast.success('Logo uploaded');
            }
        } catch {
            toast.error('Upload failed');
        } finally {
            setIsUploadingLogo(false);
        }
    };

    if (fetching) {
        return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
                <p className="text-muted-foreground">Manage sitewide branding, SEO, and social info.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Branding</CardTitle>
                                <CardDescription>Logo and site identity.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="siteName"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'siteName'> }) => (
                                        <FormItem>
                                            <FormLabel>Site Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Zaploom" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-2">
                                    <Label>Site Logo</Label>
                                    <div className="flex items-center gap-4">
                                        {form.watch('logo') && (
                                            <div className="relative h-12 w-32 border rounded p-1 bg-white flex items-center justify-center">
                                                <img src={form.watch('logo')} alt="Logo" className="max-h-full max-w-full object-contain" />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute -top-2 -right-2 h-5 w-5"
                                                    onClick={() => form.setValue('logo', '')}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        )}
                                        <div className="relative flex-1">
                                            <Input
                                                placeholder="Logo URL or upload"
                                                value={form.watch('logo')}
                                                onChange={(e) => form.setValue('logo', e.target.value)}
                                            />
                                        </div>
                                        <div className="relative">
                                            <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                disabled={isUploadingLogo}
                                                onClick={() => document.getElementById('logo-upload')?.click()}
                                            >
                                                {isUploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Info</CardTitle>
                                <CardDescription>Sitewide contact details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="siteEmail"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'siteEmail'> }) => (
                                        <FormItem>
                                            <FormLabel>Admin Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="hello@zaploom.com" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sitePhone"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'sitePhone'> }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+91 XXX-XXX-XXXX" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'address'> }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Head office address" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Social Links</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="socialLinks.linkedin"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'socialLinks.linkedin'> }) => (
                                        <FormItem>
                                            <FormLabel>LinkedIn URL</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="socialLinks.twitter"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'socialLinks.twitter'> }) => (
                                        <FormItem>
                                            <FormLabel>Twitter/X URL</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="socialLinks.instagram"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'socialLinks.instagram'> }) => (
                                        <FormItem>
                                            <FormLabel>Instagram URL</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Global SEO</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="seo.metaTitle"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'seo.metaTitle'> }) => (
                                        <FormItem>
                                            <FormLabel>Meta Title</FormLabel>
                                            <FormControl><Input placeholder="Default site title" {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="seo.metaDescription"
                                    render={({ field }: { field: ControllerRenderProps<GlobalFormData, 'seo.metaDescription'> }) => (
                                        <FormItem>
                                            <FormLabel>Meta Description</FormLabel>
                                            <FormControl><Textarea placeholder="Default site description" {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md p-4 flex justify-end gap-4 z-50 lg:left-64">
                        <Button type="submit" disabled={loading} size="lg">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save All Settings
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
