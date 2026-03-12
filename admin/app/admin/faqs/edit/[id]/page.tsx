'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { faqAPI } from '../../../../../lib/api-client';
import { FAQForm } from '../../../../../components/faqs/faq-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function EditFAQPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [faqData, setFaqData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await faqAPI.getById(id);
                if (res.success) {
                    setFaqData(res.faq);
                } else {
                    toast.error('FAQ not found');
                    router.push('/admin/faqs');
                }
            } catch (error: any) {
                toast.error('Failed to fetch data');
                router.push('/admin/faqs');
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchData();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await faqAPI.update(id, data);
            if (res.success) {
                toast.success('FAQ updated');
                router.push('/admin/faqs');
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
                <h1 className="text-3xl font-bold tracking-tight">Edit FAQ</h1>
                <p className="text-muted-foreground">Modify details for this FAQ.</p>
            </div>
            <FAQForm initialData={faqData} onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
