'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { faqAPI } from '../../../../lib/api-client';
import { FAQForm } from '../../../../components/faqs/faq-form';
import { toast } from 'sonner';

export default function NewFAQPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await faqAPI.create(data);
            if (res.success) {
                toast.success('FAQ added');
                router.push('/admin/faqs');
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
                <h1 className="text-3xl font-bold tracking-tight">Add FAQ</h1>
                <p className="text-muted-foreground">Add a new frequently asked question.</p>
            </div>
            <FAQForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
