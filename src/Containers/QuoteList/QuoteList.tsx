import {useCallback, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import { ApiQuotes, Quote} from "../../types";
import axiosApi from "../../axiosApi.ts";
import Categories from "../../Components/Categories/Categories.tsx";
import Loader from "../../Components/Ui/Loader/Loader.tsx";

const QuoteList = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(false);
    const {categoryId} = useParams();

    const fetchQuotes = useCallback(async () => {
        try {
            setLoading(true);
            let url = "/quotes.json";
            if (categoryId) {
                url += `?orderBy="category"&equalTo="${categoryId}"`;
            }
            const response = await axiosApi.get<ApiQuotes | null>(url);
            const quotes = response.data;

            if (!quotes) {
                setQuotes([]);
            } else {
                setQuotes(Object.keys(quotes).map((id) => ({
                    ...quotes[id],
                    id,
                })));
            }
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }, [categoryId]);

    const onDelete = async (id: string) => {
        try {
            await axiosApi.delete<ApiQuotes>(`/quotes/${id}.json`);
            setQuotes((prevQuotes) => prevQuotes.filter(quote => quote.id !== id));
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        void fetchQuotes();
    }, [fetchQuotes]);

    console.log(quotes);

    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col-4">
                    <Categories/>
                </div>
                <div className="col-8">
                    <h3 className="mb-3">Quotes List</h3>
                    {loading ? <Loader /> :
                    <ul className="list-group p-0">
                        {quotes.map((quote) => (
                            <li className="list-group-item" key={quote.id}>
                                <p><strong>{quote.author}</strong></p>
                                <p>{quote.text}</p>
                                <NavLink to={`/quotes/${quote.id}/edit`} className="btn btn-primary ms-2">
                                    Edit
                                </NavLink>
                                <button className="btn btn-danger ms-auto" onClick={() => onDelete(quote.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    }
                </div>
            </div>
        </div>
    );
};

export default QuoteList;