import { v } from 'convex/values';
import { mutation, query } from './_generated/server';



export const getUser = query({
    args:{
        email: v.string()
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.query("User")
        .filter((q) => q.eq(q.field("email"),args.email))
        .collect();
        return result;
    },
})

export const createUser = mutation({
    args:{
        name:v.string(),
        email:v.string(),
        image:v.string()
    },
    handler:async(ctx, args) => {
        const res = await ctx.db.insert("User",args)
        return res;
    }
})