'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { teamMemberAPI } from '../../../../lib/api-client';
import { TeamMemberForm } from '../../../../components/team/team-member-form';
import { toast } from 'sonner';

export default function NewTeamMemberPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await teamMemberAPI.create(data);
            if (res.success) {
                toast.success('Team member added');
                router.push('/admin/team');
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
                <h1 className="text-3xl font-bold tracking-tight">Add Team Member</h1>
                <p className="text-muted-foreground">Add a new person to the Zaploom team.</p>
            </div>
            <TeamMemberForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
