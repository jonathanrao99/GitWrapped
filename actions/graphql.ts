import dotenv from 'dotenv';
dotenv.config();

export const graphQL = async ({query, variables}: {
    query: string;
    variables: Record<string, any>;
}) => {
    try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        
        if (!token) {
            throw new Error('GitHub token not found. Please set NEXT_PUBLIC_GITHUB_TOKEN environment variable.');
        }

        const response = await fetch('https://api.github.com/graphql', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query, variables})
        });

        if(!response.ok){
            const errorText = await response.text();
            console.error(`GitHub API Error: ${response.status} - ${errorText}`);
            throw new Error(`GitHub API request failed: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();

        if (data.errors) {
            console.error('GraphQL Errors:', data.errors);
            throw new Error(`GraphQL errors: ${data.errors.map((e: any) => e.message).join(', ')}`);
        }

        return data.data;
    } catch (error) {
        console.error('GraphQL request failed:', error);
        throw error;
    }
}