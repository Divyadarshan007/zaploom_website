'use client';

import { useForm, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';

const faqSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    answer: z.string().min(1, 'Answer is required'),
    order: z.number(),
    isActive: z.boolean(),
});

type FAQFormData = z.infer<typeof faqSchema>;

interface FAQFormProps {
    initialData?: any;
    onSubmit: (data: FAQFormData) => Promise<void>;
    isLoading?: boolean;
}

export function FAQForm({ initialData, onSubmit, isLoading = false }: FAQFormProps) {
    const form = useForm<FAQFormData>({
        resolver: zodResolver(faqSchema),
        defaultValues: {
            question: initialData?.question || '',
            answer: initialData?.answer || '',
            order: initialData?.order || 0,
            isActive: initialData?.isActive ?? true,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>FAQ Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }: { field: ControllerRenderProps<FAQFormData, 'question'> }) => (
                                <FormItem>
                                    <FormLabel>Question</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter the question..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }: { field: ControllerRenderProps<FAQFormData, 'answer'> }) => (
                                <FormItem>
                                    <FormLabel>Answer</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter the answer..." rows={6} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid gap-4 md:grid-cols-2 pt-2">
                            <FormField
                                control={form.control}
                                name="order"
                                render={({ field }: { field: ControllerRenderProps<FAQFormData, 'order'> }) => (
                                    <FormItem>
                                        <FormLabel>Display Order</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? 0 : parseInt(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }: { field: ControllerRenderProps<FAQFormData, 'isActive'> }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-8">
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
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save FAQ
                    </Button>
                </div>
            </form>
        </Form>
    );
}
