'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { teamMemberAPI } from '../../../../../lib/api-client';
import { TeamMemberForm } from '../../../../../components/team/team-member-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function EditTeamMemberPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [memberData, setMemberData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await teamMemberAPI.getById(id);
                if (res.success) {
                    setMemberData(res.teamMember);
                } else {
                    toast.error('Member not found');
                    router.push('/admin/team');
                }
            } catch (error: any) {
                toast.error('Failed to fetch data');
                router.push('/admin/team');
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchData();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await teamMemberAPI.update(id, data);
            if (res.success) {
                toast.success('Team member updated');
                router.push('/admin/team');
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
                <h1 className="text-3xl font-bold tracking-tight">Edit Team Member</h1>
                <p className="text-muted-foreground">Modify details for {memberData?.name}</p>
            </div>
            <TeamMemberForm initialData={memberData} onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
