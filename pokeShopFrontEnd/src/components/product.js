import { useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';

const ProductList = ({ product, user }) => {
    const {_id, image, prodName, prodDes, dollarAmt, stockCount} = product
    //const navigate = useNavigate();
    //const token = localStorage.getItem('token')
    
    //const { username } = jwt_decode(token);

    const addToCart = () => {

    };

    return (
        <section>
            <div>
                <h2>{prodName}</h2>
                <h4>image: {image}</h4>
                <h4>Description: {prodDes}</h4>
                <h4>Price: {dollarAmt}</h4>
                <h4>Stock: {stockCount}</h4>
            </div>
            <div>
                <button onClick={() => addToCart(_id)} class="send">ADD TO CART</button>
            </div>                   
        </section>
    )
    
}

export default PostList;