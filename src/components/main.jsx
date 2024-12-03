import style from "./main.module.css"
import Card from "./ui/Card/card"
import basePosts from "../data/posts"

import { useState } from 'react'

export default function Main(){

    let tags=[]
    const [posts, setPosts] = useState(basePosts)
    const [newPostTitle, setNewPostTitle] = useState("")
    const [newPostContent, setNewPostContent] = useState("")
    const [newPostTags, setNewPostTags] = useState("")
    const [postTitle, setPostTitle] = useState("")

    function addNewPost(){

        if(newPostTitle === "") return

        const newPost ={
            id: posts.at(-1).id+1,
            title: newPostTitle,
            image: undefined,
            content: newPostContent,
            tags:[...newPostTags.split(" ")],
            published:true
        }

        setPosts([...posts, newPost])
        setNewPostTitle("")
        setNewPostContent("")
        setNewPostTags("")

        //console.log(posts)
        console.log("post aggiunto correttamente")
    }

    function deletePost(id){
        setPosts(posts.filter(post=> post.id!=id))
    }

    function changePostTitle(id){
        if(postTitle === "") return

        setPosts(posts.map(post => 
            post.id === id ? { ...post, title: postTitle } : post
        ));
        setPostTitle("")

        //console.log(posts)
        console.log("Titolo aggiornato correttamente");
    }

    return(
        <main className={style.mainContent}>
            <div className="container">
                <form className={style.form} onSubmit={(e) => {e.preventDefault(); addNewPost()}} action="">
                        <input  onChange={(e)=>setNewPostTitle(e.target.value)} type="text" placeholder="Titolo del post" value={newPostTitle}/>
                        <input  onChange={(e)=>setNewPostContent(e.target.value)} type="text" placeholder="Descrizione del post" value={newPostContent}/>
                        <input onChange={(e)=>setNewPostTags(e.target.value)} type="text" placeholder="Tags del post" value={newPostTags}/>
                        <input className={style.submit} type="submit" value="Invia"/>
                </form>

                <section className={style.row}>
                    {posts.map((post)=>
                        post.published===true ?
                        <div className={style.col3} key={post.id}>
                            <Card deletePost={()=>deletePost(post.id)} changePostTitle={(event)=>changePostTitle(event, post.id)} setPostTitle={(value)=>setPostTitle(value)} title={post.title} image={post.image} content={post.content} tags={post.tags} postTitle={postTitle} id={post.id}/>
                            {post.tags.forEach(tag => !tags.find((el) => el === tag) ? tags.push(tag) : null)}
                        </div> : null
                    )}
                </section>
                <section className={style.tagList}>
                    <h3>Tag presenti</h3>
                    <ul>
                        {tags.map((tag, index) => <li className={`tag ${tag}Tag`} key={index}>{tag}</li> )}
                    </ul>
                </section>
            </div>
        </main>
    )
}