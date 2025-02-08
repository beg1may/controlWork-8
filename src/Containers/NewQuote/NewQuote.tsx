import QuoteForm from "../../Components/QuoteForm/QuoteForm.tsx";
import Loader from "../../Components/Ui/Loader/Loader.tsx";
import {ApiQuote} from "../../types";
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import {useState} from "react";

const NewQuote = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitAddNewQuote = async (quote: ApiQuote) => {
        try{
            setLoading(true);
            await axiosApi.post("posts.json", quote);
            navigate('/');
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }

    let form = (<QuoteForm onSubmitAction={onSubmitAddNewQuote} />);

    if (loading) form = <Loader />

    return (
        <div>
            {form}
        </div>
    );
};

export default NewQuote;