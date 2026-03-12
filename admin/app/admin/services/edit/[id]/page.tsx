'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { serviceAPI } from '../../../../../lib/api-client';
import { ServiceForm } from '../../../../../components/services/service-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function EditServicePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [serviceData, setServiceData] = useState<any>(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await serviceAPI.getById(id);
                if (res.success) {
                    setServiceData(res.service);
                } else {
                    toast.error('Service not found');
                    router.push('/admin/services');
                }
            } catch (error: any) {
                toast.error('Failed to fetch service');
                router.push('/admin/services');
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchService();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await serviceAPI.update(id, data);
            if (res.success) {
                toast.success('Service updated successfully');
                router.push('/admin/services');
            } else {
                toast.error(res.message || 'Failed to update service');
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
                <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
                <p className="text-muted-foreground">Modify service: {serviceData?.title}</p>
            </div>
            <ServiceForm initialData={serviceData} onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
