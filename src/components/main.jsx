import style from "./main.module.css"
import Card from "./ui/Card/card"
import basePosts from "../data/posts"

import { useState } from 'react'

const baseFormData={
    title:"",
    image:undefined,
    content:"",
    tags:[],
    published:true
}

export default function Main(){

    let tags=[]
    const [posts, setPosts] = useState(basePosts)
    const [postTitle, setPostTitle] = useState("")

    const [formData, setFormData] = useState(baseFormData)

    function handleFormData(e){
        const key = e.target.name
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

        const newFormData ={
            ...formData,
            [key] : value
        }
        
        setFormData(newFormData)
    }

    function addNewPost(){

        if(formData.title === "") return

        const newPost ={
            id: posts.at(-1).id+1,
            ...formData,
            tags:[formData.tags.split(" ")],
        }

        setPosts([...posts, newPost])

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
                    <div className={style.formDiv}>
                        <input className={style.formField} id="title" name="title" onChange={handleFormData} type="text" placeholder="Titolo del post" value={formData.title}/>
                    </div>
                    <div className={style.formDiv}>
                        <input className={style.formField} id="content" name="content" onChange={handleFormData} type="text" placeholder="Descrizione del post" value={formData.content}/>
                    </div>
                    <div className={style.formDiv}>
                        <input className={style.formField} id="tags" name="tags" onChange={handleFormData} type="text" placeholder="Tags del post" value={formData.tags}/>
                    </div>
                    <div className={style.formDiv}>
                        <input className={style.formField} id="image" name="image" onChange={handleFormData} type="text" placeholder="URL immagine" value={formData.image}/>
                    </div>
                    <div className={style.formDiv}>
                        <input id="published" name="published" onChange={handleFormData} checked={formData.published} type="checkbox"/>
                        <label htmlFor="published">Visibile</label>
                    </div>
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