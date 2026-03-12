'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { productAPI } from '../../../../../lib/api-client';
import { ProductForm } from '../../../../../components/products/product-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [productData, setProductData] = useState<any>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productAPI.getById(id);
                if (res.success) {
                    setProductData(res.product);
                } else {
                    toast.error('Product not found');
                    router.push('/admin/products');
                }
            } catch (error: any) {
                toast.error('Failed to fetch product');
                router.push('/admin/products');
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchProduct();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await productAPI.update(id, data);
            if (res.success) {
                toast.success('Product updated successfully');
                router.push('/admin/products');
            } else {
                toast.error(res.message || 'Failed to update product');
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
                <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                <p className="text-muted-foreground">Modify portfolio item: {productData?.title}</p>
            </div>
            <ProductForm initialData={productData} onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
