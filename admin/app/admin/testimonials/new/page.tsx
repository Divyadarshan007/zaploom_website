'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { testimonialAPI } from '../../../../lib/api-client';
import { TestimonialForm } from '../../../../components/testimonials/testimonial-form';
import { toast } from 'sonner';

export default function NewTestimonialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await testimonialAPI.create(data);
            if (res.success) {
                toast.success('Testimonial created successfully');
                router.push('/admin/testimonials');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Testimonial</h1>
                <p className="text-muted-foreground">Add a new client success story.</p>
            </div>
            <TestimonialForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
