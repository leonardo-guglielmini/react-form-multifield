import style from "./footer.module.css"

export default function Footer(){
    return(
        <footer className={style.footer}>
            <div className="container">
            <p className={style.footerText}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam placeat explicabo ex consectetur excepturi nobis unde reprehenderit distinctio fugiat illum, nemo, velit repudiandae tenetur quibusdam aspernatur laudantium commodi corporis. Fugit.</p>
            </div>
        </footer>
    )
}