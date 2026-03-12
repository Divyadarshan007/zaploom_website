'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { serviceAPI } from '../../../../lib/api-client';
import { ServiceForm } from '../../../../components/services/service-form';
import { toast } from 'sonner';

export default function NewServicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await serviceAPI.create(data);
            if (res.success) {
                toast.success('Service created successfully');
                router.push('/admin/services');
            } else {
                toast.error(res.message || 'Failed to create service');
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
                <h1 className="text-3xl font-bold tracking-tight">New Service</h1>
                <p className="text-muted-foreground">Add a new service to show on the home page features.</p>
            </div>
            <ServiceForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
