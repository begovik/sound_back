import Post from "../models/PostModel.js";
import FileService from "./FileService.js";

class PostService {

    async create(post, picture) {
        const fileName = FileService.saveFile(picture)
        const createdPost = await Post.create({...post, picture: fileName})
        return createdPost
    }

    async getAll() {
        const posts = await Post.findAll()
        return posts
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const post = await Post.findByPk(id)
        return post
    }

    async update(post) {

        if (!post.id) {
            throw new Error('Не указан ID')
        }

        const updatedPost = await Post.findByPk(post.id)

        if (post.author) updatedPost.author = post.author
        if (post.title) updatedPost.title = post.title
        if (post.content) updatedPost.content = post.content
        if (post.picture) updatedPost.picture = post.picture

        await updatedPost.save()

        return updatedPost
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const post = await Post.findByPk(id)

        await post.destroy()

        return post
    }

}

export default new PostService()