import {useContext} from "react"
import {AuthContext} from "./security/AuthContext"

export function FooterComponent() {
    const context = useContext(AuthContext)
    console.log(`Footer component - ${context.number}`)

    return (
        <footer className="footer">
            <div className="container">
                <hr/>
                My footer
            </div>
        </footer>
    )
}