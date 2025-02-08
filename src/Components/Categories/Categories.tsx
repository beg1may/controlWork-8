import {NavLink} from "react-router-dom";
import {categories} from "../../categories.ts";

const Categories = () => {
    return (
        <ul className="nav row">
            <li className="nav-item col-12">
                <NavLink className="nav-link" to='/'>All</NavLink>
            </li>
            {
                categories.map(category => {
                    return (
                        <li className='nav-item col-12' key={category.id}>
                            <NavLink className='nav-link' to={`/quotes/${category.id}`}>{category.title}</NavLink>
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default Categories;