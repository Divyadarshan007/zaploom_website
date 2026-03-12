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
    FormMessage,
} from '../../../../components/ui/form';

const homeSchema = z.object({
    hero: z.object({
        heading: z.string().min(1, 'Heading is required'),
        subheading: z.string().optional(),
        primaryCTA: z.object({
            label: z.string().optional(),
            href: z.string().optional(),
        }).optional(),
        secondaryCTA: z.object({
            label: z.string().optional(),
            href: z.string().optional(),
        }).optional(),
    }).optional(),
    services: z.object({
        heading: z.string().optional(),
        subheading: z.string().optional(),
    }).optional(),
    seo: z.object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
    }).optional(),
});

type HomeFormData = z.infer<typeof homeSchema>;

export default function HomePageSettings() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const form = useForm<HomeFormData>({
        resolver: zodResolver(homeSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await pageSettingsAPI.getHome();
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

    const onSubmit = async (data: HomeFormData) => {
        setLoading(true);
        try {
            const res = await pageSettingsAPI.updateHome(data);
            if (res.success) {
                toast.success('Home page settings updated');
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
                <h1 className="text-3xl font-bold tracking-tight">Home Page Settings</h1>
                <p className="text-muted-foreground">Customize the hero section and content of your home page.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                            <CardDescription>The main banner area of the home page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="hero.heading"
                                render={({ field }: { field: ControllerRenderProps<HomeFormData, 'hero.heading'> }) => (
                                    <FormItem>
                                        <FormLabel>Main Heading</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Innovate. Build. Succeed." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hero.subheading"
                                render={({ field }: { field: ControllerRenderProps<HomeFormData, 'hero.subheading'> }) => (
                                    <FormItem>
                                        <FormLabel>Sub-heading</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Elevate your brand with Zaploom..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-4 border p-4 rounded-md">
                                    <h4 className="text-sm font-medium">Primary Button</h4>
                                    <FormField
                                        control={form.control}
                                        name="hero.primaryCTA.label"
                                        render={({ field }: { field: ControllerRenderProps<HomeFormData, 'hero.primaryCTA.label'> }) => (
                                            <FormItem>
                                                <FormLabel>Label</FormLabel>
                                                <FormControl><Input placeholder="Get Started" {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hero.primaryCTA.href"
                                        render={({ field }: { field: ControllerRenderProps<HomeFormData, 'hero.primaryCTA.href'> }) => (
                                            <FormItem>
                                                <FormLabel>Link (URL)</FormLabel>
                                                <FormControl><Input placeholder="/contact" {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-4 border p-4 rounded-md">
                                    <h4 className="text-sm font-medium">Secondary Button</h4>
                                    <FormField
                                        control={form.control}
                                        name="hero.secondaryCTA.label"
                                        render={({ field }: { field: ControllerRenderProps<HomeFormData, 'hero.secondaryCTA.label'> }) => (
                                            <FormItem>
                                                <FormLabel>Label</FormLabel>
                                                <FormControl><Input placeholder="View Projects" {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hero.secondaryCTA.href"
                                        render={({ field }: { field: ControllerRenderProps<HomeFormData, 'hero.secondaryCTA.href'> }) => (
                                            <FormItem>
                                                <FormLabel>Link (URL)</FormLabel>
                                                <FormControl><Input placeholder="/products" {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Services Section</CardTitle>
                            <CardDescription>Intro text for the services area.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="services.heading"
                                render={({ field }: { field: ControllerRenderProps<HomeFormData, 'services.heading'> }) => (
                                    <FormItem>
                                        <FormLabel>Section Heading</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="services.subheading"
                                render={({ field }: { field: ControllerRenderProps<HomeFormData, 'services.subheading'> }) => (
                                    <FormItem>
                                        <FormLabel>Section Subheading</FormLabel>
                                        <FormControl><Textarea {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Home SEO</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="seo.metaTitle"
                                render={({ field }: { field: ControllerRenderProps<HomeFormData, 'seo.metaTitle'> }) => (
                                    <FormItem>
                                        <FormLabel>Page Title</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="seo.metaDescription"
                                render={({ field }: { field: ControllerRenderProps<HomeFormData, 'seo.metaDescription'> }) => (
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
                            Update Home Page
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
