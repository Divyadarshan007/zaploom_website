'use client';

import { useState, useEffect } from 'react';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';
import { Loader2, Save } from 'lucide-react';
import { pageSettingsAPI } from '../../../../lib/api-client';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '../../../../components/ui/form';

const aboutSchema = z.object({
    hero: z.object({
        heading: z.string().optional(),
        subheading: z.string().optional(),
    }).optional(),
    content: z.object({
        mainText: z.string().optional(),
        mission: z.string().optional(),
        vision: z.string().optional(),
    }).optional(),
    seo: z.object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
    }).optional(),
});

type AboutFormData = z.infer<typeof aboutSchema>;

export default function AboutPageSettings() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const form = useForm<AboutFormData>({
        resolver: zodResolver(aboutSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await pageSettingsAPI.getAbout();
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

    const onSubmit = async (data: AboutFormData) => {
        setLoading(true);
        try {
            const res = await pageSettingsAPI.updateAbout(data);
            if (res.success) {
                toast.success('About page settings updated');
            }
        } catch (error: any) {
            toast.error('Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">About Page Settings</h1>
                <p className="text-muted-foreground">Manage the content of your company story.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="hero.heading"
                                render={({ field }: { field: ControllerRenderProps<AboutFormData, 'hero.heading'> }) => (
                                    <FormItem>
                                        <FormLabel>Heading</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hero.subheading"
                                render={({ field }: { field: ControllerRenderProps<AboutFormData, 'hero.subheading'> }) => (
                                    <FormItem>
                                        <FormLabel>Subheading</FormLabel>
                                        <FormControl><Textarea {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Company Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="content.mainText"
                                render={({ field }: { field: ControllerRenderProps<AboutFormData, 'content.mainText'> }) => (
                                    <FormItem>
                                        <FormLabel>Main About Text</FormLabel>
                                        <FormControl><Textarea rows={6} {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="content.mission"
                                    render={({ field }: { field: ControllerRenderProps<AboutFormData, 'content.mission'> }) => (
                                        <FormItem>
                                            <FormLabel>Our Mission</FormLabel>
                                            <FormControl><Textarea rows={4} {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content.vision"
                                    render={({ field }: { field: ControllerRenderProps<AboutFormData, 'content.vision'> }) => (
                                        <FormItem>
                                            <FormLabel>Our Vision</FormLabel>
                                            <FormControl><Textarea rows={4} {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>About SEO</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="seo.metaTitle"
                                render={({ field }: { field: ControllerRenderProps<AboutFormData, 'seo.metaTitle'> }) => (
                                    <FormItem>
                                        <FormLabel>Page Title</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="seo.metaDescription"
                                render={({ field }: { field: ControllerRenderProps<AboutFormData, 'seo.metaDescription'> }) => (
                                    <FormItem>
                                        <FormLabel>Meta Description</FormLabel>
                                        <FormControl><Textarea {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md p-4 flex justify-end gap-4 z-50 lg:left-64">
                        <Button type="submit" disabled={loading} size="lg">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Update About Page
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
