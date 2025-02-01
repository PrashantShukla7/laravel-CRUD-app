import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const BlogForm = ({ message, onSubmit, setMessage, data }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            title: data?.title || "",
            description: data?.description || "",
        },
    });

    useEffect(() => {
        if (data) {
            setValue("title", data.title);
            setValue("description", data.description);
        }
    }, [data, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
            
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Enter post title"
                    required
                />
            </div>
            <div className="form-group">
                <label>Content</label>
                <textarea
                    {...register("description")}
                    placeholder="Write your blog post content..."
                    required
                />
            </div>
            <button type="submit" className="submit-button">
                Publish Post
            </button>
        </form>
    );
};

export default BlogForm;
