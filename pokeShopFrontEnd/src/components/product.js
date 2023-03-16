import { useNavigate} from "react-router-dom";

const ProductList = ({ product, token }) => {
    const {_id, name, prodDes, dollarAmt, stockCount} = product
    //const navigate = useNavigate();
    //const token = localStorage.getItem('token')

    const addToCart = () => {

    };

    return (
        <section>
            <div>
                <h2>{name}</h2>
                <h4>Description: {prodDes}</h4>
                <h4>Price: {dollarAmt}</h4>
                <h4>Stock: {stockCount}</h4>
            </div>
            <div>
                <button onClick={() => addToCart(_id)}>ADD TO CART</button>
            </div>                   
        </section>
    )
    
}

export default ProductList;