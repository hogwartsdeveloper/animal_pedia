import { useMemo } from "react";
import { IPost } from "../type/user";

export const useSearchPost = (posts: IPost[], query: string) => {
    const searchPosts = useMemo(() => {
        return posts.filter(post => post.caption.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    }, [query, posts]);
    return searchPosts;
}   