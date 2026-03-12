'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productAPI } from '../../../../lib/api-client';
import { ProductForm } from '../../../../components/products/product-form';
import { toast } from 'sonner';

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await productAPI.create(data);
            if (res.success) {
                toast.success('Product created successfully');
                router.push('/admin/products');
            } else {
                toast.error(res.message || 'Failed to create product');
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
                <h1 className="text-3xl font-bold tracking-tight">New Product</h1>
                <p className="text-muted-foreground">Add a new item to your portfolio.</p>
            </div>
            <ProductForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
