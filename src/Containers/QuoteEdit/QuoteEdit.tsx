import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ApiQuote} from "../../types";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../Components/Ui/Loader/Loader.tsx";
import QuoteForm from "../../Components/QuoteForm/QuoteForm.tsx";

const QuoteEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {idQuote} = useParams();
    console.log(idQuote);

    const onSubmitAddNewQuote = async (quote: ApiQuote) => {
        try {
            setLoading(true);
            if (idQuote) {
                await axiosApi.post(`quotes/${idQuote}.json`, {...quote});
            } else {
                await axiosApi.post(`quotes.json`, quote);
            }
            navigate('/');
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }

    const form = loading ? <Loader /> : (
        <QuoteForm
            onSubmitAction={onSubmitAddNewQuote}
            isEdit
            idQuote={idQuote}
        />
    );

    return (
        <div>
            {form}
        </div>
    );
};

export default QuoteEdit;