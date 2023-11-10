import React from "react";

import { createClient } from "contentful";

import { PostCard, PostTitle } from "../components/Post";

const client = createClient ( {
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
} );

async function Home ()
{
    const entries = await client.getEntries();
    const posts = entries.items;

    return (
        <div className="w-3/4 mx-auto">
            <div className="py-16">
                <PostTitle>My Blog Post</PostTitle>
            </div>
            <div className="grid grid-cols-2 gap-8">
                { posts.map ( ( post ) => {
                    return (
                        <PostCard
                            id={post.sys.id}
                            key={post.sys.id}
                            slug={post.fields.slug + "___" + post.sys.id}
                            title={post.fields.title}
                            createdAt={post.sys.createdAt}
                            imageUrl={post.fields.postImage.fields.file.url}
                        />
                    );
                } ) }
            </div>
        </div>
    );
}

export default Home;
