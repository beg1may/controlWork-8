import {ApiQuote} from "../../types";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import Loader from "../Ui/Loader/Loader.tsx";
import {categories} from "../../categories.ts";

interface Props {
    isEdit?: boolean;
    idQuote?: string;
    onSubmitAction: (quote: ApiQuote) => void;
    quoteData?: ApiQuote;
}

const initialState = {
    author: '',
    category: '',
    text: '',
}

const QuoteForm: React.FC<Props> = ({isEdit = false, idQuote, onSubmitAction, quoteData}) => {
    const [quote, setQuote] = useState<ApiQuote>(quoteData || initialState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchQuotes = useCallback(async () => {
        if (idQuote) {
            try {
                const response = await axiosApi.get(`/quotes/${idQuote}.json`);
                if (response.data) {
                    setQuote(response.data);
                } else {
                    alert('Quote not found');
                    navigate('/');
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
    }, [idQuote, navigate]);

    useEffect(() => {
        if (isEdit && idQuote) {
            void fetchQuotes();
        }
    }, [fetchQuotes, isEdit, idQuote]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!quote.author || !quote.category || !quote.text) {
            alert('Please fill in all fields');
            return;
        }

        onSubmitAction({...quote});

        if (isEdit && idQuote) {
            axiosApi.put(`/quotes/${idQuote}.json`, { ...quote });
        } else {
            axiosApi.post("/quotes.json", { ...quote });
        }

        navigate('/');
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuote({ ...quote, [name]: value });
    };

    return (
        <>
            {loading ? <Loader /> :
                <form className="g-4 mt-4 w-75 mx-auto" onSubmit={onSubmit}>
                    <h4 className="text-center mb-2">
                        {isEdit ? 'Edit ' : 'Add new'} quote
                    </h4>
                    <div className="col form-group">
                        <label htmlFor="author" className="form-label text-secondary">
                            <strong>Author</strong>:
                        </label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            className="form-control mb-2"
                            value={quote.author}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="col form-group">
                        <label htmlFor="category" className="form-label text-secondary">
                            <strong>Category</strong>:
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="form-control mb-3"
                            value={quote.category}
                            onChange={onInputChange}
                        >
                            <option>Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col form-group">
                        <label htmlFor="text" className="form-label text-secondary">
                            <strong>Text</strong>:
                        </label>
                        <textarea
                            name="text"
                            id="text"
                            className="form-control mb-3"
                            value={quote.text}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="col-md-12 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary w-50 py-2">
                            {isEdit ? 'Edit' : 'Add'}
                        </button>
                    </div>
                </form>
            }
        </>
    );
};

export default QuoteForm;