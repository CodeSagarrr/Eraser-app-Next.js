import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getFile = query({
    args:{
        fileId : v.string(),
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.query("Files")
       .filter((q) => q.eq(q.field("fileId"), args.fileId))
       .order("desc")
       .collect();
        return result;    
    }
})

export const createFile = mutation({
    args:{
        fileId : v.string(),
        fileName : v.string(),
        createdBy : v.string(),
        archived:v.boolean(),
        documents:v.string(),
        whiteBoard:v.string(),
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.insert("Files" , args);
        return result;
    },
})

export const updateDocument = mutation({
    args:{
        _id:v.id("Files"),
        documents:v.string(),
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.patch( args._id, {documents:args.documents});
        return result;
    },
})

export const getSaveDocument = query({
    args:{
        _id:v.id('Files'),
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.get(args._id)
        return result;
    },
})


export const saveWhiteBoard = mutation({
    args:{
        _id:v.id('Files'),
        whiteBoard:v.string(),
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.patch(args._id , { whiteBoard : args.whiteBoard})
        return result;
    },
})

