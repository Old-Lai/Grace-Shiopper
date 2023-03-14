import { useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';

const ProductList = ({ products }) => {
    
    //const navigate = useNavigate();
    //const token = localStorage.getItem('token')
    
    //const { username } = jwt_decode(token);

    const addToCart = () => {

    };

    return (
        <section>
            {
                products.map(({ _id, image, prodName, prodDes, dollarAmt, stockCount })=> (
                    <div key={_id} class="products">
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
                    </div>
                ))
            }
        </section>
    )
    
}

export default PostList;