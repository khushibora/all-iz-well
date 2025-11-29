import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const useGetActiveColleges = ()=>{
    const fetchActiveColleges = async ()=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/college/active`,{
            method:"GET",
            credentials:"include"
        })

        if(!response.ok) throw new Error("Failed to active colleges");

        return response.json();
    }

      const {
        data: activeColleges,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["activeColleges"],
        queryFn: fetchActiveColleges,
    });

    return {
        activeColleges,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
}

export const useGetInactiveColleges = ()=>{
     const fetchInactiveColleges = async ()=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/college/inactive`,{
            method:"GET",
            credentials:"include"
        })

        if(!response.ok) throw new Error("Failed to active colleges");

        return response.json();
    }

      const {
        data: inactiveColleges,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["inactiveColleges"],
        queryFn: fetchInactiveColleges,
    });

    return {
        inactiveColleges,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
}

export const useGetRejectedColleges = ()=>{
    const fetchRejectedColleges = async () =>{
        const response = await fetch(`${API_BASE_URL}/api/v1/college/rejected`,{
            method:"GET",
            credentials:"include"
        })
        if(!response.ok) throw new Error("Failed to active colleges");

        return response.json();
    }

    const {
        data: rejectedColleges,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["rejectedColleges"],
        queryFn: fetchRejectedColleges,
    });

    return {
        rejectedColleges,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
}

export const usePatchAcceptCollege = ()=>{
    const queryClient = useQueryClient();

    const PatchAcceptedCollege = async (collegeId)=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/college/accept/${collegeId}`,{
            method:"PATCH",
            credentials:"include"
        })

        if(!response.ok) throw new Error("error in accepting the college");
        
        return response.json();
    }

    const {
        mutateAsync: acceptCollege,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: PatchAcceptedCollege,
        onSuccess: () => {
      queryClient.invalidateQueries(["inactiveColleges"]);
      
    },
    });

    return {
        acceptCollege,
        isPending,
        isError,
        isSuccess
    }
}

export const usePatchRejectCollege = ()=>{
    const queryClient = useQueryClient();
    const PatchRejectCollege = async (collegeId)=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/college/reject/${collegeId}`,{
            method:"PATCH",
            credentials:"include"
        })

        if(!response.ok) throw new Error("error in accepting the college");
        
        return response.json();
        }
        
    const {
        mutateAsync: rejectCollege,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: PatchRejectCollege,
        onSuccess: () => {
            queryClient.invalidateQueries(["inactiveColleges"]);
    },
    });

    return {
        rejectCollege,
        isPending,
        isError,
        isSuccess
    }
}