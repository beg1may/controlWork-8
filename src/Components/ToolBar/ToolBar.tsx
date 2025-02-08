import {NavLink} from "react-router-dom";

const ToolBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <span className="navbar-brand">Quotes Central</span>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Quotes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/add-quote" className="nav-link">Submit new quote</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ToolBar;