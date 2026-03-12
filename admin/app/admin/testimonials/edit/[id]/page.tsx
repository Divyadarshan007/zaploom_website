'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { testimonialAPI } from '../../../../../lib/api-client';
import { TestimonialForm } from '../../../../../components/testimonials/testimonial-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function EditTestimonialPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [testimonialData, setTestimonialData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await testimonialAPI.getById(id);
                if (res.success) {
                    setTestimonialData(res.testimonial);
                } else {
                    toast.error('Testimonial not found');
                    router.push('/admin/testimonials');
                }
            } catch (error: any) {
                toast.error('Failed to fetch data');
                router.push('/admin/testimonials');
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchData();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await testimonialAPI.update(id, data);
            if (res.success) {
                toast.success('Testimonial updated successfully');
                router.push('/admin/testimonials');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
                <p className="text-muted-foreground">Modify story for {testimonialData?.name}</p>
            </div>
            <TestimonialForm initialData={testimonialData} onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
