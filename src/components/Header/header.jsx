import style from "./header.module.css"

export default function Header(){
    return(
        <header className={style.header}>
            <div className="container">
                <h1>Il mio blog</h1>
            </div>
        </header>
    )
}